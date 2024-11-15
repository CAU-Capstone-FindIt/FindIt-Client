import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TopNav = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <AppTitle>
        <MainTitle>FIND IT</MainTitle>
        <SubTitle>for CAU</SubTitle>
      </AppTitle>
    </Container>
  );
};

export default TopNav;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 600px;
  max-height: 70px;
  height: 70px; // 네비게이션 바의 높이를 화면 비율에 맞춰 설정 (전체 화면의 10%)
  bottom: 0;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 600px) {
    height: calc(
      var(--vh, 1vh) * 8
    ); // 작은 화면에서는 화면 비율에 맞게 높이 설정 전체 높이의 &%
  }

  z-index: 100;
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
  margin-top: -5px;
`;
