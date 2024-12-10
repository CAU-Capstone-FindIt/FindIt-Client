import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import axios from "axios";
import { useFindListQuery } from "../apis/FindQuery";
import { useLostListQuery } from "../apis/LostQuery";
import { BorderColor } from "@mui/icons-material";

const { kakao } = window;

const Map = (selectedCategory) => {
  const mapRef = useRef(null); // 지도 DOM 요소를 참조하는 ref

  const [showReportButtons, setShowReportButtons] = useState(false); // 신고 버튼 표시 여부
  const [reportMode, setReportMode] = useState(null); // 신고 모드 (분실물/습득물)
  const [marker, setMarker] = useState(null); // 마커 객체 관리

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [selectedReport, setSelectedReport] = useState(null); // 선택된 신고 정보

  const [mode, setMode] = useState(null); // 분실물/습득물 모드 상태 추가

  const { data: findReports } = useFindListQuery();
  const { data: lostReports } = useLostListQuery();

  useEffect(() => {
    initializeMap();
    console.log(selectedCategory.selectedCategory);
    console.log(findReports);
    console.log(lostReports);
  }, [findReports, lostReports, selectedCategory]);

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

    // 클러스터 설정
    // 클러스터러 옵션 설정 (Find)
    const findClusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 1,
      styles: [
        {
          width: "50px",
          height: "50px",
          border: "7px solid rgb(255 255 255 / 50%)",
          background: "rgb(62 166 235 / 89%)",
          borderRadius: "50%",
          color: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "14px",
          boxSizing: "border-box",
        },
      ],
    });

    // 클러스터러 옵션 설정 (Lost)
    const lostClusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 1,
      styles: [
        {
          width: "50px",
          height: "50px",
          border: "7px solid rgb(255 255 255 / 35%)",
          background: "#e55932",
          borderRadius: "50%",
          color: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "14px",
          boxSizing: "border-box",
        },
      ],
    });

    // 습득물 api get
    try {
      // findReports와 lostReports가 선택된 카테고리에 맞게 필터링
      // 아무것도 없을시에는 즉 카테고리가 모두보기 = "" 일경우에는 모두 findReports, lostReports전체를 선택해서 보여주기
      const filteredFindReports =
        selectedCategory && selectedCategory.selectedCategory
          ? findReports.filter(
              (report) =>
                report.category === selectedCategory.selectedCategory &&
                report.status !== "RETURNED" && // RETURNED 상태 제외
                isWithinTwoWeeks(report.createdDate) // 2주 이내 데이터만 포함
            )
          : findReports.filter(
              (report) =>
                report.status !== "RETURNED" && // RETURNED 상태 제외
                isWithinTwoWeeks(report.createdDate) // 2주 이내 데이터만 포함
            );

      const filteredLostReports =
        selectedCategory && selectedCategory.selectedCategory
          ? lostReports.filter(
              (report) =>
                report.category === selectedCategory.selectedCategory &&
                report.status !== "RETURNED" && // RETURNED 상태 제외
                isWithinTwoWeeks(report.createdDate) // 2주 이내 데이터만 포함
            )
          : lostReports.filter(
              (report) =>
                report.status !== "RETURNED" && // RETURNED 상태 제외
                isWithinTwoWeeks(report.createdDate) // 2주 이내 데이터만 포함
            );

      console.log(filteredFindReports);
      console.log(filteredLostReports);

      let findMarkers = [];
      let lostMarkers = [];

      // 각 신고에 대해 마커 생성하기
      filteredFindReports.forEach((report) => {
        const lat = report.latitude;
        const lng = report.longitude; // 좌표 가져오기
        const markerPosition = new kakao.maps.LatLng(lat, lng);

        const markerImageUrl = `img/FindIconTemp.png`;

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
          setMode("find"); // 모드 상태 설정
          setIsModalOpen(true); // 모달 열기
        });

        findMarkers.push(newMarker);
      });

      console.log(findMarkers);

      findClusterer.addMarkers(findMarkers);

      console.log(lostReports);
      // 각 신고에 대해 마커 생성하기
      filteredLostReports.forEach((report) => {
        const lat = report.latitude;
        const lng = report.longitude; // 좌표 가져오기
        const markerPosition = new kakao.maps.LatLng(lat, lng);

        const markerImageUrl = `img/LostIconTemp.png`;

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
          setMode("lost"); // 모드 상태 설정
          setIsModalOpen(true); // 모달 열기
        });

        lostMarkers.push(newMarker);
      });

      console.log(lostMarkers);
      lostClusterer.addMarkers(lostMarkers);

      kakao.maps.event.addListener(
        findClusterer,
        "clusterclick",
        function (cluster) {
          let data = cluster._markers.map((item) => item.data);
          if (data.length) {
            setSelectedReport(data);
            setMode("find"); // 모드 상태 설정
            setIsModalOpen(true);
          }
        }
      );

      kakao.maps.event.addListener(
        lostClusterer,
        "clusterclick",
        function (cluster) {
          let data = cluster._markers.map((item) => item.data);
          if (data.length) {
            setSelectedReport(data);
            setMode("lost"); // 모드 상태 설정
            setIsModalOpen(true);
          }
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedReport(null); // 선택된 신고 정보 초기화
  };

  const isWithinTwoWeeks = (createdDate) => {
    const currentDate = new Date(); // 현재 날짜
    const reportDate = new Date(createdDate); // 생성 날짜 파싱
    const timeDifference = currentDate - reportDate; // 시간 차이 (밀리초)
    const twoWeeksInMilliseconds = 14 * 24 * 60 * 60 * 1000; // 2주를 밀리초로 변환

    console.log(timeDifference <= twoWeeksInMilliseconds);

    return timeDifference <= twoWeeksInMilliseconds; // 2주 이내인지 확인
  };

  return (
    <>
      <MapDiv ref={mapRef}></MapDiv>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        reports={selectedReport}
        mode={mode} // 모드 전달
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
