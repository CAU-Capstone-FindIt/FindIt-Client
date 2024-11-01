import styled from "styled-components";
import React from "react";
import TopNav from "../TopNav";
import Nav from "../Nav";
import UserBox from "../../component/userpage/UserBox";
import LoginButton from "../../component/userpage/LoginButton";
import MenuBeforLogin from "../../component/userpage/MenuBeforLogin";
import MenuAfterLogin from "../../component/userpage/MenuAfterLogin";

const Userpage = () => {
  return (
    <Container>
      <TopNav />
      <UserBox />
      <MenuBeforLogin />
      <LoginButton />
      {/* <MenuAfterLogin/> */}
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