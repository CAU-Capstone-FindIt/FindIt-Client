import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TopNavBack = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Img
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src="/img/arrowBack.png" alt="뒤로가기 버튼" />
      </Img>
      <h1>FIND IT</h1>
    </Container>
  );
};

export default TopNavBack;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 600px;
  height: 8vh; // 네비게이션 바의 높이를 화면 비율에 맞춰 설정 (전체 화면의 10%)
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

  img {
    width: 1.5rem;
  }
`;

const Img = styled.div`
  cursor: pointer;
  position: absolute;
  left: 5%;
`;