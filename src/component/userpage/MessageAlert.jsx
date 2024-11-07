import React from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MessageAlert = () => {

  // 나중에 백에서 받아올 데이터
  const dummey = {
    title: "아이폰 미니13",
    content: "쪽지내용쪽지내용……쪽지내용쪽지내용……쪽지내용쪽지내용……쪽지내용쪽지내용……쪽지내용쪽지내용……쪽지내용쪽지내용……",
    date: 20241001
  };

  const formatDate = (date) => {
    const dateString = date.toString();
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}.${month}.${day}.`;
  };


  return (
    <Container>
      <IconWrapper>
        <ImageBox/>
      </IconWrapper>
      <ContentWrapper>
        <Title>{dummey.title}</Title>
        <MessageText>{dummey.content}</MessageText>
      </ContentWrapper>
      <DateText>{formatDate(dummey.date)}</DateText>
    </Container>
  );
};

export default MessageAlert;

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
  padding: 15px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  margin-right: 15px;
  margin-left: 20px;
`;

const ImageBox = styled.img`
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
  border-radius: 50%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const MessageText = styled.div`
  font-size: 16px;
  color: #333;
  line-height: 1.5;
`;

const DateText = styled.div`
  font-size: 14px;
  color: #666;
  margin-left: auto;
  margin-right: 5px;
  padding-top: 100px;
`;