import React from "react";
import Nav from "./Nav";
import styled from "styled-components";
import TopNav from "./TopNav";

const Lost = () => {
  return (
    <Container>
      <TopNav></TopNav>
      <Nav></Nav>
    </Container>
  );
};

export default Lost;

const Container = styled.div`
  background-color: gray;
  width: 600px;
  height: 100%;
`;
