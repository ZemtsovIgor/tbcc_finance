import React from "react";
import styled from "styled-components";
import _ from "lodash";
import {Box, Flex } from "../../../../uikit";
import { SecondaryText } from "./Scale";
import {useTranslation} from "../../../../contexts/Localization";
import Next from "./Next";
import Current from "./Current";

const MobileScale = ({sold, allocated, current, next, prices}) => {

  const {t} = useTranslation()

  return (
    <MobileScaleContainer>
      <Flex width='100%' height='fit-content' justifyContent='space-between'>
        <VerticalLine/>
        <Flex flexDirection='column' flex='1'>
          <ScaleElemnt>
            <Flex alignItems='center'>
              <HorizontalLine/>
              <SecondaryText width='80px'>
                {prices[0].toLocaleString('en-EN', {minimumFractionDigits: 2})}
              </SecondaryText>
            </Flex>
            <Flex alignItems='center'>
              <SmallHorLine/>
              <SecondaryText width='30px'>
                0
              </SecondaryText>
              <SmallHorLine/>
            </Flex>
          </ScaleElemnt>
          {_.times((allocated / 50000) - 1, (index) => {
            return (
              <ScaleElemnt key={index}>
                <Flex alignItems='center'>

                  {
                    prices[index + 1] !== current
                    ? (prices[index + 1] !== next
                      ? <>
                          <HorizontalLine/>
                          <SecondaryText width='80px'>
                            {prices[index + 1] ? prices[index + 1].toLocaleString('en-EN', {minimumFractionDigits: 2}) : 'TBA'}
                          </SecondaryText>
                        </>
                      : <>
                          <SmallHorLine style={{marginLeft: '0', marginRight: '22px'}}/>
                          <Next price={next}/>
                        </>
                      )
                    : <>
                        <SmallHorLine style={{marginLeft: '0', marginRight: '22px'}}/>
                        <Current price={current}/>
                      </>
                  }
                </Flex>
                <Flex alignItems='center'>
                <SmallHorLine/>
                <SecondaryText width='30px'>
                  {(index + 1) * 50}k
                </SecondaryText>
                <SmallHorLine/>
                </Flex>
              </ScaleElemnt>
            )
          })}
          <ScaleElemnt>
            <Flex alignItems='center'>
              <HorizontalLine/>
              <SecondaryText width='80px'>
                {t('close')}
              </SecondaryText>
            </Flex>
            <Flex alignItems='center'>
              <SmallHorLine/>
              <SecondaryText width='30px'>
                1M
              </SecondaryText>
              <SmallHorLine/>
            </Flex>
          </ScaleElemnt>
        </Flex>
        <ScaleLineOuter>
          <ScaleLineInner height={allocated ? sold / allocated * 100 : 0}/>
        </ScaleLineOuter>
      </Flex>
    </MobileScaleContainer>
  )
}

export default MobileScale

const MobileScaleContainer = styled(Flex)`
  flex: 1;
  height: 520px;
  overflow-y: scroll;
  padding-right: 40px;
  ::-webkit-scrollbar {
    display: none;
  }
`
const ScaleElemnt = styled(Flex)`
  height: 50px;
  align-items: center;
  justify-content: space-between;
`
const VerticalLine = styled(Box)`
  width: 1px;
  height: 1000px;
  background-color: rgba(255, 255, 255, 0.35);
  margin-top: 25px;
`
const HorizontalLine = styled(Box)`
  width: 30px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.35);
`
const SmallHorLine = styled(HorizontalLine)`
  width: 8px;
  margin: 0 15px;
`
const ScaleLineOuter = styled(Box)`
  height: 1000px;
  width: 10px;
  margin-top: 25px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba(255, 255, 255, 0.1);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
`
const ScaleLineInner = styled(Box)<{ height?: number }>`
  width: 100%;
  height: ${({height}) => height}%;
  border-radius: 0 0 24px 24px ;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
`
