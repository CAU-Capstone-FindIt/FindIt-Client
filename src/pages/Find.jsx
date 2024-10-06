import React from "react";
import Nav from "./Nav";
import styled from "styled-components";
import TopNav from "./TopNav";

const Find = () => {
  return (
    <Container>
      <TopNav></TopNav>
      <Nav></Nav>
    </Container>
  );
};

export default Find;

const Container = styled.div`
  background-color: gray;
  width: 600px;
  height: 100%;
`;
