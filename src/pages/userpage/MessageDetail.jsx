import React, { useEffect, useRef, useState } from "react";
import TopNavBack from "../TopNavBack";
import Nav from "../Nav";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { yourIdAtom, userIDAtom } from "../../recoil/userID";
import { useLocation } from "react-router-dom";
import { getMessage, sendMessage } from "../../apis/messageApi";

const MessageDetail = () => {
  const location = useLocation();
  //const senderId = location.state?.senderId;
  //const userID = useRecoilValue(userIDAtom);
  const userID = localStorage.getItem("userID");
  //console.log(userID)
  const yourId = useRecoilValue(yourIdAtom);
  //console.log(yourId)
  const itemId = location.state?.itemId;
  //console.log(itemId)
  const itemType = location.state?.itemType;
  const receiverId = location.state?.receiverId;
  const senderId = location.state?.senderId;
  localStorage.setItem("localReceiverId", receiverId)
  localStorage.setItem("localSenderId", senderId)
  let userA;
  if(localStorage.getItem("userID") != localStorage.getItem("localReceiverId")){
    userA = localStorage.getItem("localSenderId")
  }else{
    userA = localStorage.getItem("localReceiverId")
  }

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const chatBoxRef = useRef(null);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const messageList = async () => {
      try {
        //console.log(receiverId)
        const response = await getMessage(localStorage.getItem("localSenderId"), localStorage.getItem("localReceiverId"), itemId, itemType);
        //console.log(userA, userID)
        const formattedMessages = response.map((msg) => ({
          sender: localStorage.getItem("userID") == msg.senderId ? "me" : "you",
          timestamp: `${msg.timestamp.slice(0, 10)} ${msg.timestamp.slice(11, 16)}`,
          message: msg.message
        }));
        setMessages(formattedMessages);
        console.log(response)
        scrollToBottom();
      } catch (error) {
        console.error(error);
        //console.log(userA, userID)
      }
    };

    messageList();

    const interval = setInterval(() => {
      messageList(); // 2초마다 메시지 가져오기
    }, 2000);

    return () => clearInterval(interval);

    //console.log(itemId, itemType, userA)
  }, [setMessages]);


  const handleSendMessage = async() => {
    console.log(itemId, itemType, receiverId, newMessage)
    //let newReceiverId = senderId;
    let userA
    if(localStorage.getItem("userID") == localStorage.getItem("localReceiverId")){
      userA = localStorage.getItem("localSenderId")
    }else{
      userA = localStorage.getItem("localReceiverId")
    }
    const response = await sendMessage(itemId, itemType, userA, newMessage)
    //console.log(response)
    window.location.reload();
    scrollToBottom();

  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     handleSendMessage();
  //     window.location.reload();
  //   }
  // };

  const formatMessage = (message)=>{
    const newMessage = message.slice(12,-2)
    return newMessage
  }

  

  return (
    <Container>
      <TopNavBack />
      <Text>메세지 상세</Text>
      <InnerContainer>
        <ChatBox>
          {messages.map((msg, index) => (
            <MessageBubble key={index} sender={msg.sender}>
              <MessageContent sender={msg.sender}>{formatMessage(msg.message)}</MessageContent>
              <Timestamp sender={msg.sender}>{msg.timestamp}</Timestamp>
            </MessageBubble>
          ))}
        </ChatBox>
        <InputContainer>
          <MessageInput
            placeholder="메세지를 입력하세요..."
            value={newMessage}
            onChange={handleInputChange}
          />
          <SendButton onClick={handleSendMessage}>전송</SendButton>
        </InputContainer>
      </InnerContainer>
      <Nav />
    </Container>
  );
};

export default MessageDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const InnerContainer = styled.div`
  margin-bottom: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y:auto;
`;

const Text = styled.div`
  font-size: 24px;
  font-weight: 700;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 75px;
  @media (max-width: 440px) {
    font-size: 18px;
  }
`;

const ChatBox = styled.div`
  width: 100%;
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 10px;
  overflow-y: auto;
  box-sizing: border-box;
  margin-bottom:13%;
`;

const MessageBubble = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ sender }) => (sender === "me" ? "flex-end" : "flex-start")};
`;

const MessageContent = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  font-size: 16px;
  color: ${({ sender }) => (sender === "me" ? "#fff" : "#333")};
  background-color: ${({ sender }) => (sender === "me" ? "#4a90e2" : "#f1f1f1")};
  border-radius: ${({ sender }) =>
    sender === "me" ? "12px 12px 0 12px" : "12px 12px 12px 0"};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 4px;
  word-wrap: break-word;
  text-align: left;
`;

const Timestamp = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 2px;
  text-align: ${({ sender }) => (sender === "me" ? "right" : "left")};
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  max-width:600px;
  padding: 16px;
  box-sizing: border-box;
  align-items: center;
  gap: 10px;
  position: fixed;
  bottom: 68px;
  background-color: white;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357ab8;
  }
`;