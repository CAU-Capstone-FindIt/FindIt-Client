import React, { useState } from 'react'
import styled from 'styled-components';
import Nav from '../Nav';
import UserBox from '../../component/userpage/UserBox';
import ChargeBar from '../../component/userpage/ChargeBar';
import TopNavBack from '../TopNavBack';

const ChargePoint = () => {
  const [point, setPoint] = useState(10);

  const handleCharge = (amount) => {
    // API 요청 부분 (추후 구현)
    setPoint(prevPoint => prevPoint + amount); // 포인트 업데이트
  };

  return (
    <Container>
      <TopNavBack/>
      <InnerContainer>
        <Text>포인트 충전</Text>
        <UserBox point = {point}/>
        <ChargeBar onCharge = {handleCharge}/>
      </InnerContainer>
      <Nav/>
    </Container>
  )
}

export default ChargePoint

const Container = styled.div`
  background-color: white;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const InnerContainer = styled.div`
margin-top: 75px;
margin-bottom: 75px;
display: flex;
flex-direction:column;
align-items:center;
gap: 2vh;
`

const Text = styled.div`
  font-size: 24px;
  font-weight: 700;
`;