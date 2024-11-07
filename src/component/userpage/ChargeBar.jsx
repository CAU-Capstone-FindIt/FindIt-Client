import React, { useState } from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import styled from 'styled-components';

const ChargeBar = ({ onCharge }) => {
  const [amount, setAmount] = useState('');

  const handleCharge = () => {
    if (amount) {
      alert(`충전되었습니다: ${amount}원`); // 알림창 표시
      onCharge(parseInt(amount, 10)); // 부모 컴포넌트에 충전 금액 전달
      setAmount(''); // 입력창 초기화
    } else {
      alert("충전할 금액을 입력하세요.");
    }
  };

  return (
    <Container>
      <Text>포인트 충전하기</Text>
      <EnterMoney
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <CreditCardIcon onClick={handleCharge} style={{fontSize : "30px"}} />
    </Container>
  );
};

export default ChargeBar;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  max-width: 600px;
  justify-content: space-evenly;
`;

const Text = styled.div`
  font-size: 25px;
  font-weight: 800;
  width: 200px;
  display:flex;
  justify-content:center;
  margin-left: 30px;
  margin-right: 50px;
`;

const EnterMoney = styled.input`
  width: 200px;
  height: 40px;
  background-color: #f1f1f1;
  border-radius: 20px;
  border: none;
  font-size: 20px;
  display:flex;
  text-align: right; /* 오른쪽 정렬 */
  padding-right: 10px;
  font-weight: 700;
`;