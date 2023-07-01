import React, {useState, useRef, useEffect} from "react";
import { useAppDispatch } from 'state';
import styled from "styled-components";
import { useLottery } from 'state/lottery/hooks';
import { LotteryStatus } from 'config/constants/types';
import { fetchLottery } from 'state/lottery/helpers';
import { Flex, Text, useMatchBreakpoints } from "../../../uikit";
import {useTranslation} from "../../../contexts/Localization";
import RoundWinner from "./RoundWinner";
import HowToPlay from "./HowToPlay";
import {processLotteryResponse} from "../helpers";

export const Container = styled(Flex)`
  flex-direction: column;
  margin-top: 90px;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 968px) {
    padding: 0 15px;
    justify-content: center;
    max-width: 600px;
    margin-top: 50px;
  }
`
export const Title = styled(Text)`
  color: #FFF;
  font-size: 42px;
  font-weight: 600;

  @media (max-width: 968px) {
    font-size: 32px;
  }
`

export const Round = () => {

  const {
    currentLanguage: { locale },
    t
  } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const dispatch = useAppDispatch()

  const {
    currentLotteryId,
    lotteriesData,
    currentRound: { status, isLoading },
  } = useLottery()
  const [latestRoundId, setLatestRoundId] = useState(null)
  const [selectedRoundId, setSelectedRoundId] = useState('')
  const [selectedLotteryNodeData, setSelectedLotteryNodeData] = useState(null)
  const timer = useRef(null)

  const numRoundsFetched = lotteriesData?.length

  useEffect(() => {
    if (currentLotteryId) {
      const currentLotteryIdAsInt = currentLotteryId ? parseInt(currentLotteryId) : null
      const mostRecentFinishedRoundId =
        status === LotteryStatus.CLAIMABLE ? currentLotteryIdAsInt : currentLotteryIdAsInt - 1
      setLatestRoundId(mostRecentFinishedRoundId)
      setSelectedRoundId(mostRecentFinishedRoundId.toString())
    }
  }, [currentLotteryId, status])

  useEffect(() => {
    setSelectedLotteryNodeData(null)

    const fetchLotteryData = async () => {
      const lotteryData = await fetchLottery(selectedRoundId)
      const processedLotteryData = processLotteryResponse(lotteryData)
      setSelectedLotteryNodeData(processedLotteryData)
    }

    timer.current = setInterval(() => {
      if (selectedRoundId) {
        fetchLotteryData()
      }
      clearInterval(timer.current)
    }, 1000)

    return () => clearInterval(timer.current)
  }, [selectedRoundId, currentLotteryId, numRoundsFetched, dispatch])

  const handleInputChange = (event) => {
    const {
      target: { value },
    } = event
    if (value) {
      setSelectedRoundId(value)
      if (parseInt(value, 10) <= 0) {
        setSelectedRoundId('')
      }
      if (parseInt(value, 10) >= latestRoundId) {
        setSelectedRoundId(latestRoundId.toString())
      }
    } else {
      setSelectedRoundId('')
    }
  }

  const handleArrowButtonPress = (targetRound) => {
    if (targetRound) {
      setSelectedRoundId(targetRound.toString())
    } else {
      // targetRound is NaN when the input is empty, the only button press that will trigger this func is 'forward one'
      setSelectedRoundId('1')
    }
  }

  return (
    <Container>
      <Title>
        {t('Round, Winner')}
      </Title>
      <Flex mt={isSmall ? '18px' : '28px'}>
        <RoundWinner
          isLoading={isLoading}
          selectedRoundId={selectedRoundId}
          mostRecentRound={latestRoundId}
          handleInputChange={handleInputChange}
          handleArrowButtonPress={handleArrowButtonPress}
          selectedLotteryNodeData={selectedLotteryNodeData}
          locale={locale}
        />
        {!isSmall && <HowToPlay/>}
      </Flex>
    </Container>
  )
}

