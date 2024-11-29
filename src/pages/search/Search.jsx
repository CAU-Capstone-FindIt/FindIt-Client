import styled from "styled-components";
import React, { useState } from "react";
import TopNav from "../TopNav";
import Nav from "../Nav";
import axios from "axios";
import { useFindListQuery } from "../../apis/FindQuery";
import Item from "../../component/item/Item";
import { styled as muiStyled } from "@mui/material/styles"; // muiStyled로 이름 변경
import Switch from "@mui/material/Switch";
import SearchForm from "../../component/search/SearchForm";

//주석

const Search = () => {
  const [findReports, setFindReports] = useState([]);
  const [pageType, setPageType] = useState("");

  return (
    <Container>
      <TopNav />
      <InnerContainer>
        <SearchForm setFindReports={setFindReports} setPageType={setPageType} />
        <ListBox>
          {findReports.length > 0 ? ( // 수정수정: 데이터 조건 추가
            <Item findReports={findReports} pageType={pageType} />
          ) : (
            <NoReportsMessage>No reports found.</NoReportsMessage>
          )}
        </ListBox>
      </InnerContainer>
      <Nav />
    </Container>
  );
};

export default Search;

const Container = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const InnerContainer = styled.div`
  background-color: #f8f8f8;
  margin-top: 75px;
  margin-bottom: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2%;
  width: 100%;
`;

const ListBox = styled.div`
  //background-color: #f0f0f0;
  width: 95%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-top: 3%;
`;

const NoReportsMessage = styled.p`
  text-align: center;
  color: gray;
`;