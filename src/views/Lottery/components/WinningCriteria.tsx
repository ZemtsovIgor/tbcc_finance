import React from "react";
import styled from "styled-components";
import _ from 'lodash'
import {Flex, Text, useMatchBreakpoints } from "../../../uikit";
import {useTranslation} from "../../../contexts/Localization";
import { Card } from "./RoundWinner"
import GreenCheckIcon from "../images/GreenCheckIcon";
import CrossIcon from "../images/CrossIcon";

const WinningCriteria = () => {

  const { t } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  const exampleArr = [4, 7, 3, 5, 9, 6]

  return (
    <Container>
      <TextContainer>
        <Title>
          {t('Winning Criteria')}
        </Title>
        <WhiteText mb='32px'>
          {t('The digits on your ticket must match in the correct order to win.')}
        </WhiteText>
        <SecondaryText mb='25px'>
          {t('Here’s an example of a lottery draw, with two tickets, A and B.')}
        </SecondaryText>
        <StyledList>
          <ListItem>
              <span style={{color: "#FFF"}}>{t('Ticket A')}:&nbsp;</span>
              {t('The first 3 digits and the last 2 digits match, but the 4th digit is wrong, so this ticket only wins a “Match first 3” prize.')}
          </ListItem>
          <ListItem>
              <span style={{color: "#FFF"}}>{t('Ticket B')}:&nbsp;</span>
              {t('Even though the last 5 digits match, the first digit is wrong, so this ticket doesn’t win a prize.')}
          </ListItem>
        </StyledList>
        <SecondaryText>
          {t('Prize brackets don’t ‘stack’: if you match the first 3 digits in order, you’ll only win prizes from the ‘Match 3’ bracket, and not from ‘Match 1’ and ‘Match 2’.')}
        </SecondaryText>
      </TextContainer>
      <Card flex={!isSmall && '0.8'}
            style={{maxWidth: isSmall && '450px',
            padding: isSmall && '19px 32px 29px 46px'}}>
        <Text fontWeight='600' fontSize='14px' color='#FFF' mt='15px'>
          {t('Winning Number')}
        </Text>
        <Flex mt={isSmall ? '15px' : '20px'}>
          {exampleArr.map((el) => {
            return (
              <Ball key={el * Math.random()}>
                {el}
              </Ball>
            )
          })}
        </Flex>
        <Flex mt={isSmall ? '27px' : '30px'}>
          <Letter>A</Letter>
           {_.times(3, () => {
            return (
              <GreenCheckIcon mx={isSmall ? '11px' : '14px'} key={Math.random()}/>
            )
           })}
          <CrossIcon mx='14px'/>
           {_.times(2, () => {
            return (
              <GreenCheckIcon mx={isSmall ? '11px' : '14px'} key={Math.random()}/>
            )
           })}
        </Flex>
        <Flex mt={!isSmall && '8px'} ml={isSmall ? '6px' : '16px'} alignItems='center'>
          <Union
            mr={!isSmall ? '12px' : '4px'}
            ml={isSmall && '16px'}>
            {exampleArr.slice(0, 3).map((el) => {
              return (
                <Circle key={el * Math.random()}>
                  {el}
                </Circle>
              )
            })}
          </Union>
          {
            exampleArr.slice(3,6).map((el) => {
              return (
                <Number key={el * Math.random()}>
                  {el}
                </Number>
              )
            })
          }
        </Flex>
        <Flex mt={isSmall ? '11px' : '30px'}>
          <Letter>B</Letter>
          <CrossIcon mx={isSmall ? '11px' : '14px'}/>
           {_.times(5, () => {
            return (
              <GreenCheckIcon mx={isSmall ? '11px' : '14px'} key={Math.random()}/>
            )
           })}
        </Flex>
        <SecondUnion>
          <Number>0</Number>
          {
            exampleArr.slice(1,6).map((el) => {
              return (
                <Number key={el * Math.random()}>
                  {el}
                </Number>
              )
            })
          }
        </SecondUnion>
      </Card>
    </Container>
  )
}

export default WinningCriteria

const Container = styled(Flex)`
  width: 100%;
  max-width: 1100px;
  margin-top: 165px;
  margin-bottom: 50px;

  @media (max-width: 968px) {
    flex-direction: column-reverse;
    align-items: center;
    margin-top: 40px;
    padding: 0 15px;
  }
`
const TextContainer = styled(Flex)`
  flex-direction: column;
  max-width: 560px;
  margin-right: 30px;

  @media (max-width: 968px) {
    margin-right: 0;
    max-width: 450px;
    margin-top: 35px;
  }
`

const Title = styled(Text)`
  font-weight: 600;
  font-size: 42px;
  color: #FFF;
  margin-bottom: 20px;

  @media (max-width: 968px) {
    font-size: 32px;
  }
`
const WhiteText = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  color: #FFF;
`
const SecondaryText = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.45);
  line-height: 24px;
`
const StyledList = styled.ul`
  
`
const ListItem = styled.li`
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.45);
  margin-left: 15px;
  line-height: 24px;
  margin-bottom: 20px;
`
const Ball = styled(Flex)`
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  background: radial-gradient(70.8% 70.8% at 34.08% 37.75%, #CC84FF 15.15%, #BB6DF3 25.25%, #6D55E6 82.83%, #836DF3 100%);
  font-weight: 600;
  font-size: 14px;
  color: #FFF;
  margin-right: 15px;

  @media (max-width: 968px) {
    width: 27px;
    height: 27px;
  }
`
const Letter = styled(Text)`
  font-weight: 500;
  font-size: 18px;
  color: #fFF;
  margin-right: 30px;

  @media (max-width: 968px) {
    margin-right: 10px;
  }
`
const Circle = styled(Flex)`
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  font-weight: 500;
  font-size: 16px;
  color: #FFF;

  @media (max-width: 968px) {
    width: 27px;
    height: 27px;
  }
`
const Union = styled(Flex)`
  width: 144px;
  height: 50px;
  align-items: center;
  justify-content: space-around;
  border-radius: 50px;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);

  @media (max-width: 968px) {
    width: 108px;
  }
`
const Number = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 17px;

  @media (max-width: 968px) {
    margin: 0 14px;
  }
`
const SecondUnion = styled(Flex)`
  align-items: center;
  border: 2px solid rgba(120, 128, 156, 0.25);
  border-radius: 50px;
  height: 50px;
  width: fit-content;  
  margin-left: 37px;

  @media (max-width: 968px) {
    margin-left: 18px;
  }
`