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
gap: 2vh;
`

const Text = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const ListBox = styled.div`
  background-color: #f0f0f0;
  width: 600px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-top:10px;
  gap: 10px;
`;