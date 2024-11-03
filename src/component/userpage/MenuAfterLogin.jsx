import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MenuAfterLogin = () => {

  const navigate = useNavigate();

  const hadleNavigateion = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <MenuItem onClick={()=> hadleNavigateion('/bookmark')}>즐겨찾기</MenuItem>
      <MenuItem onClick={()=> hadleNavigateion('/registeitem')}>등록물건보기</MenuItem>
      <MenuItem onClick={()=> hadleNavigateion('/chargepoint')}>포인트 충전</MenuItem>
      <MenuItem onClick={()=> hadleNavigateion('/message')}>쪽지함</MenuItem>
    </Container>
  );
};

export default MenuAfterLogin;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: 900;
  border-bottom: 1px solid #ccc;
  cursor: pointer;

  &:last-child {
    border-bottom: none; /* 마지막 항목에는 구분선 제거 */
  }
`;