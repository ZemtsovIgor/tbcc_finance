import React from "react";
import styled from "styled-components";
import { Flex, Box, Text, useMatchBreakpoints} from "../../../uikit";
import {useTranslation} from "../../../contexts/Localization";
import { Title } from "./Round";
import {Card} from "./RoundWinner";

export const PriceFunds = () => {

  const { t } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  return (
    <Container>
      <Card width='380px'>
        <DistrubutionLine>
          {[...priceFundsData].sort((a, b) => b.percent - a.percent).map((el) => {
            return (
              <Item key={el.title} color={el.color} width={el.percent}/>
            )
          })}
        </DistrubutionLine>
        <Text fontSize='13px' fontWeight='500' color='#FFF' mt='10px'>
          {t('Distribution of funds from purchased tickets')}:
        </Text>
        {
          priceFundsData.map((el) => {
            return (
              <Flex key={el.title} alignItems='center' width='100%' mt='25px'>
                <SmallCircle color={el.color}/>
                <Text fontWeight='400' fontSize='14px' lineHeight='14px' color='rgba(255, 255, 255, 0.35)'>
                  {t(el.title)}
                </Text>
                <Dashs/>
                <Text fontWeight='400' fontSize='14px' color='#FFF' lineHeight='14px'>
                  {el.percent}%
                </Text>
              </Flex>
            )
          })
        }
      </Card>
      <Flex
        flexDirection='column'
        flex='1'
        ml={!isSmall && '40px'}
        mt={isSmall && '30px'}>
        <Title>
          {t('Price Funds')}
        </Title>
        <SecondaryText>
          {t('The prizes for each lottery round come from two sources')}:
        </SecondaryText>
        <MainText>
          {t('Ticket Purchases')}
        </MainText>
        <SecondaryText>
          80%&nbsp;{t('of the TBCC paid by people buying tickets that round goes back into the prize pools')}.
        </SecondaryText>
        <MainText>
          {t('Rollover Prizes')}
        </MainText>
        <SecondaryText>
          {t('After every round, if nobody wins in one of the prize brackets, the unclaimed TBCC tokens for that bracket will roll over into the next round and will be redistributed among the prize pools.')}
        </SecondaryText>
      </Flex>
    </Container>
  )
}

const priceFundsData = [
  {
    title: 'Matches first 1',
    percent: 2,
    color: '#899EE6'
  },
  {
    title: 'Matches first 2',
    percent: 3,
    color: '#6158C4'
  },
  {
    title: 'Matches first 3',
    percent: 5,
    color: '#7129CC'
  },
  {
    title: 'Matches first 4',
    percent: 10,
    color: '#AE1F83'
  },
  {
    title: 'Matches first 5',
    percent: 20,
    color: '#DC385D'
  },
  {
    title: 'Matches all',
    percent: 40,
    color: '#FF9055'
  },
  {
    title: 'Burn Pool',
    percent: 1,
    color: '#FFCF61'
  },
  {
    title: 'Provider',
    percent: 1,
    color: '#D7FF65'
  },
]

const DistrubutionLine = styled(Flex)`
  width: 100%;
  height: 25px;
`
const Item = styled(Box)<{color: string, width: number}>`
  height: 100%;
  background-color: ${({color}) => color};
  width: ${({width}) => width}%;
`
const SmallCircle = styled(Box)<{color: string}>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({color}) => color};
  margin-right: 5px;
`
const Dashs = styled(Box)`
  height: 10px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.35);
  flex: 1;
  margin: 0 4px;
`
const MainText = styled(Text)`
  font-weight: 500;
  font-size: 18px;
  color: #FFF;
  margin-top: 20px;
`
const SecondaryText = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 20px;
`
export const Container = styled(Flex)`
  margin-top: 50px;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 968px) {
    flex-direction: column;
    padding: 0 15px;
    max-width: 600px;
    align-items: center;
  }
`
