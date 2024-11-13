import React, { useState } from "react";
import Nav from "../Nav";
import Item from "../../component/item/Item";
import styled from "styled-components";
import TopNavBack from "../TopNavBack";
import { styled as muiStyled } from "@mui/material/styles"; // muiStyled로 이름 변경
import Switch from "@mui/material/Switch";
import { useFindListQuery } from "../../apis/FindQuery";

const Registeitem = () => {
  const { data: findReports, isLoading } = useFindListQuery();
  const [isLostMode, setIsLostMode] = useState  (true);

  const toggleMode = () => setIsLostMode((prev) => !prev);

  const filteredItems = isLostMode
    ? findReports?.filter((item) => item.mode === "lost")
    : findReports?.filter((item) => item.mode === "found");

  return (
    <Container>
      <TopNavBack />
      <InnerContainer>
        <TitleSwitch>
        <Text>등록물건보기</Text>
          <StyledButton onClick={toggleMode} isLostMode={isLostMode}>
            {isLostMode ? "분실물" : "습득물"}
          </StyledButton>
        </TitleSwitch>
        <ListBox>
          {!isLoading ? (
            <Item findReports={findReports}></Item>
          ) : (
            <div>로딩 중...</div>
          )}
        </ListBox>
      </InnerContainer>
      <Nav />
    </Container>
  );
};

export default Registeitem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  margin-top: 75px;
  margin-bottom: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleSwitch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

const StyledButton = styled.button`
  background-color: #cfcfcf;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  border-radius: 13px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin-right: 10px;

  &:hover {
    background-color: ${(props) => (props.isLostMode ? "#1876d2" : "#ff956e")};
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  font-size: 24px;
  font-weight: 700;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListBox = styled.div`
background-color: #f8f8f8;
  width: 600px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-top: 10px;
`;