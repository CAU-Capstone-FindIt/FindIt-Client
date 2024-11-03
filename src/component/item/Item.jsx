import React from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import TestImage from "../../source/testimage.png"
import StarBorderIcon from "@mui/icons-material/StarBorder";

const dummy = {
  image: "",
  isBookmark: false,
  itemTitle: "아이폰 미니13",
  itemTag: "전자기기",
  loca: "경영경제관 일대",
  date: 20241010,
  id:11
}

const formatDate = (date) => {
  const dateString = date.toString();
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  return `${year}.${month}.${day}.`;
};

const Item = () => {
  return (
    <Container>
      {dummy.image ? (
        <ImageBox src={dummy.image} alt="Item Image" />
      ) : (
        <NoImageBox>등록 이미지 없음</NoImageBox>
      )}
      <ContentBox>
        <TitleLine>{dummy.isBookmark ? (
            <StarIcon style={{ color: "#1876D2", fontSize: "30px" }} />
          ) : (
            <StarBorderIcon style={{ color: "black", fontSize: "30px" }} />
          )}
          {dummy.itemTitle}</TitleLine>
        <Tag>{dummy.itemTag}</Tag>
        <Text>{dummy.loca}</Text>
        <Text>{formatDate(dummy.date)}</Text>
      </ContentBox>
    </Container>
  );
};

export default Item;

const Container = styled.div`
  width: 600px;
  height: 230px;
  background-color: #ffffff;
  border-radius: 30px;
  border: 3px solid #000000;
  box-sizing: border-box;
  display:flex;
  flex-direction: row;
  align-items:center;
  justify-content: space-between;
  margin-top: 24px;
`;

const ImageBox = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  margin-left: 30px;
`;

const NoImageBox = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  margin-left: 30px;
  background-color: #d9d9d9;
  display:flex;
  align-items:center;
  justify-content:center;
`

const ContentBox = styled.div`
    display:flex;
    flex-direction:column;
    align-items: flex-end;
    justify-content: space-between;
    height: 180px;
    margin-right: 15px;
`

const TitleLine = styled.div`
  font-size: 40px;
  font-weight: 750;
  display: flex;
  align-items:center;
  gap: 10px;
`;
const Tag = styled.div`
  width: 90px;
  height: 30px;
  border-radius: 15px;
  background-color: #1876D2;
  font-size: 22px;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 28px;
  font-weight: 700;
`;
