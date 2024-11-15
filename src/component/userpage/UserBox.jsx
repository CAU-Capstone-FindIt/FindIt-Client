import React, { useState } from "react";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";

const UserBox = ({ point }) => {
  const [nickname, setNickname] = useState("닉네임"); // 닉네임 상태 관리
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 관리

  const dummy = {
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
      <ImageBox />
      <InfoContainer>
        <Row>
          <Label>이름:</Label>
          <Value>{dummy.name}</Value>
          <EmptyBox/>
        </Row>
        <Row>
          <Label>닉네임:</Label>
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
            <Value>{nickname}</Value>
          )}
          <StyledEditIcon onClick={editNickname} />
        </Row>
        <Row>
          <Label>포인트:</Label>
          <Value>{point}P</Value>
          <EmptyBox/>
        </Row>
      </InfoContainer>
    </Container>
  );
};

export default UserBox;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  width: 550px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  gap: 20px;
`;

const ImageBox = styled.div`
  width: 150px;
  height: 150px;
  background-color: #d9d9d9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #333;
  width: 30%;
`;

const Value = styled.div`
  font-size: 22px;
  color: #666;
  flex: 1;
  text-align: right;
`;

const NicknameInput = styled.input`
  font-size: 22px;
  font-weight: 500;
  color: #666;
  text-align: right;
  border: none;
  border-bottom: 2px solid #ddd;
  outline: none;
  width: 100%;
  padding: 5px;
  transition: border-color 0.3s;

  &:focus {
    border-bottom: 2px solid #4a90e2;
  }
`;

const StyledEditIcon = styled(EditIcon)`
  cursor: pointer;
  color: #4a90e2;
  margin-left: 8px;
  transition: color 0.3s;

  &:hover {
    color: #357ab8;
  }
`;

const EmptyBox = styled.div`
  width: 32px;
`