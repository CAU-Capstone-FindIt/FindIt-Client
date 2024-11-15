import React from "react";
import Nav from "./Nav";
import styled from "styled-components";
import TopNav from "./TopNav";
import Item from "../component/item/Item";
import { useNavigate } from "react-router-dom";
import { useLostListQuery } from "../apis/LostQuery";

const Lost = () => {
  const { data: findReports, isLoading } = useLostListQuery();

  console.log(findReports);

  return (
    <Container>
      <TopNav></TopNav>
      <ListContainer>
        {!isLoading ? (
          <Item findReports={findReports}></Item>
        ) : (
          <NoReportsMessage>No reports found.</NoReportsMessage>
        )}
      </ListContainer>
      <Nav></Nav>
    </Container>
  );
};

export default Lost;

const Container = styled.div`
  background-color: white;
  width: 600px;
  height: 100%;
`;

const ListContainer = styled.div`
margin-top: 75px;
margin-bottom: 75px;
display: flex;
flex-direction:column;
align-items:center;
background-color: #f8f8f8;
min-height: 100%;

/* position: relative;
  top: 75px;
  background-color: #f8f8f8;
  padding: 16px;
  overflow-y: auto;
  height: 100%;
  max-height: calc(
    100% - 16vh
  ); // 위 아래 네브바 합쳐서 16vh안으로 보이게 한다.
  box-sizing: border-box;

  // 스크롤바 숨기기
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 150); //스크롤바 색상
    border-radius: 10px; //스크롤바 둥근 테두리
  } */

  /* &::-webkit-scrollbar-track {
    background: rgba(150, 150, 150, 0.1); //스크롤바 뒷 배경 색상
  } */

  /* @media (max-width: 600px) {
    top: calc(var(--vh, 1vh) * 8);
    max-height: calc(100% - (calc(var(--vh, 1vh) * 16)));
  } */
`;

const ReportItem = styled.div`
  width: 100%;
  height: 22vh;
  background: white;
  margin: 8px 0;
  padding: 18px 36px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NoReportsMessage = styled.p`
  color: white;
  text-align: center;
  padding: 16px;
`;

const ListImg = styled.img`
  width: 35%;
  height: 100%;
  object-fit: cover;
  border-radius: 5%;
`;

const Content = styled.div`
  width: 55%;
  text-align: end;

  /* h2 {
    margin: ;
  } */
  h4 {
    margin-bottom: 10px;
  }
  div {
    display: flex;
    justify-content: flex-end;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 10%;
    height: 10%;
  }
`;

const CategoryBox = styled.h6`
  background-color: #007cff;
  color: white;
  width: 25%;
  padding: 5px;
  border-radius: 1.5rem;
  text-align: center;
  margin-bottom: 15px;
`;