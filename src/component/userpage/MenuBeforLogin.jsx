import React from 'react';
import styled from 'styled-components';

const MenuBeforLogin = () => {
  return (
    <Container>로그인 후 이용해주세요</Container>
  );
};

export default MenuBeforLogin;

const Container = styled.div`
  width: 98%;
  margin-top: 10%;
  height: 40%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  color: #555;
  box-sizing: border-box;

  @media (min-width: 440px) {
    // 화면너비가 440px 이상일 때 고정
    font-size: 30px;
  }

`;