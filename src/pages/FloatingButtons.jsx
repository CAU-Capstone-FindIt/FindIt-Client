import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

const FloatingButtons = ({ onStartReport }) => {
  const [showReportButtons, setShowReportButtons] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false); // 버튼 눌림 상태 추가

  const navigate = useNavigate();
  const handleMainButtonClick = () => {
    setShowReportButtons((prev) => !prev);
    setIsButtonPressed((prev) => !prev);
  };

  const handleLostBtn = () => {
    navigate("/report?mode=lost");
  };

  const handleFindBtn = () => {
    navigate("/report?mode=found");
  };

  return (
    <>
      {showReportButtons && (
        <Overlay onClick={() => setShowReportButtons(false)} />
      )}
      <FixedButton
        onClick={handleMainButtonClick}
        pressed={isButtonPressed} // 눌림 상태 전달
      >
        +
      </FixedButton>
      {showReportButtons && (
        <ButtonContainer show={showReportButtons}>
          <BtnBox>
            분실물 신고
            <ActionButton onClick={handleLostBtn}>?</ActionButton>
          </BtnBox>
          <BtnBox>
            습득물 신고
            <ActionButton onClick={handleFindBtn}>!</ActionButton>
          </BtnBox>
        </ButtonContainer>
      )}
    </>
  );
};

export default FloatingButtons;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(33, 33, 33, 0.9); // 반투명한 회색 배경
  z-index: 999;

  pointer-events: none; // 오버레이말고 다른걸 클릭할수는 없게되는데 그냥 무시하고 되어버리긴 함. 의도는 됨
  @media (max-width: 600px) {
    position: fixed;
  }
`;

// 등장 애니메이션 (위로 올라오는 효과)
const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 사라지는 애니메이션 (아래로 내려가는 효과)
const slideDown = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(30px);
  }
`;

const FixedButton = styled.button`
  position: absolute;
  bottom: 15%; // 화면 높이의 5% 위치에 버튼이 오도록 설정
  right: 6%; // 화면 너비의 5% 위치에 버튼이 오도록 설정
  width: 50px;
  height: 50px;
  border-radius: 50%;

  color: white;
  border: none;
  z-index: 1000;
  font-size: 1.5rem;

  background-color: ${({ pressed }) =>
    pressed ? "#0051a8" : "#007cff"}; // 눌렸을 때 색상 변경

  transition: background-color 0.5s; // 색상 변경 시 1초의 변화를 줌

  @media (max-width: 600px) {
    position: fixed;
    bottom: 15vh; // 화면 높이의 5% 위치에 버튼이 오도록 설정
    right: 10vw; // 화면 너비의 5% 위치에 버튼이 오도록 설정
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 24%; // 동일하게 vh 단위로 설정
  right: 6%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;

  cursor: pointer;
  transition: transform 0.3s;

  &:active {
    transform: scale(1.2);
  }

  animation: ${({ show }) =>
    show
      ? css`
          ${slideUp} 0.7s ease-out forwards
        `
      : css`
          ${slideDown} 0.7s ease-in forwards
        `};

  @media (max-width: 600px) {
    position: fixed;
    bottom: 22vh; // 동일하게 vh 단위로 설정
    right: 10vw;
  }
`;

const ActionButton = styled.button`
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 50%;
  border: none;
  font-size: 1.5rem;
  background-color: white;
  color: black;

  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #c0c0c0;
`;
