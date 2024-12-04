import React, { useEffect, useState } from "react";
import TopNavBack from "../TopNavBack";
import Nav from "../Nav";
import styled from "styled-components";
import MessageAlert from "../../component/userpage/MessageAlert";
import { latestMessage } from "../../apis/messageApi";
import { useRecoilValue } from "recoil";
import { userIDAtom } from "../../recoil/userID";

const Message = () => {
  //const userID = useRecoilValue(userIDAtom);
  //console.log("Recoil User ID:", userID);
  const userID = localStorage.getItem("userID")

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messageList = async () => {
      try {
        const response = await latestMessage(userID);
        setMessages(response);
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    };

    messageList();
  }, []);

  return (
    <Container>
      <TopNavBack />
      <InnerContainer>
        <Text>쪽지함</Text>
        <ListBox>
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <MessageAlert
                key={index}
                message={msg.message}
                receiverId={msg.receiverId}
                senderId={msg.senderId}
                timestamp={msg.timestamp}
                itemId={msg.itemId}
                itemType={msg.itemType}
                itemName={msg.itemName}
                itemImageUrl={msg.itemImageUrl}
              />
            ))
          ) : (
            <NoMessageText>메시지가 없습니다.</NoMessageText>
          )}
        </ListBox>
      </InnerContainer>
      <Nav />
    </Container>
  );
};

export default Message;

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
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Text = styled.div`
  font-size: 24px;
  font-weight: 700;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2%;
  @media (max-width: 440px) {
    // 화면너비가 440px 이하일 때 고정
    font-size: 18px;
  }

  margin-bottom: 2%;
`;

const ListBox = styled.div`
  //background-color: #f0f0f0;
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;


const NoMessageText = styled.div`
  font-size: 16px;
  color: #999;
  margin-top: 20px;
`;