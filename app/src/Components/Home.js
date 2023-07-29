import React, { useState } from 'react';
import styled from 'styled-components';
import Section from './Section';
import History from './History';
import Button from '@mui/material/Button';

import { createTheme, ThemeProvider } from '@mui/material/styles';

function Home() {
  const [showSection, setShowSection] = useState(true);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4791db',
      },
    },
  });

  const handleLogoClick = () => {
    setShowSection(true);
  };

  return (
    <Container>
      <Wrap>
        <BigContainer>
          <Logo>
        <ClickableImageLink href="#" onClick={handleLogoClick}>
            <img src="new-logo.png" alt="Logo" />
          </ClickableImageLink>
          </Logo>
          <ThemeProvider theme={theme}>
            <Db>
              <Button variant="contained" onClick={() => setShowSection(false)}>
                History of predictions
              </Button>
            </Db>
          </ThemeProvider>
          {showSection ?  <Section/>:<History/> }
        </BigContainer>
      </Wrap>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  height: 100vh;
  Background: black;
  position: sticky;
`;

const ClickableImageLink = styled.div`
position: fixed;
top: 10px;
left: 10px;
z-index: 2;
cursor: pointer;

img {
  width: 200px;
  padding: 18% 0% 15% 65%;
}

`;

const Logo= styled.div`
 

`;



const Wrap = styled.div`
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  background-image: url('back.png');
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
`;

const BigContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 25px;
  margin-left: 5%;
  flex-direction: column;
  height: 92vh;
  width: 90vw;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2);
`;

const Db = styled.div`
  width: 230px;
  padding-left: 85%;
  display: block;
  position: absolute;
  top: 10px;
  left: 0;
  padding: 2.5% 1% 7% 81%;
`;
