import React from 'react';
import { loginHandler } from '../../apis/login';
import styled from 'styled-components';

const LoginButton = () => {
  return (
    <Button onClick={loginHandler}>로그인</Button>
  );
};

export default LoginButton;

const Button = styled.div`
  width: 40%;
  height: 8%;
  background-color: #FFD400;
  border-radius: 30px; // 수정수정: 버튼 모서리 둥글게
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15); // 수정수정: 그림자 추가
  transition: all 0.3s ease;
  margin-top: 15%;

  &:hover {
    background-color: #ffc107; // 수정수정: hover 시 색상 변경
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); // 그림자 강조
  }

  &:active {
    background-color: #ffb300; // 수정수정: 클릭 시 색상 변경
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15); // 클릭 시 그림자 약화
    transform: translateY(2px); // 클릭 시 버튼이 살짝 눌리는 효과
  }

  @media (min-width: 440px) {
    // 화면너비가 440px 이상일 때 고정 // iphone 16 pro max
    font-size: 34px;
    height: 10%;
  }
`;