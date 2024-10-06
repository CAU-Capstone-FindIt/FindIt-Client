import React, { useState } from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import RoofingIcon from "@mui/icons-material/Roofing";
import Nav from "./Nav";
import Map from "./Map";
import FloatingButtons from "./FloatingButtons";

const Home = () => {
  const [reportMode, setReportMode] = useState(null);
  const [markerVisible, setMarkerVisible] = useState(null);
  const handleStartReport = (mode) => {
    setReportMode(mode);
    if (markerVisible) {
      markerVisible(true); // 마커 표시
    }
  };

  const handleInfoInputClick = () => {
    console.log("정보 입력 버튼 클릭됨");
  };

  return (
    <Container>
      {/* <IconButton color="primary" variant="text">
        <RoofingIcon onClick={handleClick} />
      </IconButton> */}
      <Map></Map>
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
`;
