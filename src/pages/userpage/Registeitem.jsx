import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import Item from "../../component/item/Item";
import styled from "styled-components";
import TopNavBack from "../TopNavBack";
import { styled as muiStyled } from "@mui/material/styles"; // muiStyled로 이름 변경
import Switch from "@mui/material/Switch";
import { useFindListQuery } from "../../apis/FindQuery";
import { myFind, myLost } from "../../apis/MyRegister";

const Registeitem = () => {
  const [itemType, setItemType] = useState("lost");
  const [findReports, setFindReports] = useState([])

  useEffect(() => {
    const getReports = async () => {
      try {
        if(itemType == "lost"){
          const response = await myLost();
          setFindReports(response)
        }else if(itemType == "find"){
          //setItemType("find")
          const response = await myFind();
          setFindReports(response)
        }
      } catch (error) {
        console.error(error);
      }
    };

    getReports();
  }, [itemType]);

  const handleTypeChange = (event) => {
    setItemType(event.target.value);
  };

  return (
    <Container>
      <TopNavBack />
      <InnerContainer>
        <TitleSwitch>
          <Text>등록물건보기</Text>
          <SelectContainer>
            <Select onChange={handleTypeChange} value={itemType}>
              <option value="lost">분실물</option>
              <option value="found">습득물</option>
            </Select>
          </SelectContainer>
        </TitleSwitch>
        <ListBox>
          <Item findReports={findReports} pageType={itemType}></Item>
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
  width: 100%;
`;

const InnerContainer = styled.div`
  margin-top: 75px;
  margin-bottom: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TitleSwitch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

const Text = styled.div`
  font-size: 24px;
  font-weight: 700;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:2%;
  @media (max-width: 440px) {
    // 화면너비가 440px 이하일 때 고정
    font-size: 18px;
  }
`;

const ListBox = styled.div`
  //background-color: #f0f0f0;
  width: 100%;
  min-height: 73.9vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const AntSwitch = muiStyled(Switch)(({ theme }) => ({
  width: 38,
  height: 20,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(20px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#ff393c",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 16,
    height: 16,
    borderRadius: 10,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 10,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "#ffb978",
    boxSizing: "border-box",
  },
}));

const Line = styled.div`
  width:95%;
  display:flex;
  flex-direction:row;
  justify-content:flex-end;
  padding-right: 5%;
  padding-bottom:2%;
`

const ToggleButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4a90e2;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357ab8;
  }
`;

const SelectContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 5%;
  padding-bottom: 2%;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4a90e2;
  }
`;