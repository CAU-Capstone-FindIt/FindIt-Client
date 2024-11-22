import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useNavContext } from "../apis/NavContext";

const Nav = () => {
  // 사실상 setActiveNav 호출이 불필요 NavContext에서 url이 이동하면 자동으로 실행되기에
  const { activeNav, setActiveNav } = useNavContext(); // 상태 및 setter 가져오기
  const navigate = useNavigate();
  const storedActiveNav = localStorage.getItem("activeNav");

  const handleNavClick = (index, path) => {
    // setActiveNav(index);
    navigate(path);
    console.log(activeNav);
  };

  return (
    <Container>
      <IconList>
        <IconButton onClick={() => handleNavClick(0, "/")}>
          <img
            src={activeNav === 0 ? "/img/homeBlue.png" : "/img/homeBlack.png"}
            alt="Home"
          />
        </IconButton>
        <IconButton onClick={() => handleNavClick(1, "/find")}>
          <img
            src={
              activeNav === 1
                ? "/img/FindIconBlue.png"
                : "/img/FindIconBlack.png"
            }
            alt="Find"
          />
        </IconButton>
        <IconButton onClick={() => handleNavClick(2, "/lost")}>
          <img
            src={
              activeNav === 2
                ? "/img/LostIconBlue.png"
                : "/img/LostIconBlack.png"
            }
            alt="Lost"
          />
        </IconButton>
        <IconButton onClick={() => handleNavClick(3, "/search")}>
          <img
            src={
              activeNav === 3 ? "/img/SearchBlue.png" : "/img/SearchBlack.png"
            }
            alt="Search"
          />
        </IconButton>
        <IconButton onClick={() => handleNavClick(4, "/userpage")}>
          <img
            src={activeNav === 4 ? "/img/UserBlue.png" : "/img/UserBlack.png"}
            alt="User"
          />
        </IconButton>
      </IconList>
    </Container>
  );
};

export default Nav;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  max-height: 600px;
  // height: 8vh; // 네비게이션 바의 높이를 화면 비율에 맞춰 설정 (전체 화면의 10%)
  height: 70px; // 네비게이션 바의 높이를 화면 비율에 맞춰 설정 (전체 화면의 10%)
  border-top: solid 1px #d6d6d6;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    height: calc(
      var(--vh, 1vh) * 8
    ); // 작은 화면에서는 화면 비율에 맞게 높이 설정 전체 높이의 &%
  }

  z-index: 10000;
`;

const IconList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const IconButton = styled.button`
  flex: 1;
  padding: 10px; // 위아래로 패딩 추가하여 클릭 가능한 영역을 확장
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 30%;
  }

  &:hover {
    background-color: #f0f0f0; // 마우스 호버 시 배경색을 살짝 변경
    border-radius: 10%;
  }
`;
