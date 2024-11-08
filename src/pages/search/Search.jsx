import styled from "styled-components";
import React from "react";
import TopNav from "../TopNav";
import Nav from "../Nav";
import axios from "axios";
import { useFindListQuery } from "../../apis/FindQuery";
import Item from "../../component/item/Item";
import { styled as muiStyled } from "@mui/material/styles"; // muiStyled로 이름 변경
import Switch from "@mui/material/Switch";
import SearchForm from "../../component/search/SearchForm";

const Search = () => {
  // 추후 로그인 여부에 따른 컴포넌트 랜더링 변경 필요

  const { data: findReports, isLoading } = useFindListQuery();


  return (
    <Container>
      <TopNav />
      <InnerContainer>
      <SearchForm/>
      <ListBox>
        {!isLoading ? (
          <Item findReports={findReports}></Item>
        ) : (<div></div>
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
flex-direction:column;
align-items:center;
`

const ListBox = styled.div`
  //background-color: #f0f0f0;
  width: 600px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-top:10px;
`;