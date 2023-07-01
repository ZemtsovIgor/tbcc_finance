import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import {PATHS} from "../../config/paths";
import {useTranslation} from "../../contexts/Localization";
import { Flex, Text, Box, Image, useMatchBreakpoints } from "../../uikit";
import Page from '../Page'
import CloudsDecor from "./components/CloudsDecor";
import {StyledBtn} from "../Swap/styles";
import CardImg from './images/CardImg.png'
import StarsPlanetsDecor from "./components/StarsPlanetsDecor";
import AboutGame from "./components/AboutGame";
import Tariffs from "./components/Tariffs";
import Footer from "../../uikit/components/Footer";
import {useFetchGame} from "../../state/game/hooks";

const Container = styled(Flex)`
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 1100px;
  align-items: center;
  
  @media (max-width: 968px) {
    flex-direction: column-reverse;
    padding: 0 15px;
    max-width: 600px;
    margin-top: 30px;
  }
`
const PageTitle = styled(Text)`
  font-weight: 600;
  font-size: 56px;
  line-height: 72px;
  color: #FFFFFF;

  @media (max-width: 968px) {
    font-size: 32px;
    line-height: 42px;
  }
`

const Game = ({setExtenden}) => {

  const { t } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  useFetchGame()

  useEffect(() => {
    setExtenden(true)
  })

  const LaunchGameLink = () => {
    return (
      <Link to={PATHS.GAME_MAIN}>
        <StyledBtn style={{width: '170px', height: '60px'}}>
          {t('Launch Game')}
        </StyledBtn>
      </Link>
    )
  }

  return (
    <Page>
      <CloudsDecor/>
       <Container>
        <Flex flexDirection='column' mt={isSmall ? '65px' : '0px'}>
          <PageTitle>
            {t('Play on TBCC')}<br/>
            {t('Universe game')}
          </PageTitle>
          <Text fontSize='16px' fontWeight='400' color='rgba(255, 255, 255, 0.6)' mt='20px' mb='43px'>
            {t('Join all rounds for more fun and max reward!')}
          </Text>
          <LaunchGameLink/>
        </Flex>
        <Box ml={isSmall ? '0' : '110px'} mt={isSmall ? '35px' : '0px'}>
          <Image width={isSmall ? '270px' : '465px'} height='auto' src={CardImg}/>
        </Box>
        <StarsPlanetsDecor/>
       </Container>
       <AboutGame/>
       <Tariffs/>
       <LaunchGameLink/>
      {isSmall && <Box height='100px'/>}
      {!isSmall && <Box width='100%'>
        <Footer center/>
      </Box>}
    </Page>
  );
};

export default Game;
