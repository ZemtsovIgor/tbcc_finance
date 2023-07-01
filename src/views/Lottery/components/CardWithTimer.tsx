import React from "react";
import styled from "styled-components";
import {useWeb3React} from "@web3-react/core";
import {useLottery} from 'state/lottery/hooks';
import {LotteryStatus} from 'config/constants/types';
import Countdown from "./Countdown";
import {useTranslation} from "../../../contexts/Localization";
import {Flex, Box, Text, Skeleton} from "../../../uikit";
import BuyTicketsButton from "./BuyTicketsButton";

const UpperBlock = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px 16px 0 0;
  width: 380px;
  height: 220px;
  background-color: #4D318B;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  @media (max-width: 968px) {
    width: 100%;
    max-width: 380px;
    margin: 34px auto 0 auto;
  }
`
const NumberOfTickets = styled(Box)`
  display: flex;
  align-items: center;
  border: 1px solid #836DF3;
  border-radius: 6px;
  padding: 6px 20px;
  margin-top: 35px;
`
const LowerBlock = styled(Flex)`
  position: relative;
  z-index: 10;
  height: 140px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 968px) {
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
  }
`
const LeftSide = styled(Box)`
  height: 100%;
  width: 100%;
  background-color: #4D318B;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 0 0 0 16px;
  border-top: 2px dashed rgba(255, 255, 255, 0.15);
  mask: radial-gradient(circle 28px at top left, transparent 98%, #fff 100%);
`
const RightSide = styled(LeftSide)`
  mask: radial-gradient(circle 28px at top right, transparent 98%, #fff 100%);
  border-radius: 0 0 16px 0;
`
const CardBackground = styled(Flex)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9;
`
const SkeletonContainer = styled(Box)`
  width: fit-content;
  height: fit-content;
  display: inline-block;
  transform: translateY(2px);
`

interface CardWithTimerProps {
  nextEventTime?: number,
  setModalIsOpen?: (e) => void
}

const CardWithTimer = ({nextEventTime, setModalIsOpen}: CardWithTimerProps) => {

  const {t} = useTranslation()
  const {account} = useWeb3React()
  const {
    currentRound: {status},
    isTransitioning, currentRound
  } = useLottery()
  const {userTickets} = currentRound

  const ticketBuyIsDisabled = status !== LotteryStatus.OPEN || isTransitioning
  const userTicketCount = userTickets?.tickets?.length || 0

  const ticketRoundText = userTicketCount > 1 ? t('%amount% tickets', {amount: userTicketCount}) : t('%amount% ticket', {amount: userTicketCount})

  return (
    <Flex
      flexDirection='column'
      position='relative'
      zIndex='10'>
      <UpperBlock>
        <Text
          fontWeight='400'
          fontSize='24px'
          color='rgba(255, 255, 255, 0.6)'
        >
          {t('Get your tickets now')}!
        </Text>
        {nextEventTime ? (
          <Countdown
            nextEventTime={nextEventTime}
          />
        ) : (
          <Skeleton height="41px" width="250px"/>
        )}
        {account && (
          <NumberOfTickets>
            <Text
              color='rgba(255, 255, 255, 0.45)'
              fontSize='14px'
              fontWeight='500'
            >
              {t(`You have`)}&nbsp;
              {!userTickets.isLoading ? (
                <span style={{color: '#FFF'}}>{ticketRoundText} </span>
              ) : (
                <SkeletonContainer>
                  <Skeleton mx="4px" height={14} minHeight={14} width={40}/>
                </SkeletonContainer>
              )}
              &nbsp;{t(`this round`)}
            </Text>
          </NumberOfTickets>
        )}
      </UpperBlock>
      <LowerBlock>
        <CardBackground>
          <LeftSide/>
          <RightSide/>
        </CardBackground>
        <Box position='relative' zIndex='10'>
          <Text
            fontSize='15px'
            fontWeight='300'
            color='rgba(255, 255, 255, 0.35)'>
            10 TBCC {t('token per ticket')}
          </Text>
        </Box>
        <Box position='relative' zIndex='10' width='100%' px='30px' mt='10px'>
          <BuyTicketsButton disabled={ticketBuyIsDisabled} setModalIsOpen={setModalIsOpen} />
        </Box>
      </LowerBlock>
    </Flex>
  )
}

export default CardWithTimer
