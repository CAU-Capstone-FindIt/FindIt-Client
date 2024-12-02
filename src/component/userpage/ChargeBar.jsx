import React, { useState } from "react";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import styled from "styled-components";
import { setPoint } from "../../apis/user";

const ChargeBar = ({ onCharge }) => {
  const [amount, setAmount] = useState("");

  const handleCharge = async() => {
    if (amount) {
      alert(`충전되었습니다: ${amount}원`); // 알림창 표시
      onCharge(parseInt(amount)); // 부모 컴포넌트에 충전 금액 전달
      setAmount(""); // 입력창 초기화
      const response = await setPoint(parseInt(amount));
      window.location.reload();
    } else {
      alert("충전할 금액을 입력하세요.");
    }
  };

  return (
    <Container>
      <Text>포인트 충전하기</Text>
      <Line>
        <EnterMoney
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <CreditCardIcon onClick={handleCharge} style={{ fontSize: "27px" }} />
      </Line>
    </Container>
  );
};

export default ChargeBar;

const Container = styled.div`
  display: flex;
  align-items: center;
  //padding: 10px;
  width: 92%;
  height: 10%;
  max-width: 600px;
  padding-right: 4%;
  padding-left: 4%;
  justify-content: space-between;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: 800;
  //width: 200px;
  display: flex;
  justify-content: center;
  //margin-left: 30px;
  //margin-right: 50px;
  @media (max-width: 440px) {
    // 화면너비가 440px 이하일 때 고정
    font-size: 15px;
  }
`;

const EnterMoney = styled.input`
  //width: 200px;
  height: 60%;
  background-color: #f1f1f1;
  border-radius: 20px;
  border: none;
  font-size: 20px;
  display: flex;
  text-align: right; /* 오른쪽 정렬 */
  //padding-right: 10px;
  font-weight: 700;

  @media (max-width: 440px) {
    // 화면너비가 440px 이하일 때 고정
    font-size: 15px;
  }
`;

const Line = styled.div`
display:flex;
flex-direction:row;
justify-content:flex-end;
align-items:center;
height: 100%;
gap : 5%;
`