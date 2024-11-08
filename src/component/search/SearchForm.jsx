import React, { useState } from "react";
import styled from "styled-components";
import { TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";

const SearchForm = () => {
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리 상태

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // 카테고리 상태 업데이트
  };

  return (
    <Container>
      <StyledTextField label="명칭" variant="outlined" fullWidth required />
      <StyledTextField label="브랜드" variant="outlined" fullWidth required />
      <StyledTextField label="위치" variant="outlined" fullWidth required />
      
      <StyledFormControl fullWidth variant="outlined" required>
        <InputLabel>카테고리</InputLabel>
        <StyledSelect
          label="카테고리"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <MenuItem value=""><em>카테고리 선택</em></MenuItem>
          <MenuItem value="전자기기">전자기기</MenuItem>
          <MenuItem value="귀금속">귀금속</MenuItem>
          <MenuItem value="지갑">지갑</MenuItem>
          <MenuItem value="가방">가방</MenuItem>
          <MenuItem value="의류">의류</MenuItem>
          <MenuItem value="악기">악기</MenuItem>
          <MenuItem value="현금">현금</MenuItem>
          <MenuItem value="기타">기타</MenuItem>
        </StyledSelect>
      </StyledFormControl>

      <StyledTextField label="색상" variant="outlined" fullWidth required />
      
      <DateContainer>
        <StyledTextField
          label="시작 날짜"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          required
        />
        <Separator>~</Separator>
        <StyledTextField
          label="종료 날짜"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          required
        />
      </DateContainer>
    </Container>
  );
};

export default SearchForm;

const Container = styled.div`
  padding: 30px;
  width: 500px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 15px;
`;

const StyledFormControl = styled(FormControl)`
  margin-bottom: 15px;
`;

const StyledSelect = styled(Select)`
  .MuiOutlinedInput-input {
    padding: 12px;
  }
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Separator = styled.div`
  font-size: 20px;
  font-weight: 700;
`;