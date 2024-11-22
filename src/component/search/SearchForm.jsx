import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Category } from "@mui/icons-material";

const SearchForm = () => {
  const [currentName, setCurrentName] = useState(""); // 지금 입력된 명칭
  const [currentBrand, setCurrentBrand] = useState(""); // 지금 입력된 명칭
  const [currentLocation, setCurrentLocation] = useState(""); // 지금 입력된 위치
  const [currentColor, setCurrentColor] = useState(""); // 지금 입력된 색상
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리 상태
  const [selectedFindLost, setSelectedFindLost] = useState(""); // 선택된 분실물/습득물 상태
  const [currentStartDate, setSelectedStartDate] = useState();
  const [currentEndDate, setSelectedEndDate] = useState();

  const handleChangeName = (e) => {
    setCurrentName(e.target.value);
  };

  const handleChangeBrand = (e) => {
    setCurrentBrand(e.target.value);
  };

  const handleChangeLocation = (e) => {
    setCurrentLocation(e.target.value);
  };

  const handleChangeColor = (e) => {
    setCurrentColor(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // 카테고리 상태 업데이트
  };

  const handleFindLost = (e) => {
    setSelectedFindLost(e.target.value); // 분실물/습득물 상태 업데이트
  };

  const handleStartDate = (e) => {
    setSelectedStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setSelectedEndDate(e.target.value);
  };

  const handleSummit = () => {
    const data = {
      name: currentName,
      brand: currentBrand,
      location: currentLocation,
      color: currentColor,
      category: selectedCategory,
      findLost: selectedFindLost,
      startDate: currentStartDate,
      endDate: currentEndDate,
    };

    if (
      !currentName ||
      !selectedCategory ||
      !selectedFindLost ||
      !currentStartDate ||
      !currentEndDate
    ) {
      alert("명칭, 카테고리, 분류, 날짜는 필수 입력 항목입니다.");
    } else {
      console.log(data);
    }

    // api 연결 필요
    //const response = await
  };

  return (
    <Container>
      <StyledInput
        type="text"
        value={currentName}
        onChange={handleChangeName}
        placeholder="명칭"
      />
      <StyledInput
        type="text"
        value={currentBrand}
        onChange={handleChangeBrand}
        placeholder="브랜드"
      />
      <StyledInput
        type="text"
        value={currentLocation}
        onChange={handleChangeLocation}
        placeholder="위치"
      />
      <StyledInput
        type="text"
        value={currentColor}
        onChange={handleChangeColor}
        placeholder="색상"
      />
      <StyledSelect
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">카테고리 선택</option>
        <option value="전자기기">전자기기</option>
        <option value="귀금속">귀금속</option>
        <option value="지갑">지갑</option>
        <option value="가방">가방</option>
        <option value="의류">의류</option>
        <option value="악기">악기</option>
        <option value="현금">현금</option>
        <option value="기타">기타</option>
      </StyledSelect>
      <StyledSelect
        id="findLost"
        value={selectedFindLost}
        onChange={handleFindLost}
      >
        <option value="">분류 선택</option>
        <option value="분실물">분실물</option>
        <option value="습득물">습득물</option>
      </StyledSelect>

      <DateContainer>
        <StyledDateInput
          type="date"
          value={currentStartDate}
          onChange={handleStartDate}
        />
        <Separator>~</Separator>
        <StyledDateInput
          type="date"
          value={currentEndDate}
          onChange={handleEndDate}
        />
      </DateContainer>
      <SearchLine>
        <StyledSearchIcon onClick={handleSummit} />
      </SearchLine>
    </Container>
  );
};

export default SearchForm;

const Container = styled.div`
  padding: 5%;
  padding-bottom: 0;
  width: 85%;
  height: 53vh;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StyledInput = styled.input`
  padding: 3%;
  border-radius: 5px;
  font-size: 90%;
  border: 2px solid #d9d9d9;
`;

const StyledSelect = styled.select`
  padding: 3%;
  border-radius: 5px;
  font-size: 90%;
  border: 2px solid #d9d9d9;
  color: #7a7a7a;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledDateInput = styled.input`
  width: 37%;
  padding: 3%;
  border-radius: 5px;
  border: 2px solid #d9d9d9;
  color: #7a7a7a;
`;

const Separator = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const SearchLine = styled.div`
  display: flex;
  justify-content: flex-end;
  //padding: 5px;
`;

const StyledSearchIcon = styled(SearchIcon)`
  cursor: pointer;
`;
