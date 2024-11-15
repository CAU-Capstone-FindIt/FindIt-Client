import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import axios from "axios";
import { useFindListQuery } from "../apis/FindQuery";
import { useLostListQuery } from "../apis/LostQuery";

const { kakao } = window;

const Map = () => {
  const mapRef = useRef(null); // 지도 DOM 요소를 참조하는 ref

  const [showReportButtons, setShowReportButtons] = useState(false); // 신고 버튼 표시 여부
  const [reportMode, setReportMode] = useState(null); // 신고 모드 (분실물/습득물)
  const [marker, setMarker] = useState(null); // 마커 객체 관리

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [selectedReport, setSelectedReport] = useState(null); // 선택된 신고 정보

  const { data: findReports } = useFindListQuery();
  const { data: lostReports } = useLostListQuery();

  useEffect(() => {
    initializeMap();
  }, [findReports]);

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

    var clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 1, // 클러스터 할 최소 지도 레벨
    });

    // 습득물 api get
    try {
      let findMarkers = [];
      let lostMarkers = [];

      // 각 신고에 대해 마커 생성하기
      findReports.forEach((report) => {
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

        newMarker.data = report;

        kakao.maps.event.addListener(newMarker, "click", () => {
          console.log(report);
          setSelectedReport([report]); // 선택된 신고 정보 설정
          setIsModalOpen(true); // 모달 열기
        });

        findMarkers.push(newMarker);
      });

      console.log(findMarkers);

      clusterer.addMarkers(findMarkers);

      kakao.maps.event.addListener(
        clusterer,
        "clusterclick",
        function (cluster) {
          console.info(cluster);
          let data = cluster._markers.map((item) => item.data);
          console.log(data);
          if (data.length) {
            setSelectedReport(data);
            setIsModalOpen(true); // 모달 열기
          }
        }
      );

      // 각 신고에 대해 마커 생성하기
      lostReports.forEach((report) => {
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
          setSelectedReport([report]); // 선택된 신고 정보 설정
          setIsModalOpen(true); // 모달 열기
        });

        lostMarkers.push(newMarker);
      });
    } catch (e) {
      console.error(e);
    }
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
        reports={selectedReport}
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
