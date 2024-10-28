import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import TopNavBack from "./TopNavBack";
import { Category } from "@mui/icons-material";
import Comments from "./Comments";
import axios from "axios";

const { kakao } = window;

const Detail = () => {
  const { state } = useLocation(); // 전달된 상태에 접근
  const report = state; // 이 상태에는 보고서 객체가 포함되어 있습니다

  const mapRef = useRef(null); // 지도 DOM 요소를 참조하는 ref

  useEffect(() => {
    // 카카오 지도 API를 사용하여 지도 초기화
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(report.position.lat, report.position.lng), // 위도, 경도
      level: 3, // 줌 레벨
    };

    console.log(report);
    const map = new kakao.maps.Map(container, options); // 지도 생성

    const { lat, lng } = report.position; // 좌표 가져오기
    const markerPosition = new kakao.maps.LatLng(lat, lng);

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      map: map, // 마커가 표시될 지도
    });
    marker.setMap(map); // 지도에 마커 추가
  }, []);

  return (
    <Container>
      <TopNavBack></TopNavBack>
      <Box>
        <DetailBox>
          <DetailImg src={report.image} alt={report.name} />
          <ContenTitle>
            <img src="/img/StarBlack.png" alt="즐겨찾기 미등록" />
            <h1>{report.name}</h1>
          </ContenTitle>
          <ContentMain>
            <MapDiv ref={mapRef}></MapDiv>
            <ContentDetail>
              <ContentDetailBox>
                <TitleBox>
                  <Title mode={report.mode}>
                    {report.mode === "lost" ? "분실물" : "습득물"}
                  </Title>
                  <Title2>{report.category}</Title2>
                </TitleBox>
                <div>
                  <LabelBox>
                    <Label>브랜드 :</Label>
                    <div> {report.brand}</div>
                  </LabelBox>
                  <LabelBox>
                    <Label>색상 :</Label>
                    <div> {report.color}</div>
                  </LabelBox>
                  <LabelBox>
                    <Label>위치 :</Label>
                    <div> {report.location}</div>
                  </LabelBox>
                  <LabelBox>
                    <Label>날짜 :</Label>
                    <div> {report.date}</div>
                  </LabelBox>
                  <LabelBox>
                    <Label>분류번호 :</Label>
                    <div>몰라</div>
                  </LabelBox>
                </div>
              </ContentDetailBox>
            </ContentDetail>
          </ContentMain>
          <ShareIconBox>
            <ShareIcon src="/img/Share.png" alt="공유아이콘" />
          </ShareIconBox>
          <DescriptionBox>{report.description}</DescriptionBox>
        </DetailBox>
        <Comments report={report} />
      </Box>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  background-color: white;
  width: 500px;
  height: 100%;
`;

const Box = styled.div`
  position: relative;
  top: 8vh;
  padding: 16px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 500px) {
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
  object-fit: cover;
  border-radius: 5%;
  margin-bottom: 3rem;
`;

const ContenTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
`;

const Title = styled.div`
  background-color: ${(props) =>
    props.mode === "lost" ? "#ffb978" : "#FF0000"};
  color: #ffffff;
  width: 40%;
  padding: 5px;
  border-radius: 1.5rem;
  text-align: center;
  font-weight: bold;
`;

const Title2 = styled.div`
  background-color: #007cff;
  color: #ffffff;
  width: 40%;
  padding: 5px;
  border-radius: 1.5rem;
  text-align: center;
  font-weight: bold;
`;

const LabelBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const Label = styled.div`
  font-weight: bold;
`;

const ShareIconBox = styled.div`
  width: 100%;
  text-align: end;
  margin-top: 2rem;
`;

const ShareIcon = styled.img`
  width: 6%;
`;

const DescriptionBox = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  font-weight: bold;
  background-color: #f9f9f9;
`;
