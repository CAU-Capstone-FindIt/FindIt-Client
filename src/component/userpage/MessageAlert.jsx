import React from "react";
import styled from "styled-components";

const MessageAlert = () => {
  // 나중에 백에서 받아올 데이터
  const dummy = {
    title: "아이폰 미니13",
    content:
      "쪽지내용쪽지내용……쪽지내용쪽지내용……쪽지내용쪽지내용……쪽지내용쪽지내용……쪽지내용쪽지내용……쪽지내용쪽지내용……",
    date: 20241001,
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
        <ImageBox />
      </IconWrapper>
      <ContentWrapper>
        <Title>{dummy.title}</Title>
        <MessageText>{dummy.content}</MessageText>
      </ContentWrapper>
      <DateText>{formatDate(dummy.date)}</DateText>
    </Container>
  );
};

export default MessageAlert;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #ffffff;
  padding: 3%;
  width: 90%;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  margin-bottom:6%;
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  margin-right: 3%;
`;

const ImageBox = styled.div`
  width: 60px;
  height: 60px;
  background-color: #d9d9d9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 2%;
`;

const MessageText = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
`;

const DateText = styled.div`
  font-size: 12px;
  color: #999;
  margin-left: auto;
  padding-top: 1%;
  white-space: nowrap;
`;