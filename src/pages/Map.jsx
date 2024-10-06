import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const { kakao } = window;

const Map = () => {
  const mapRef = useRef(null); // 지도 DOM 요소를 참조하는 ref

  const [showReportButtons, setShowReportButtons] = useState(false); // 신고 버튼 표시 여부
  const [reportMode, setReportMode] = useState(null); // 신고 모드 (분실물/습득물)
  const [marker, setMarker] = useState(null); // 마커 객체 관리

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [selectedReport, setSelectedReport] = useState(null); // 선택된 신고 정보

  useEffect(() => {
    initializeMap();
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

    // 로컬 스토리지에서 데이터 가져오기
    const reports = JSON.parse(localStorage.getItem("lostAndFoundData")) || [];

    // 각 신고에 대해 마커 생성하기
    reports.forEach((report) => {
      const { lat, lng } = report.position; // 좌표 가져오기
      const markerPosition = new kakao.maps.LatLng(lat, lng);

      const markerImageUrl =
        report.mode === "lost"
          ? `img/LostIconTemp.png`
          : `img/FindIconTemp.png`;

      // 마커 이미지 생성
      const markerImage = new kakao.maps.MarkerImage(
        markerImageUrl,
        new kakao.maps.Size(20, 32)
      );

      // 마커 생성
      const newMarker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
        map: map,
      });

      kakao.maps.event.addListener(newMarker, "click", () => {
        console.log(report);
        setSelectedReport(report); // 선택된 신고 정보 설정
        setIsModalOpen(true); // 모달 열기
      });
    });
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedReport(null); // 선택된 신고 정보 초기화
  };

  return (
    <>
      <MapDiv ref={mapRef}></MapDiv>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        report={selectedReport}
      />
    </>
  );
};

export default Map;

const MapDiv = styled.div`
  width: 100%;
  height: 100%;

  z-index: 10;
`;
