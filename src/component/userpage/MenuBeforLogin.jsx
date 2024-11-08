import React from 'react';
import styled from 'styled-components';

const MenuBeforLogin = () => {
  return (
    <Container>로그인 후 이용해주세요</Container>
  );
};

export default MenuBeforLogin;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 40px;
  min-height: 300px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #555;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
`;