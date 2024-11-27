import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import styled from "styled-components";
import TopNav from "./TopNav";
import Item from "../component/item/Item";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useFindListQuery } from "../apis/FindQuery";
import { useNavContext } from "../apis/NavContext";

const Find = () => {
  const { data: findReports, isLoading } = useFindListQuery();

  const { setActiveNav } = useNavContext();

  console.log(findReports);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveNav(1);
  }, []);

  return (
    <Container>
      <TopNav></TopNav>
      <ListContainer>
        {!isLoading ? (
          <Item findReports={findReports} pageType="find"></Item>
        ) : (
          <NoReportsMessage>No reports found.</NoReportsMessage>
        )}
      </ListContainer>
      <Nav></Nav>
    </Container>
  );
};

export default Find;

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
`;

const ListContainer = styled.div`
  position: relative;
  top: 70px;
  background-color: #f8f8f8;
  padding: 0.5rem;
  overflow-y: auto;
  height: 100%;
  max-height: calc(
    100% - 141px
  ); // 위 아래 네브바 합쳐서 16vh안으로 보이게 한다.
  box-sizing: border-box;

  // 스크롤바 숨기기
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 150); //스크롤바 색상
    border-radius: 10px; //스크롤바 둥근 테두리
  }

  &::-webkit-scrollbar-track {
    background: rgba(150, 150, 150, 0.1); //스크롤바 뒷 배경 색상
  }

  // @media (max-width: 600px) {
  //   top: calc(var(--vh, 1vh) * 8);
  //   max-height: calc(100% - (calc(var(--vh, 1vh) * 16)));
  // }
`;

const ReportItem = styled.div`
  width: 100%;
  height: 22vh;
  background: white;
  margin: 8px 0;
  padding: 18px 36px;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  div {
    font-weight: bold;
    color: #555;
  }
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
  background-color: #1876d2;
  color: white;
  width: 25%;
  padding: 5px;
  border-radius: 1.5rem;
  text-align: center;
  margin: 10px 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;
