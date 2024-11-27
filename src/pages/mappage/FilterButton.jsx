import React, { useState } from "react";
import styled from "styled-components";

const FilterButton = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("모두 보기");

  const categories = [
    "모두 보기",
    "전자기기",
    "귀금속",
    "지갑",
    "가방",
    "의류",
    "악기",
    "현금",
    "기타",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onFilterChange(category === "모두 보기" ? "" : category);
    setIsOpen(false); // 드롭다운 닫기
  };

  return (
    <DropdownContainer>
      <SelectedBox onClick={() => setIsOpen(!isOpen)}>
        {selectedCategory}
        <Arrow>{isOpen ? "▲" : "▼"}</Arrow>
      </SelectedBox>
      {isOpen && (
        <DropdownMenu>
          {categories.map((category, index) => (
            <DropdownItem
              key={index}
              onClick={() => handleCategoryClick(category)}
              isSelected={selectedCategory === category}
            >
              {category}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default FilterButton;

// 스타일
const DropdownContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 500;
  width: 160px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
`;

const SelectedBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 550;
  background-color: #f9f9f9;
  color: #333;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: #f1f1f1;
    border-color: #bbb;
  }
`;

const Arrow = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const DropdownMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 8px 8px;
  background-color: #fff;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* 커스텀 스크롤바 */
  &::-webkit-scrollbar {
    width: 8px; /* 스크롤바 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bbb; /* 스크롤바 색상 */
    border-radius: 4px; /* 스크롤바 둥근 모서리 */
    border: 2px solid #fff; /* 스크롤바와 배경 사이 여백 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #888; /* 스크롤바 호버 색상 */
  }

  &::-webkit-scrollbar-track {
    background-color: #f9f9f9; /* 스크롤 트랙 색상 */
    border-radius: 4px;
  }
`;

const DropdownItem = styled.li`
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 550;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#e3f2fd" : "#fff")};
  color: ${(props) => (props.isSelected ? "#007bff" : "#333")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f1f1;
  }
`;
