import React from "react";
import styled, { keyframes } from "styled-components";

const Modal = ({ isOpen, onClose, report }) => {
  if (!isOpen) return null;

  return (
    // 모달 오버레이를 눌러도 닫히게하고 content를 누르면 닫히지 않게 한다. e.stopPropagation는 클릭이벤트 전파를 중단시킴
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <TitleBox>
          <Title mode={report.mode}>
            {report.mode === "lost" ? "분실물" : "습득물"}
          </Title>
        </TitleBox>
        <ContentBox>
          <ModalImg src={report.image} alt="" />
          <ModalRigth>
            {report ? (
              <>
                <h2>{report.name}</h2>
                <div>
                  <CategoryBox>{report.category}</CategoryBox>
                </div>
                <h4>{report.location}</h4>
                <h4>{report.brand}</h4>
                <h4>{report.date}</h4>
              </>
            ) : (
              <p>신고 정보가 없습니다.</p>
            )}
          </ModalRigth>
        </ContentBox>
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
  width: 100%;
  heigth: 100vh;

  // 이렇게 해야 모바일 화면 넓이에도 전체로 덮여짐(그전에는 화면 넓이 60%만 차지)
  // 플로팅버튼이랑 같은 맥락인듯?
  @media (max-width: 600px) {
    position: fixed;
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: end;
`;

const Title = styled.h5`
  background-color: ${(props) =>
    props.mode === "lost" ? "#ffb978" : "#FF0000"};
  color: #ffffff;
  width: 15%;
  padding: 5px;
  border-radius: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  padding: 4% 6%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
  transform: translateY(100%); /* 초기 위치 설정 (보이지 않게) */
  animation: ${slideUp} 0.4s forwards; /* 슬라이드 애니메이션 적용 */
  margin-bottom: 8vh; /* 네브바 높이만큼 아래 여백 추가 */

  @media (max-width: 600px) {
    //하단 nav바가 모바일환경에서는 10vh 높이이므로
    margin-bottom: 10vh; /* 네브바 높이만큼 아래 여백 추가 */
    // height: 20%;
  }
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalImg = styled.img`
  width: 40%;
  height: 40%;
  aspect-ratio: 1/1; // 가로세로비율. 1대1비율로 넣어야 정사각형이 된다
  border-radius: 10px;
`;

const ModalRigth = styled.div`
  width: 50%;
  text-align: end;

  h2,
  h4,
  h5 {
    margin-bottom: 10px;
  }

  div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const CategoryBox = styled.h5`
  background-color: #007cff;
  color: #ffffff;
  width: 40%;
  padding: 5px;
  border-radius: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
`;
