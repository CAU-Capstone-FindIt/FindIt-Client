import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import ModalItem from "./mappage/ModalItem";

const Modal = ({ isOpen, onClose, reports }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    // 모달 오버레이를 눌러도 닫히게하고 content를 누르면 닫히지 않게 한다. e.stopPropagation는 클릭이벤트 전파를 중단시킴
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {reports.map((item) => (
          <ModalItem report={item}></ModalItem>
        ))}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

const slideUp = keyframes`
    from {
      transform: translateY(100%); /* 아래에서 시작 */
    }
    to {
      transform: translateY(0); /* 최종 위치로 이동 */
    }
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 하단 정렬 */
  z-index: 2000;
  transition: opacity 0.3s ease; /* 부드러운 전환 효과 */
  width: 100%;
  //heigth: 100vh;

  // 이렇게 해야 모바일 화면 넓이에도 전체로 덮여짐(그전에는 화면 넓이 60%만 차지)
  // 플로팅버튼이랑 같은 맥락인듯?
  @media (max-width: 600px) {
    position: fixed;
  }
`;

const ModalContent = styled.div`
  background: white;
  padding: 4% 6%;
  // 높이 중요!!
  height: 260px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
  transform: translateY(100%); /* 초기 위치 설정 (보이지 않게) */
  animation: ${slideUp} 0.4s forwards; /* 슬라이드 애니메이션 적용 */
  margin-bottom: 70px; /* 네브바 높이만큼 아래 여백 추가 */

  overflow-y: auto; /* 스크롤 가능하게 설정 */

  @media (max-width: 600px) {
    //하단 nav바가 모바일환경에서는 10vh 높이이므로
    margin-bottom: 10vh; /* 네브바 높이만큼 아래 여백 추가 */
    // height: 20%;
  }

  // 스크롤바 숨기기
  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 150); /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }

  &::-webkit-scrollbar-track {
    background: rgba(150, 150, 150, 0.1); /*스크롤바 뒷 배경 색상*/
  }

  @media (max-width: 600px) {
    top: calc(var(--vh, 1vh) * 8);
    max-height: calc(100% - (calc(var(--vh, 1vh) * 16)));
  }
`;
