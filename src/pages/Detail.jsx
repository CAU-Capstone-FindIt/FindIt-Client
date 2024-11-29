import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import TopNavBack from "./TopNavBack";
import { Category } from "@mui/icons-material";
import Comments from "./Comments";
import axios from "axios";
import { vision_gpt } from "../apis/Vision_gpt";
import { findSearch } from "../apis/FindSearch";
import SearchModal from "../component/search/SearchModal";
import { lostSearch } from "../apis/LostSearch";

const { kakao } = window;

const Detail = () => {
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState([]); // 수정수정: 모달 데이터
  const { state, search } = useLocation(); // 전달된 상태에 접근
  const report = state; // 이 상태에는 보고서 객체가 포함되어 있습니다

  const mapRef = useRef(null); // 지도 DOM 요소를 참조하는 ref
  const imgRef = useRef(null); //이미지 엘리먼트를 참조하기 위한 ref 추가

  // 쿼리 매개변수에서 pageType 추출
  const params = new URLSearchParams(search);
  const pageType = params.get("pageType");

  console.log(report);
  console.log(pageType);

  useEffect(() => {
    // 카카오 지도 API를 사용하여 지도 초기화
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(report.latitude, report.longitude), // 위도, 경도
      level: 3, // 줌 레벨
    };

    console.log(report);

    const map = new kakao.maps.Map(container, options); // 지도 생성

    const lat = report.latitude;
    const lng = report.longitude; // 좌표 가져오기
    const markerPosition = new kakao.maps.LatLng(lat, lng);

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      map: map, // 마커가 표시될 지도
    });
    marker.setMap(map); // 지도에 마커 추가
  }, []);

  // Web Share API를 이용한 공유 기능
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: report.name,
          text: report.description,
          image: report.image,
          url: window.location.href, // 현재 페이지 URL을 공유
        });
        console.log("공유 작동");
      } else {
        alert("공유 기능이 지원 안함");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleVisionSearch = async () => {
    try {
      // S3에서 이미지 가져오기
      const response = await fetch(`${report.image}?not-from-cache-please`, {
        method: "GET",
        mode: "cors",
      }); // report.image는 S3 URL이어야 함

      const blob = await response.blob();

      // Blob을 Base64로 변환
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        console.log(base64String);

        // Vision GPT API에 Base64 문자열 전송
        const visionResponse = await vision_gpt(base64String);
        console.log(visionResponse)

        if (pageType == "lost") {
          //습득물 상세 검색
          const findSearchResult = await findSearch(visionResponse);
          console.log(findSearchResult);
          setModalData(findSearchResult); // 수정수정: 모달 데이터 설정
          setIsModal(true);
        } else if (pageType == "find") {
          //습득물 상세 검색
          const findSearchResult = await lostSearch(visionResponse);
          console.log(findSearchResult);
          setModalData(findSearchResult); // 수정수정: 모달 데이터 설정
          setIsModal(true);
        }
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Vision 검색 중 오류 발생:", error);
    }
  };

  const closeModal = () => setIsModal(false);

  const patchFoundItem = async () => {
    const accessToken = localStorage.getItem("access");

    console.log(report.id);
    console.log(accessToken);
    try {
      const response = await axios.patch(
        `http://findit.p-e.kr:8080/api/items/found/${report.id}/status`,
        {
          status: "REGISTERED",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      return response;
    } catch (error) {
      console.error("거래 실패:", error);

      if (error.response.status === 401) {
        console.log(error.response.status);
        alert("게시글을 등록하려면 로그인해주세요");
      }
      throw error;
    }
  };

  const patchLostItem = async () => {
    const accessToken = localStorage.getItem("access");

    console.log(report.id);
    console.log(accessToken);
    try {
      const response = await axios.patch(
        `http://findit.p-e.kr:8080/api/items/lost/${report.id}/status`,
        {
          status: "REGISTERED",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data);
      return response;
    } catch (error) {
      console.error("거래 실패:", error);

      if (error.response.status === 401) {
        console.log(error.response.status);
        alert("게시글을 등록하려면 로그인해주세요");
      }
      throw error;
    }
  };

  return (
    <Container>
      <TopNavBack></TopNavBack>
      {isModal && <SearchModal findReports={modalData} onClose={closeModal} pageType={pageType} />}
      <Box>
        <DetailBox>
          <DetailImg src={report.image} alt={report.name} />
          <ContenTitle>
            <h1>{report.name}</h1>
          </ContenTitle>
          <ContentMain>
            <MapDiv ref={mapRef}></MapDiv>
            <ContentDetail>
              <ContentDetailBox>
                <TitleBox>
                  <Title mode={pageType}>
                    {pageType === "lost" ? "분실물" : "습득물"}
                  </Title>
                  <Title2>{report.category}</Title2>
                </TitleBox>
                <div>
                  <LabelBox>
                    <Label>브랜드 :</Label>
                    <LabelData> {report.brand}</LabelData>
                  </LabelBox>
                  <LabelBox>
                    <Label>색상 :</Label>
                    <LabelData> {report.color}</LabelData>
                  </LabelBox>
                  <LabelBox>
                    <Label>위치 :</Label>
                    <LabelData> {report.address}</LabelData>
                  </LabelBox>
                  <LabelBox>
                    <Label>날짜 :</Label>
                    <LabelData> {report.reportDate}</LabelData>
                  </LabelBox>
                  <LabelBox>
                    <Label>분류번호 :</Label>
                    <LabelData>몰라</LabelData>
                  </LabelBox>
                </div>
              </ContentDetailBox>
            </ContentDetail>
          </ContentMain>
          <ShareIconBox>
            <ImageSearch
              src="/img/ImageSearch.png"
              alt="이미지분석아이콘"
              onClick={handleVisionSearch}
            />
            {pageType === "lost" ? (
              <ImageSearch
                src="/img/Shopping.png"
                alt="거래완료"
                onClick={patchLostItem}
              />
            ) : (
              <ImageSearch
                src="/img/Share.png"
                alt="거래완료"
                onClick={patchFoundItem}
              />
            )}
            <ShareIcon
              src="/img/Share.png"
              alt="공유아이콘"
              onClick={handleShare}
            />
          </ShareIconBox>
          <DescriptionBox>{report.description}</DescriptionBox>
        </DetailBox>
        <Comments report={report} pageType={pageType} />
      </Box>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
`;

const Box = styled.div`
  position: relative;
  top: 75px;
  padding: 16px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    top: calc(var(--vh, 1vh) * 8);
    max-height: calc(100% - (calc(var(--vh, 1vh) * 16)));
  }
`;

const DetailBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailImg = styled.img`
  width: 75%;
  aspect-ratio: 1/1; // 가로세로비율. 1대1비율로 넣어야 정사각형이 된다
  height: 100%;
  object-fit: contain;
  border-radius: 5%;
  margin-bottom: 3rem;
`;

const ContenTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;

  img {
    width: 6%;
  }
`;

const ContentMain = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const MapDiv = styled.div`
  width: 50%;
  padding-bottom: 50%; /* Maintains a square aspect ratio */
  position: relative;
  z-index: 10;
  border: 2px solid #000;

  /* Inner div to hold the map, filling the square container */
  & > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const ContentDetail = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentDetailBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  @media (max-width: 400px) {
    font-size: 13px;
  }
`;

const Title = styled.div`
  background-color: ${(props) =>
    props.mode === "lost" ? "#ffb978" : "#ef0000"};
  color: #ffffff;
  width: 40%;
  padding: 5px;
  border-radius: 1.5rem;
  text-align: center;
  font-weight: bold;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const Title2 = styled.div`
  background-color: #1876d2;
  color: #ffffff;
  width: 40%;
  padding: 5px;
  border-radius: 1.5rem;
  text-align: center;
  font-weight: bold;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  margin-left: 0.5rem;
`;

const LabelBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;

const Label = styled.div`
  font-weight: bold;
  width: 40%;
`;

const LabelData = styled.div`
  width: 60%;
  font-weight: 550;
`;
const ShareIconBox = styled.div`
  display: flex;
  width: 100%;
  text-align: end;
  margin: 1rem 0;
  justify-content: flex-end;
  align-items: center;
`;

const ImageSearch = styled.img`
  width: 2rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const ShareIcon = styled.img`
  width: 2rem;
  cursor: pointer;
`;

const DescriptionBox = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  font-weight: bold;
  background-color: #f9f9f9;
`;
