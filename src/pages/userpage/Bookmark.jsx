import React from "react";
import Nav from "../Nav";
import Item from "../../component/item/Item";
import styled from "styled-components";
import TopNavBack from "../TopNavBack";
import { useFindListQuery } from "../../apis/FindQuery";

const Bookmark = () => {
  const { data: findReports, isLoading } = useFindListQuery();
  return (
    <Container>
      <TopNavBack />
      <InnerContainer>
        <Text>즐겨찾기</Text>
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

export default Bookmark;

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
min-height:100%;
`
const Text = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
const ListBox = styled.div`
  width: 600px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-top:10px;
`;