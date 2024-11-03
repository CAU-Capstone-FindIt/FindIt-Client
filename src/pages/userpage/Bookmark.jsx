import React from "react";
import Nav from "../Nav";
import Item from "../../component/item/Item";
import styled from "styled-components";
import TopNavBack from "../TopNavBack";

const Bookmark = () => {
  return (
    <Container>
      <TopNavBack />
      <InnerContainer>
        <Text>즐겨찾기</Text>
        <ListBox>
          <Item />
          <Item />
          <Item />
        </ListBox>
      </InnerContainer>
      <Nav />
    </Container>
  );
};

export default Bookmark;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  margin-top:10vh;
  margin-bottom:9vh;
  display:flex;
  flex-direction:column;
  align-items:center;
`
const Text = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
`;
const ListBox = styled.div`
  background-color: #f0f0f0;
  width: 600px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items:center;
  overflow-y: auto;
`;
