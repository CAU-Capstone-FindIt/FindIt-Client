import React from 'react'
import styled from 'styled-components';

const MenuBeforLogin = () => {
  return (
    <Container>로그인 후 이용해주세요</Container>
  )
}

export default MenuBeforLogin

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 40px;
  min-height: 400px;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  font-size: 25px;
  font-weight: bold;
  align-items:center;
  justify-content:center;
`;