import React from "react";
import styled from "styled-components";
import {Flex, Text, Box, useMatchBreakpoints } from "../../../uikit";
import {useTranslation} from "../../../contexts/Localization";
import CardWithTimer from "./CardWithTimer";
import Background from '../images/background.png'
import FirstBallIcon from "../images/FirstBall";
import SecondBallIcon from "../images/SeconBall";
import ThirdBallIcon from "../images/ThirdBall";
import FouthBallIcon from "../images/FourthBall";
import {getBalanceNumber} from "../../../utils/formatBalance";
import {useLottery} from "../../../state/lottery/hooks";
import {useTBCCBusdPrice} from "../../../hooks/useBUSDPrice";

const PrizePoolText = styled(Box)`
  font-weight: 700;
  font-size: 100px;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media (max-width: 968px) {
    font-size: 64px;
    text-align: center;
    margin-top: 9px;
  }
`
const CardContainer = styled(Box)`
  position: relative;
  z-index: 10;

  @media (max-width: 968px) {
    width: 100%;
    padding: 0 15px;
  }
`
const Container = styled(Flex)`
  position: relative;
  z-index: 10;
  height: 100vh;
  width: 100%;
  max-width: 1100px;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 968px) {
    flex-direction: column;
    height: auto;
  }
`
const Title = styled(Text)`
  font-size: 56px;
  font-weight: 600;
  color: #FFF;

  @media (max-width: 968px) {
    font-size: 32px;
    text-align: center;
    margin-top: 81px;
  }
`
const SubTitle = styled(Text)`
  font-weight: 400;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 15px;

  @media (max-width: 968px) {
    font-size: 18px;
    text-align: center;
  }
`
const CardBackground = styled.img`
  position: absolute;
  z-index: 9;
  width: 1200px;
  height: auto;
  top: -62%;
  left: -110%;
  max-width: 1200px;
  pointer-events: none;

  @media (max-width: 968px) {
    display: none;
    //width: 800px;
    //top: -12%;
    //left: -24%;
  }
`

interface CardWithTimerProps {
  nextEventTime?: number,
  setModalIsOpen?: (e) => void
}

const MainSection = ({ nextEventTime, setModalIsOpen }: CardWithTimerProps) => {

  const { t } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  const {
    currentRound: { amountCollectedInTBCC },
  } = useLottery()

  const tbccPriceBusd = useTBCCBusdPrice()
  let prizeTotal = 0
  if (tbccPriceBusd) {
    const tbccUSDPrice = Number(tbccPriceBusd.toFixed(9));

    const amountInTBCC = getBalanceNumber(amountCollectedInTBCC);
    prizeTotal = amountInTBCC * tbccUSDPrice;

  }


  return (
    <Container>
       <Box
         position='absolute'
         top={isSmall ? '6%' : '8%'}
         left={isSmall ? '-9%' : '50%'}>
        <FirstBallIcon/>
       </Box>
      {!isSmall && <Box
        position='absolute'
        top='72%'
        left='48%'>
        <SecondBallIcon/>
      </Box>}
       <Box
         position='absolute'
         top={isSmall ? '17%' : '35%'}
         right={isSmall ? '-6%' : '-15%'}>
        <ThirdBallIcon/>
       </Box>
       <Box
         position='absolute'
         top={isSmall ? '96%' : '80%'}
         right={isSmall ? '13%' : '-12%'}>
        <FouthBallIcon/>
       </Box>
      <Flex
        flexDirection='column' mt='20px'>
        <Title>
          TBCC&nbsp;{t('lottery')}
        </Title>
        <PrizePoolText>
          ${prizeTotal.toLocaleString('en-EN')}
        </PrizePoolText>
        <SubTitle>
          {t('CURRENTLY IN PRIZE POOL')}
        </SubTitle>
      </Flex>
      <CardContainer>
        <CardBackground
          width='1200px'
          height='auto'
          src={Background}
          alt=''
        />
        <CardWithTimer
          nextEventTime={nextEventTime}
          setModalIsOpen={setModalIsOpen}
        />
      </CardContainer>
    </Container>
  )
}

export default MainSection
