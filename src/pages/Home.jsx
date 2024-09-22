import React from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton';
import RoofingIcon from '@mui/icons-material/Roofing';
import Input from '@mui/material/Input';
import { useState } from 'react';

const Home = () => {
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    console.log('hihi')
    console.log(inputValue)
  }

  const inputChange = (event) => {
    setInputValue(event.target.value);
  }

  return (
    <Container>
      <IconButton variant="text">
        <RoofingIcon onClick = {handleClick}/>
      </IconButton>
      <Input placeholder="Placeholder" value={inputValue} onChange={inputChange} />
    </Container>
  )
}

export default Home

const Container = styled.div`
    background-color: gray;
    width: 600px;
    height: 900px;
`