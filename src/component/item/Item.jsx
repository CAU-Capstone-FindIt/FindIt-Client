import React from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TestImage from "../../source/testimage.png";

const dummy = {
  image: "",
  isBookmark: false,
  itemTitle: "아이폰 미니13",
  itemTag: "전자기기",
  loca: "경영경제관 일대",
  date: 20241010,
  id: 11,
  isFind: false,
};

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
        <TitleLine>
          {dummy.isBookmark ? (
            <StarIcon style={{ color: "#1876D2", fontSize: "30px" }} />
          ) : (
            <StarBorderIcon style={{ color: "black", fontSize: "30px" }} />
          )}
          {dummy.itemTitle}
        </TitleLine>
        <Tag>{dummy.itemTag}</Tag>
        <Text>{dummy.loca}</Text>
        <Text>{formatDate(dummy.date)}</Text>
      </ContentBox>
    </Container>
  );
};

export default Item;

const Container = styled.div`
  width: 590px;
  height: 200px;
  background-color: #ffffff;
  border-radius: 40px;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ImageBox = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 30px;
  margin-left: 30px;
`;

const NoImageBox = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 30px;
  margin-left: 30px;
  background-color: #f0f0f0;
  color: #888;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 180px;
  margin-right: 30px;
`;

const TitleLine = styled.div`
  font-size: 26px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
`;

const Tag = styled.div`
  width: 90px;
  height: 30px;
  border-radius: 15px;
  background-color: #1876d2;
  font-size: 18px;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const Text = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #555;
`;