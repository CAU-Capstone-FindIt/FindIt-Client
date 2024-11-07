import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const TopNavBack = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <BackIcon
        onClick={() => {
          navigate(-1);
        }}
        style={{ fontSize: "40px" }}
      />
      <AppTitle>
        <MainTitle>FIND IT</MainTitle>
        <SubTitle>for CAU</SubTitle>
      </AppTitle>
      <EmptyBox />
    </Container>
  );
};

export default TopNavBack;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 600px;
  height: 70px; // 네비게이션 바의 높이를 화면 비율에 맞춰 설정 (전체 화면의 10%)
  bottom: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 600px) {
    height: calc(
      var(--vh, 1vh) * 8
    ); // 작은 화면에서는 화면 비율에 맞게 높이 설정 전체 높이의 &%
  }

  z-index: 100;

  img {
    width: 1.5rem;
  }
`;
const BackIcon = styled(ArrowBackIosNewIcon)`
  cursor: pointer;
  margin-left: 20px;
`;

const EmptyBox = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 20px;
`;

const AppTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const MainTitle = styled.div`
  font-size: 50px;
  font-weight: 800;
`;

const SubTitle = styled.div`
  font-size: 13px;
  font-weight: 900;
  margin-top: -10px;
`;
