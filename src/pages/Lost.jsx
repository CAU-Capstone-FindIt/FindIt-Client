import React, { useState } from "react";
import Nav from "./Nav";
import styled from "styled-components";
import TopNav from "./TopNav";
import Item from "../component/item/Item";
import { useNavigate } from "react-router-dom";
import { useLostListQuery } from "../apis/LostQuery";

const ITEMS_PER_PAGE = 6; // 한 페이지에 보여줄 아이템 수
const MAX_PAGE_BUTTONS = 5; // 한 번에 표시할 페이지 버튼 수

const Lost = () => {
  const { data: lostReports = [], isLoading } = useLostListQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentRange, setCurrentRange] = useState(1); // 현재 페이지 범위 (1부터 시작)
  console.log(lostReports);

  const sortedReports = [...lostReports].reverse();

  const totalPages = Math.ceil(lostReports.length / ITEMS_PER_PAGE); // 전체 페이지 수
  const totalRanges = Math.ceil(totalPages / MAX_PAGE_BUTTONS); // 전체 범위 수

  // 현재 페이지 범위에 해당하는 버튼 생성
  const startPage = (currentRange - 1) * MAX_PAGE_BUTTONS + 1;
  const endPage = Math.min(startPage + MAX_PAGE_BUTTONS - 1, totalPages);
  const pageButtons = Array.from(
    { length: endPage - startPage + 1 },
    (_, idx) => startPage + idx
  );

  // 현재 페이지의 데이터 계산
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedReports = sortedReports.slice(startIndex, endIndex);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePrevRange = () => {
    if (currentRange > 1) {
      setCurrentRange((prev) => prev - 1);
      setCurrentPage((currentRange - 2) * MAX_PAGE_BUTTONS + 1); // 범위의 첫 번째 페이지로 이동
    }
  };

  const handleNextRange = () => {
    if (currentRange < totalRanges) {
      setCurrentRange((prev) => prev + 1);
      setCurrentPage(currentRange * MAX_PAGE_BUTTONS + 1); // 범위의 첫 번째 페이지로 이동
    }
  };

  return (
    <Container>
      <TopNav></TopNav>
      <ListContainer>
        {!isLoading ? (
          <>
            <Item findReports={paginatedReports} pageType="lost"></Item>
            {lostReports.length > 0 && (
              <PaginationContainer>
                <ArrowButton
                  src="img/arrowleft.png"
                  onClick={handlePrevRange}
                  disabled={currentRange === 1}
                />

                <div>
                  {pageButtons.map((page) => (
                    <PageButton
                      key={page}
                      onClick={() => handlePageClick(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PageButton>
                  ))}
                </div>
                <ArrowButton
                  src="img/arrowright.png"
                  onClick={handleNextRange}
                  disabled={currentRange === totalRanges}
                />
              </PaginationContainer>
            )}
          </>
        ) : (
          <NoReportsMessage>No reports found.</NoReportsMessage>
        )}
      </ListContainer>
      <Nav></Nav>
    </Container>
  );
};

export default Lost;

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
`;

const ListContainer = styled.div`
  position: relative;
  top: 70px;
  background-color: #f8f8f8;
  padding: 0.5rem;
  overflow-y: auto;
  height: 100%;
  max-height: calc(
    100% - 141px
  ); // 위 아래 네브바 합쳐서 16vh안으로 보이게 한다.
  box-sizing: border-box;

  // 스크롤바 숨기기
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 150); //스크롤바 색상
    border-radius: 10px; //스크롤바 둥근 테두리
  }

  &::-webkit-scrollbar-track {
    background: rgba(150, 150, 150, 0.1); //스크롤바 뒷 배경 색상
  }

  // @media (max-width: 600px) {
  //   top: calc(var(--vh, 1vh) * 8);
  //   max-height: calc(100% - (calc(var(--vh, 1vh) * 16)));
  // }
`;

const NoReportsMessage = styled.p`
  color: white;
  text-align: center;
  padding: 16px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 0.5rem;
`;

const ArrowButton = styled.img`
  width: 30px; // 이미지 크기 조정 (필요에 따라 변경)
  height: 30px; // 이미지 크기 조정 (필요에 따라 변경)
  cursor: pointer;

  &:disabled {
    opacity: 0.5; // 비활성화된 상태에서 불투명도 조정
    cursor: not-allowed;
  }
`;

const PageButton = styled.button`
  // background-color: ${(props) => (props.isActive ? "#1876d2" : "white")};
  background-color: transparent;
  color: ${(props) => (props.isActive ? "#1876d2" : "black")};
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
