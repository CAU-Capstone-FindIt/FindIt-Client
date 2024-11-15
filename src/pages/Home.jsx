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

  const { setActiveNav } = useNavContext();

  useEffect(() => {
    setActiveNav(0);
  }, []);

  const handleStartReport = (mode) => {
    setReportMode(mode);
    if (markerVisible) {
      markerVisible(true); // 마커 표시 입니다
    }
  };

  const handleInfoInputClick = () => {
    console.log("정보 입력 버튼 클릭됨");
  };

  return (
    <Container>
      <Map></Map>
      <FilterButton></FilterButton>
      <FloatingButtons onStartReport={handleStartReport} />
      <Nav></Nav>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  background-color: gray;
  width: 600px;
  height: 100%;
  position: relative;
`;
