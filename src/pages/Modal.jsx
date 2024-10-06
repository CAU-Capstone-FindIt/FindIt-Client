import React from "react";
import styled, { keyframes } from "styled-components";

const Modal = ({ isOpen, onClose, report }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>신고 세부사항</h2>
        {report ? (
          <>
            <p>이름: {report.name}</p>
            <p>카테고리: {report.category}</p>
            <p>색상: {report.color}</p>
            <p>브랜드: {report.brand}</p>
            <p>날짜: {report.date}</p>
          </>
        ) : (
          <p>신고 정보가 없습니다.</p>
        )}
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

// const Container = styled.div`
//     width: 600px;
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `;

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
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transform: translateY(100%); /* 초기 위치 설정 (보이지 않게) */
  animation: ${slideUp} 0.4s forwards; /* 슬라이드 애니메이션 적용 */
  margin-bottom: 8vh; /* 네브바 높이만큼 아래 여백 추가 */
`;
