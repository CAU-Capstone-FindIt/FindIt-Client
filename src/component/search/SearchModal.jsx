import styled from "styled-components";
import Item from "../item/Item";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const SearchModal = ({ findReports, onClose, pageType }) => {
  const location = useLocation(); // 현재 URL 정보 가져오기

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>{" "}
        {/* 수정수정: 닫기 버튼 */}
        <ListContainer>
          {findReports.length > 0 ? ( // 수정수정: 데이터 조건 추가
            <Item findReports={findReports} pageType={pageType} />
          ) : (
            <NoReportsMessage>No reports found.</NoReportsMessage>
          )}
        </ListContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default SearchModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  width: 80%;
  height: 80%;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width:480px;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin: 10px;
`;

const ListContainer = styled.div`
  padding: 1rem;
  overflow-y: auto;
  flex: 1;
`;

const NoReportsMessage = styled.p`
  text-align: center;
  color: gray;
`;
