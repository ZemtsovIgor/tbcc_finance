import React from "react";
import styled from "styled-components"
import {useTranslation} from "../../../contexts/Localization";
import {Flex, Text} from "../../../uikit";
import { Card, CardTitle } from './RoundWinner'

const infoData = [
  {
    title: '01. Buy tickets',
    text: 'Prices are set when the round starts, equal to 10 TBCC per ticket'
  },
  {
    title: '02. Wait for the Draw',
    text: 'There is one draw every sunday in 4 AM UTC'
  },
  {
    title: '03. Check results!',
    text: 'Once the round’s over, come back to the page and check to see if you’ve won!'
  }
]

const SubTitle = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: #FFF;
  margin-bottom: 10px;
`
const Secondary = styled(Text)`
  font-size: 15px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
`
const StyledCard = styled(Card)`
  height: 100%;
  margin-left: 22px;
  justify-content: space-between;
  min-height: 440px;

  @media (max-width: 968px) {
    width: calc(100% - 30px);
    margin: 35px auto 0 auto;
    max-width: 500px;
  }
`

const HowToPlay = () => {
  const { t } = useTranslation()

  return (
    <StyledCard>
      <CardTitle>
        {t('How to play')}?
      </CardTitle>
      {
        infoData.map((el) => {
          return(
            <Flex flexDirection='column' key={el.text} >
              <SubTitle>
                {t(el.title)}
              </SubTitle>
              <Secondary>
                {t(el.text)}
              </Secondary>
            </Flex>
          )
        })
      }
    </StyledCard>
  )
}

export default HowToPlay
