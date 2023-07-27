import React from 'react'
import styled from 'styled-components'
import Section from './Section'
import History from './History'

function Home() {
  return (
    <Container>
        {/* <Section/> */}
        <History/>

    </Container>
  )
}

export default Home

const Container =styled.div`
    height : 100vh;
    Background: black;
    position:sticky;
   
`