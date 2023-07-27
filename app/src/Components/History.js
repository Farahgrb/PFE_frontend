import React from 'react'
import styled from 'styled-components'
import EnhancedTable from "./Table"
// kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

//nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
function History() {
  return (
    <Wrap>
        <BigContainer>

        <Logo>
        <img src="new-logo.png"/>
        </Logo>
        <>
        <EnhancedTable/>
        </>
        </BigContainer>
    </Wrap>
  )
}

export default History
const Wrap = styled.div`
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  background-image: url('back.png');
  background-repeat: no-repeat;
  display: flex;
  align-items: center; /* center vertically */
`;

const BigContainer = styled.div`
  display: flex;
  justify-content: center; /* center horizontally */
  background-color: white;
  border-radius: 25px;
  margin-left: 5%;
  flex-direction: column;
  height: 92vh;
  width: 90vw;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2); /* Add a box shadow with desired color and opacity */
`;


const Logo = styled.div`
  img {

    width: 200px; /* Adjust the width value to make the image smaller */
    display: block;
    position: absolute;
    top: 10px;
    
    left: 0;
    padding: 2% 0% 7% 7%;
  }`
const AudioButton= styled.div`
background:black;
color:white
`



const TextButton= styled(AudioButton)``