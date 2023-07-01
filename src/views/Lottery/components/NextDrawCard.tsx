import React, { useState } from 'react'
import styled from 'styled-components'
import { LotteryStatus } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { useLottery } from 'state/lottery/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import {
  Flex,
  Heading,
  Text,
  Skeleton,
  Button,
  Box,
  ExpandableLabel,
  useModal, useMatchBreakpoints,
} from '../../../uikit'
import BuyTicketsButton from './BuyTicketsButton'
import { dateTimeOptions } from '../helpers'
import RewardBrackets from './RewardBrackets'
import {HorizontalLine} from "../style";
import ThirdBallIcon from "../images/ThirdBall";
import FirstBallIcon from "../images/FirstBall";
import {useTBCCBusdPrice} from "../../../hooks/useBUSDPrice";
import ViewTicketsModal from "./ViewTicketsModal";

const Container = styled(Flex)`
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  
  @media (max-width: 968px) {
    padding: 0 15px;
  }
`
const Title = styled(Heading)`
  font-weight: 600;
  font-size: 42px;
  color: #FFFFFF;
  text-align: center;
  line-height: 48px;

  @media (max-width: 968px) {
    font-size: 32px
  }
`
const Card = styled(Flex)`
  width: 100%;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  padding: 30px 40px 0 40px;
  
  @media (max-width: 968px) {
    padding: 20px 20px 0 20px;
  }
`
const PrizePotCard = styled(Flex)`
  position: relative;
  width: 330px;
  height: 130px;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  border-radius: 12px;
  padding: 18px 35px;
  margin-right: 33px;

  @media (max-width: 968px) {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px 20px;
  }
`
const YouTicketsCard = styled(Flex)`
  flex: 1;
  height: 130px;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 18px 35px;
  border: 1px solid rgba(255, 255, 255, 0.09);

  @media (max-width: 968px) {
    flex-direction: column;
    padding: 10px 20px;
  }
`
const ViewTicketsBtn = styled(Button)`
  box-shadow: none;
  border: none;
  background: transparent;
  width: fit-content;
  height: fit-content;
  padding: 0;
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.45);
  text-decoration-line: underline;
`
const NextDrawWrapper = styled(Flex)`
  flex-direction: column;
`

interface NextDrawCardProps {
  setModalIsOpen?: (e) => void
}

const NextDrawCard = ({ setModalIsOpen }: NextDrawCardProps) => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const { currentLotteryId, isTransitioning, currentRound } = useLottery()
  const { endTime, amountCollectedInTBCC, userTickets, status } = currentRound

  const [onPresentViewTicketsModal] = useModal(<ViewTicketsModal roundId={currentLotteryId} roundStatus={status} setModalIsOpen={setModalIsOpen} />)
  const [isExpanded, setIsExpanded] = useState(false)
  const ticketBuyIsDisabled = status !== LotteryStatus.OPEN || isTransitioning

  const tbccPriceBusd = useTBCCBusdPrice()
  let prizeInBusd = 0
  if (tbccPriceBusd) {
    const tbccUSDPrice = Number(tbccPriceBusd.toFixed(9));

    const amountInTBCC = getBalanceNumber(amountCollectedInTBCC);
    prizeInBusd = amountInTBCC * tbccUSDPrice;
  }
  const endTimeMs = parseInt(endTime, 10) * 1000
  const endDate = new Date(endTimeMs)
  const isLotteryOpen = status === LotteryStatus.OPEN
  const userTicketCount = userTickets?.tickets?.length || 0

  const getPrizeBalances = () => {
    if (status === LotteryStatus.CLOSE || status === LotteryStatus.CLAIMABLE) {
      return (
        <Text fontSize='32px' fontWeight='600' color='#FFF'>
          {t('Calculating')}...
        </Text>
      )
    }
    return (
      <>
        {!prizeInBusd ? (
          <Skeleton my="7px" height={40} width={160} />
        ) : (
          <Text fontSize='32px' fontWeight='600' color='#FFF'>
            ${prizeInBusd.toLocaleString('en-EN')}
          </Text>
        )}
        {!prizeInBusd ? (
          <Skeleton my="2px" height={14} width={90} />
        ) : (
          <Text fontSize='14px' fontWeight='500' color='rgba(255, 255, 255, 0.65)'>
            {getBalanceNumber(amountCollectedInTBCC)} TBCC
          </Text>
        )}
      </>
    )
  }

  const getNextDrawId = () => {
    if (status === LotteryStatus.OPEN) {
      return `${currentLotteryId}`
    }
    if (status === LotteryStatus.PENDING) {
      return ''
    }
    return parseInt(currentLotteryId, 10) + 1
  }

  const getNextDrawDateTime = () => {
    if (status === LotteryStatus.OPEN) {
      return `${t('Draw')}: ${endDate.toLocaleString(locale, dateTimeOptions)}`
    }
    return ''
  }

  return (
    <Container mt={isSmall ? '20px' : '100px'} mb={isSmall ? '70px' : '100px'}>
      <Title mb='36px'>
        {t('Get your tickets right now!')}
      </Title>
      <Card>
        <Flex
          flexDirection={isMobile ? 'column': 'row'}
          alignItems='center'
          justifyContent='space-between'
          mb={isSmall ? '15px' : '25px'}
        >
          <Text fontWeight='600' fontSize='24px' color='#FFF'>
            {t('Next Draw')}
          </Text>
          <Text fontWeight='400' fontSize='14px' color='rgba(255, 255, 255, 0.45)'>
            {currentLotteryId && `#${getNextDrawId()}`} {Boolean(endTime) && getNextDrawDateTime()}
          </Text>
        </Flex>
        <HorizontalLine mb={isSmall ? '25px' : '40px'}/>
        <Flex
          width='100%'
          flexDirection={isSmall ? 'column' : 'row'}>
          <PrizePotCard>
            <Text fontSize='15px' fontWeight='500' color='#FFF'>
              {t('Prize pot')}
            </Text>
            {getPrizeBalances()}
            <Box position='absolute' top='-29px' right='12px'>
              <ThirdBallIcon width='64px' height='64px'/>
            </Box>
            <Box position='absolute' top='75px' right='72px'>
              <FirstBallIcon width='43px' height='43px'/>
            </Box>
          </PrizePotCard>
          {isLotteryOpen && (
            <YouTicketsCard>
              <Flex
                flexDirection='column'
                height='100%'
                justifyContent='flex-start'
                alignItems='flex-start'
                width={isSmall ? '100%' : 'auto'}
              >
                <Text fontSize='15px' fontWeight='500' color='#FFF'>
                  {t('Your tickets')}
                </Text>
                <Text fontSize='14px' fontWeight='400' color='rgba(255, 255, 255, 0.45)' mt='6px' mb='15px'>
                  {t('You have')}
                  {!userTickets.isLoading ? (
                    <span style={{color: '#FFF'}}>{` ${userTicketCount} ${t('tickets')} `}</span>
                  ) : (
                    <Box style={{display: 'inline-block', transform: 'translateY(5px)'}}>
                      <Skeleton mx="4px" height={20} width={40} />
                    </Box>
                  )}
                  {t('this round')}
                </Text>
                {!userTickets.isLoading && userTicketCount > 0 && (
                  <ViewTicketsBtn
                    onClick={onPresentViewTicketsModal}
                  >
                    {t('View tickets')}
                  </ViewTicketsBtn>
                )}
              </Flex>
              <Flex
                height='100%'
                alignItems='center'
                width={isSmall ? '100%' : 'auto'}
                justifyContent='center'>
                <Box width={isSmall ? '100%' : 'auto'} mt={isSmall ? '20px' : '0px'}>
                  <BuyTicketsButton disabled={ticketBuyIsDisabled} setModalIsOpen={setModalIsOpen} maxWidth="130px" />
                </Box>
              </Flex>
            </YouTicketsCard>
          )}
        </Flex>
        <HorizontalLine mt={isSmall ? '20px' : '40px'}/>
        {isExpanded && (
          <NextDrawWrapper>
            <RewardBrackets lotteryNodeData={currentRound} />
          </NextDrawWrapper>
        )}
        {(status === LotteryStatus.OPEN || status === LotteryStatus.CLOSE) && (
          <ExpandableLabel expanded={isExpanded}  onClick={() => setIsExpanded(!isExpanded)} />
        )}
      </Card>
    </Container>
  )
}

export default NextDrawCard
