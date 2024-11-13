import styled from "styled-components";
import React, { useEffect, useState } from "react";
import TopNav from "../TopNav";
import Nav from "../Nav";
import UserBox from "../../component/userpage/UserBox";
import LoginButton from "../../component/userpage/LoginButton";
import MenuBeforLogin from "../../component/userpage/MenuBeforLogin";
import MenuAfterLogin from "../../component/userpage/MenuAfterLogin";
import axios from "axios";

const Userpage = () => {
  // 추후 로그인 여부에 따른 컴포넌트 랜더링 변경 필요
  const [isLogin, setIsLogin] = useState(
    Boolean(localStorage.getItem("access"))
  );

  // useEffect(() => {
  //   // 로그인 상태를 실시간으로 감지하여 업데이트
  //   const handleStorageChange = () => {
  //     setIsLogin(Boolean(localStorage.getItem("access")));
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   // 클린업 함수로 이벤트 리스너 제거
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, [isLogin]);

  return (
    <Container>
      <TopNav />
      <InnerContainer>
        <UserBox />
        {isLogin ? (
          <MenuAfterLogin />
        ) : (
          <>
            <MenuBeforLogin />
            <LoginButton />
          </>
        )}
      </InnerContainer>
      <Nav />
    </Container>
  );
};

export default Userpage;

const Container = styled.div`
  background-color: white;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const InnerContainer = styled.div`
  margin-top: 75px;
  margin-bottom: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
