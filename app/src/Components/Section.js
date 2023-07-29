import React from 'react'
import styled from 'styled-components'
import Form from './Form'

function Section() {
  return (

        <>
        <ItemText>
            <h1>Hate Speech Detection Application</h1>
        </ItemText>
        <InputGroup>

        <Form></Form>
        </InputGroup>
        </>
 
  )
}

export default Section


const ItemText =styled.h1`
    padding-Left: 0vh;
    padding-bottom: 0%;
    text-align:center;
    font-size: 20px;
    font-family:Ubuntu;
    color: #004AAD;
    position: sticky;
    padding-top: -100px;

   
`
const InputGroup = styled.div`

`

const AudioButton= styled.div`
background:black;
color:white
`



const TextButton= styled(AudioButton)``