import React from 'react'
import styled from 'styled-components'
import EnhancedTable from "./Table"

function History() {
  return (

    
        <EnhancedTable/>

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


const AudioButton= styled.div`
background:black;
color:white
`



const TextButton= styled(AudioButton)``