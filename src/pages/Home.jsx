import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import RoofingIcon from "@mui/icons-material/Roofing";
import Nav from "./Nav";
import Map from "./Map";
import FloatingButtons from "./FloatingButtons";
import FilterButton from "../pages/mappage/FilterButton";
import { useNavContext } from "../apis/NavContext";

const Home = () => {
  const [reportMode, setReportMode] = useState(null);
  const [markerVisible, setMarkerVisible] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(""); // 필터링된 카테고리

  const { setActiveNav } = useNavContext();

  useEffect(() => {
    setActiveNav(0);
  }, []);

  const handleStartReport = (mode) => {
    setReportMode(mode);
    if (markerVisible) {
      markerVisible(true); // 마커 표시
    }
  };

  const handleInfoInputClick = () => {
    console.log("정보 입력 버튼 클릭됨");
  };

  // 카테고리 필터 변경 함수
  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Container>
      <Map selectedCategory={selectedCategory}></Map>
      <FilterButton onFilterChange={handleFilterChange} />
      <FloatingButtons onStartReport={handleStartReport} />
      <Nav></Nav>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  background-color: gray;
  width: 100%;
  height: 100%;
  position: relative;
`;
