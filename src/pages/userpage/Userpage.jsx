import styled from "styled-components";
import React from "react";
import TopNav from "../TopNav";
import Nav from "../Nav";
import UserBox from "../../component/userpage/UserBox";
import LoginButton from "../../component/userpage/LoginButton";
import MenuBeforLogin from "../../component/userpage/MenuBeforLogin";
import MenuAfterLogin from "../../component/userpage/MenuAfterLogin";

const Userpage = () => {
  // 추후 로그인 여부에 따른 컴포넌트 랜더링 변경 필요

  return (
    <Container>
      <TopNav />
      <InnerContainer>
        <UserBox />
        <MenuBeforLogin />
        <LoginButton />
        <MenuAfterLogin />
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
margin-top: 70px;
margin-bottom: 70px;
display: flex;
flex-direction:column;
align-items:center;
`