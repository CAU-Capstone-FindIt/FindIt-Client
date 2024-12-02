import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { yourIdAtom } from "../../recoil/userID";

const MessageAlert = ({ message, receiverId, timestamp, itemId, itemType, itemName, itemImageUrl }) => {
  const navigate = useNavigate();
  //const [yourId, setYourIdAtom] = useRecoilState(yourIdAtom)

  const handleClick = () => {
    //setYourIdAtom(senderId)
    navigate("/messageDetail", { state: { itemId, itemType, receiverId } });
  };

  const formatDate = (date) => {
    const dateString = date.toString();
    const year = dateString.slice(0, 4);
    const month = dateString.slice(5, 7);
    const day = dateString.slice(8, 10);
    return `${year}.${month}.${day}.`;
  };

  const formatMessage = (message)=>{
    const newMessage = message.slice(12,-2)
    return newMessage
  }

  return (
    <Container onClick={handleClick}>
      <IconWrapper>
        <ImageBox image={itemImageUrl} />
      </IconWrapper>
      <ContentWrapper>
        <Title>{`${itemName}`}</Title>
        <MessageText>{formatMessage(message)}</MessageText>
      </ContentWrapper>
      <DateText>{formatDate(timestamp)}</DateText>
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
  cursor: pointer;
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  margin-right: 3%;
`;

const ImageBox = styled.div`
  width: 60px;
  height: 60px;
  //background-color: #d9d9d9;
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
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