import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TopNavBack from "./TopNavBack";
import { useReportContext } from "../apis/ReportContext";

const { kakao } = window;
const ReportMode = () => {
  const mapRef = useRef(null); // 지도 DOM 요소를 참조하는 ref

  const [showReportButtons, setShowReportButtons] = useState(false); // 신고 버튼 표시 여부
  const [reportMode, setReportMode] = useState(null); // 신고 모드 (분실물/습득물)
  const markerRef = useRef(null); // 마커 객체를 참조하는 ref

  const location = useLocation();
  const [mode, setMode] = useState("");

  const { setReportInfo } = useReportContext(); // Context에서 함수 가져오기

  const navigate = useNavigate();

  useEffect(() => {
    initializeMap();

    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("mode") === "lost") {
      setMode("lost");
    } else if (queryParams.get("mode") === "found") {
      setMode("found");
    } else {
      console.log("분실물/ 습득물 모드가 불확실합니다");
    }
    // 실행되자마자는 안되지만 제보 누를때는 출력됨
    console.log(mode);
  }, []);

  const initializeMap = async () => {
    // useRef훅을 사용하여 mapRef를 생성함(참조 객체) => 지도를 가르키게 될 예정
    // mapRef.current은 실제 DOM 요소를 가르키게 됨 => 카카오 지도 API는 이 DOM 요소를 사용하여 지도를 렌더링합니다.
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(37.50430682147865, 126.95684252267118),
      level: 3,
    };

    // 지도를 생성하는 카카오 맵 api 함수
    const map = new kakao.maps.Map(container, options);

    // 마커 생성
    markerRef.current = new kakao.maps.Marker({
      position: map.getCenter(), // 초기 마커 위치
      map: map, // 마커가 표시될 지도
    });

    // 지도가 움직일 때 마커 위치 업데이트
    kakao.maps.event.addListener(map, "center_changed", () => {
      const newCenter = map.getCenter();
      markerRef.current.setPosition(newCenter); // 마커 위치 업데이트
    });
  };

  const handleReport = () => {
    const position = markerRef.current.getPosition(); // 마커 위치 가져오기
    const lat = position.getLat();
    const lng = position.getLng();
    console.log("보고서 제출: ", position);
    console.log(mode);
    // 위치와 함께 양식으로 이동하는 로직을 추가할 수 있습니다.

    // Context에 모드와 위치 정보를 설정
    setReportInfo({ mode, position: { lat, lng } });

    navigate("/form"); // form 페이지로 이동 (경로는 설정한 대로 변경)
  };

  return (
    <Container>
      <TopNavBack></TopNavBack>

      <MapDiv ref={mapRef}></MapDiv>

      <ReportButton onClick={handleReport}>제보</ReportButton>
    </Container>
  );
};

export default ReportMode;

const Container = styled.div`
  position: relative; // 버튼을 위치시키기 위해 relative 설정
  width: 100%;
  height: 100%;
`;

// const MapContainer = styled.div``;

const MapDiv = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const ReportButton = styled.button`
  position: absolute;
  bottom: 20px; // 화면 하단에서의 위치
  left: 50%;
  transform: translateX(-50%); // 버튼을 중앙 정렬
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007cff; // 버튼 배경색
  color: white; // 버튼 글자색
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  z-index: 100; // 맵 위에 버튼 표시

  &:hover {
    background-color: #0051a8; // hover 시 색상 변경
  }
`;
