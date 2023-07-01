import React from "react";
import styled from "styled-components";
import _ from "lodash";
import {Box, Flex, Text} from "../../../../uikit";
import Next from "./Next";
import Current from "./Current";
import {useTranslation} from "../../../../contexts/Localization";



const Scale = ({sold, allocated, current, next, prices}) => {

  const {t} = useTranslation()

  return (
    <ScaleContainer>
      <ScaleLineOuter>
        <ScaleLineInner width={allocated ? sold / allocated * 100 : 0}/>
      </ScaleLineOuter>
      <Flex width='100%' justifyContent='space-between' mt='8px'>
        <ScaleElement>
          <SmallVertLine/>
          <SecondaryText>0</SecondaryText>
          <SmallVertLine/>
          <SecondaryText>{prices[0]}</SecondaryText>
          <VerticalLine/>
        </ScaleElement>
        {_.times((allocated / 50000) - 1, (index) => {
          return (
            <ScaleElement key={index}>
              <SmallVertLine/>
              <SecondaryText key={index}>
                {(index + 1) * 50}k
              </SecondaryText>
              {prices[index + 1] !== current
                ? (prices[index + 1] !== next
                  ? <>
                    <SmallVertLine/>
                    <SecondaryText>
                      {prices[index + 1] ? prices[index + 1].toLocaleString('en-EN', {minimumFractionDigits: 2}) : 'TBA'}
                    </SecondaryText>
                    <VerticalLine/>
                  </>
                  : <>
                    <SmallVertLine/>
                    <Next price={next}/>
                    <SmallVertLine mt='auto'/>
                  </>)
                : <>
                  <Current price={current}/>
                  <SmallVertLine mt='auto'/>
                </>
              }

            </ScaleElement>
          )
        })}
        <ScaleElement>
          <SmallVertLine/>
          <SecondaryText>1M</SecondaryText>
          <SmallVertLine/>
          <SecondaryText>{t('close')}</SecondaryText>
          <VerticalLine/>
        </ScaleElement>
      </Flex>
      <HorizontalLine/>
    </ScaleContainer>
  )
}

export default Scale

const ScaleContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
  align-items: center;

  @media (max-width: 968px) {
    transform: rotateZ(-90deg);
    width: 1500px;
  }
`
const ScaleLineOuter = styled(Box)`
  width: calc(100% - 18px);
  height: 10px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba(255, 255, 255, 0.1);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
`
const ScaleLineInner = styled(Box)<{ width?: number }>`
  height: 100%;
  width: ${({width}) => width}%;
  border-radius: 24px 0 0 24px;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
`
export const SecondaryText = styled(Text)`
  font-weight: 400;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 5px;
  margin-top: 5px;
  text-align: center;
`
const ScaleElement = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 18px;
`
const VerticalLine = styled(Box)`
  width: 1px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.35);
`
const SmallVertLine = styled(VerticalLine)`
  height: 8px;
`
const HorizontalLine = styled(Box)`
  width: calc(100% - 18px);
  height: 1px;
  background-color: rgba(255, 255, 255, 0.35);
`
