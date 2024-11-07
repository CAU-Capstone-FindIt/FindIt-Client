import React, { useState } from "react";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";

const UserBox = ({point}) => {
  // 나중에 이름 받아와야 함
  // 나중에 포인트 받아와야 함

  const [nickname, setNickname] = useState("닉네임"); // 닉네임 상태 관리
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 관리

  const dummey = {
    name: "김태진",
    nicname: "kimtree24",
  };

  const editNickname = () => {
    setIsEditing(true);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleNicknameSubmit = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <Container>
      <ImageBox></ImageBox>
      <TextBox>
        <Text>이름 :</Text>
        <Text>닉네임 :</Text>
        <Text>포인트 :</Text>
      </TextBox>
      <TextBox2>
        <Text>{dummey.name}</Text>
        {isEditing ? (
          <NicknameInput
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            onKeyPress={handleNicknameSubmit}
            maxLength={15}
            autoFocus
          />
        ) : (
          <Text>{nickname}</Text>
        )}
        <Text>{point}P</Text>
      </TextBox2>
      <EditIcon onClick={editNickname} style={{ cursor: "pointer" }} />
    </Container>
  );
};

export default UserBox;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 600px;
  height: 250px;
  background-color: #f1f1f1;
`;

const ImageBox = styled.img`
  width: 200px;
  height: 200px;
  background-color: #d9d9d9;
  border-radius: 50%;
`;

const TextBox = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const Text = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const TextBox2 = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
`;

const NicknameInput = styled.input`
  font-size: 30px;
  font-weight: bold;
  text-align: right;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  width: 100%;
`;