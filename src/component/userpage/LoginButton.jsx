import React from 'react'
import { loginHandler } from '../../apis/login';
import styled from 'styled-components';

const LoginButton = () => {
  return (
    <Button onClick={loginHandler}>로그인</Button>
  )
}

export default LoginButton

const Button = styled.div`
  width: 180px;
  height: 60px;
  background-color: #FFD400;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 28px;
  font-weight: 1000;
  margin-top: 20px;
  cursor: pointer;
`;