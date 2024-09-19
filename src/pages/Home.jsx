import React from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton';
import RoofingIcon from '@mui/icons-material/Roofing';


const Home = () => {

  const handleClick = () => {
    console.log('hihi')
  }

  return (
    <Container>
      <IconButton variant="text">
        <RoofingIcon onClick = {handleClick}/>
      </IconButton>
    </Container>
  )
}

export default Home

const Container = styled.div`
    background-color: gray;
    width: 600px;
    height: 900px;
`