import React, {useEffect, useState} from "react";
import { useFetchLottery, useLottery } from 'state/lottery/hooks'
import Page from "../Page"
import MainSection from "./components/MainSection";
import {Round} from "./components/Round";
import WinningCriteria from "./components/WinningCriteria";
import {PriceFunds} from "./components/PriceFunds";
import Footer from "../../uikit/components/Footer";
import {WinnersSlider} from "./components/WinnersSlider";
import { Box, useMatchBreakpoints, Flex } from "../../uikit";
import {useTranslation} from "../../contexts/Localization";
import {MobileTabsItem} from "./style";
import HowToPlay from "./components/HowToPlay";
import useGetNextLotteryEvent from './hooks/useGetNextLotteryEvent'
import useStatusTransitions from './hooks/useStatusTransitions'
import FaqList from "./components/Faq";
import NextDrawCard from "./components/NextDrawCard";

const tabs = ["How To Play", "Winning Criteria", "Price Funds"]

const Lottery = ({setExtended}) => {
  useFetchLottery()
  useStatusTransitions()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const { t } = useTranslation()

  const {
    currentRound: { status, endTime },
  } = useLottery()

  const endTimeAsInt = parseInt(endTime, 10)
  const { nextEventTime } = useGetNextLotteryEvent(endTimeAsInt, status)

  const [activeTab, setActiveTab] = useState(0)

  // it is neccessary for bluring background when modal is open
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    setExtended(true)
  })

  return (
    <Page style={{filter: modalIsOpen ? 'blur(30px)' : ''}}>
      <MainSection
        nextEventTime={nextEventTime}
        setModalIsOpen={setModalIsOpen}
      />
      <WinnersSlider/>
      <NextDrawCard setModalIsOpen={setModalIsOpen}/>
      <Round/>
      {!isSmall ?
        <>
        <WinningCriteria/>
        <PriceFunds/>
        </>
        : <>
          <Flex
            width='345px'
            justifyContent='space-between'
            m='60px auto 0 auto'
            >
            {tabs.map((el, index) => {
              return (
                <MobileTabsItem
                  key={el}
                  isActive={index === activeTab}
                  onClick={() => setActiveTab(index)}>
                  {t(el)}
                </MobileTabsItem>
              )
            })}
          </Flex>
          {activeTab === 0 &&
            <HowToPlay/>
          }
          {activeTab === 1 &&
            <WinningCriteria/>
          }
          {activeTab === 2 &&
            <PriceFunds/>
          }
        </>
      }
      <FaqList/>
      <Box width='100%' p={isSmall && '0 15px'}>
        <Footer center/>
      </Box>
    </Page>
  )
}

export default Lottery
