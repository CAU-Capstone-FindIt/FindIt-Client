import React from 'react'
import TopNavBack from '../TopNavBack'
import Nav from '../Nav'
import styled from 'styled-components'
import MessageAlert from '../../component/userpage/MessageAlert'

const Message = () => {
  return (
    <Container>
      <TopNavBack/>
      <InnerContainer>
        <Text>쪽지함</Text>
        <ListBox>
          <MessageAlert/>
          <MessageAlert/>
          <MessageAlert/>
        </ListBox>

      </InnerContainer>
      <Nav/>
    </Container>
  )
}

export default Message

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
width:100%;
`

const Text = styled.div`
  font-size: 24px;
  font-weight: 700;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:2%;
  @media (max-width: 440px) {
    // 화면너비가 440px 이하일 때 고정
    font-size: 18px;
  }

  margin-bottom:2%;
`;

const ListBox = styled.div`
  //background-color: #f0f0f0;
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

`;