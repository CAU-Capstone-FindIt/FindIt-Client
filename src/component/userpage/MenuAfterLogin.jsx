import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { handleLogout } from '../../apis/logout';

const MenuAfterLogin = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container>
      {/* <MenuItem onClick={() => handleNavigation('/bookmark')}>즐겨찾기</MenuItem> */}
      <MenuItem onClick={() => handleNavigation('/registeitem')}>등록물건보기</MenuItem>
      <MenuItem onClick={() => handleNavigation('/chargepoint')}>포인트 충전</MenuItem>
      <MenuItem onClick={() => handleNavigation('/message')}>쪽지함</MenuItem>
      <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
    </Container>
  );
};

export default MenuAfterLogin;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 10px;
  margin-top: 60px;
`;

const MenuItem = styled.div`
  padding: 20px;
  font-size: 22px;
  font-weight: 700;
  color: #333;
  text-align: center;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #007bff;
  }

  &:last-child {
    border-bottom: none; /* 마지막 항목에는 구분선 제거 */
  }
`;