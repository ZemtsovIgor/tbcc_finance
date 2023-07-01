import React from "react";
import styled from "styled-components"
import {useGetUserLotteriesGraphData} from 'state/lottery/hooks'
import {useTranslation} from "../../../contexts/Localization";
import {Box, ChevronLeftSecondIcon, ChevronRightSecondIcon, Flex, Text, useMatchBreakpoints, IconButton, Skeleton, Input, Button, useModal} from "../../../uikit";
import {getDrawnDate, parseRetrievedNumber} from "../helpers";
import {getBalanceNumber, formatNumber} from "../../../utils/formatBalance";
import ViewTicketsModal from "./ViewTicketsModal";
import {useTBCCBusdPrice} from "../../../hooks/useBUSDPrice";

const StyledIconButton = styled(IconButton)`
  background: none;
  
  :disabled {
    background: none;
  }
`
export const Card = styled(Flex)`
  flex-direction: column;
  color: #FFF;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  padding: 24px 40px 48px 38px;

  @media (max-width: 968px) {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 22px 32px 48px 30px;
  }
`
const StyledInput = styled(Input)<{ isMobile?: boolean }>`
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 24px;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 60px;
  margin: 0 19px;
  color: #FFF;
  text-align: center;

  @media (max-width: 968px) {
    font-size: 20px;
    width: 68px;
    height: 45px;
  }
`
const Disclaimer = styled(Flex)`
  width: 100%;
  height: 35px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.45);
  border: 1px solid #836DF3;
  border-radius: 6px;
  margin-top: 48px;

  @media (max-width: 968px) {
    margin-top: 26px;
  }
`
export const CardTitle = styled(Text)`
  font-size: 24px;
  font-weight: 600;
  color: #FFF;

  @media (max-width: 968px) {
    font-size: 20px;
  }
`
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.0875) 50%, rgba(255, 255, 255, 0) 100%);
  margin: 20px 0;
`
const Circle = styled(Flex)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-weight: 600;
  font-size: 24px;
  color: #FFF;
  margin-top: 10px;

  @media (max-width: 968px) {
    width: 40px;
    height: 40px;
    margin-top: 0;
  }
`
const StyledDate = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.45);
  margin-left: 10px;
  min-width: 195px;

  @media (max-width: 968px) {
    margin-left: 0;
    margin-top: 10px;
  }
`
const SecondaryText = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.45);
  display: flex;
  align-items: center;
`
const CircleContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-top: 15px;

  @media (max-width: 968px) {
    display: flex;
    grid-gap: 5px;
  }
`

interface RoundCardProps {
  isLoading: boolean
  selectedRoundId: string
  mostRecentRound: number
  handleInputChange: (event: any) => void
  handleArrowButtonPress: (targetRound: number) => void
  selectedLotteryNodeData: any
  locale: any
}

const RoundWinner: React.FC<RoundCardProps> = ({
  isLoading,
  selectedRoundId,
  mostRecentRound,
  handleInputChange,
  handleArrowButtonPress,
  selectedLotteryNodeData,
  locale
}) => {
  const { t } = useTranslation()
  const userLotteryData = useGetUserLotteriesGraphData()

  const userDataForRound = userLotteryData.rounds.find((userLotteryRound) => userLotteryRound.lotteryId === selectedRoundId)

  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  const selectedRoundIdAsInt = parseInt(selectedRoundId, 10)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      handleInputChange(e)
    }
  }

  const tbccPriceBusd = useTBCCBusdPrice()
  let prizeInBusd = 0;
  let numAsArray = [];
  if (selectedLotteryNodeData && tbccPriceBusd) {
    const { amountCollectedInTBCC } = selectedLotteryNodeData
    const tbccUSDPrice = Number(tbccPriceBusd.toFixed(9));

    const amountInTBCC = getBalanceNumber(amountCollectedInTBCC);
    prizeInBusd = amountInTBCC * tbccUSDPrice;

    const number = selectedLotteryNodeData?.finalNumber.toString();
    const reversedNumber = parseRetrievedNumber(number)
    numAsArray = reversedNumber.split('')
  }

  const [onPresentViewTicketsModal] = useModal(
    <ViewTicketsModal roundId={selectedRoundId} roundStatus={selectedLotteryNodeData?.status} />,
  )

  return (
    <Card minHeight='440px'>
      <Flex alignItems='center'>
        <CardTitle>
          {t('Round')}
        </CardTitle>
        <StyledInput
          pattern="^[0-9]+$"
          inputMode="numeric"
          disabled={isLoading}
          id="round-id"
          name="round-id"
          value={selectedRoundId}
          scale="lg"
          onChange={handleOnChange}
          isMobile={isMobile}
        />
        {(!isSmall && selectedRoundId) ? (
          selectedLotteryNodeData?.endTime ? (
            <StyledDate>
              {t('Drawn')} {getDrawnDate(locale, selectedLotteryNodeData.endTime)}
            </StyledDate>
          ) : (
            <Skeleton width="185px" height="21px" />
          )
        ) : null}
        <Flex ml={isSmall && 'auto'}>
          <StyledIconButton
            disabled={!selectedRoundIdAsInt || selectedRoundIdAsInt <= 1}
            onClick={() => handleArrowButtonPress(selectedRoundIdAsInt - 1)}
          >
            <ChevronLeftSecondIcon m='0 10px 0 55px' opacity={(!selectedRoundIdAsInt || selectedRoundIdAsInt <= 1) ? '0.4' : '1'}/>
          </StyledIconButton>
          <StyledIconButton
            disabled={selectedRoundIdAsInt >= mostRecentRound}
            onClick={() => handleArrowButtonPress(selectedRoundIdAsInt + 1)}
          >
            <ChevronRightSecondIcon opacity={(selectedRoundIdAsInt >= mostRecentRound) ? '0.4' : '1'}/>
          </StyledIconButton>
        </Flex>
      </Flex>
      {
        (isSmall && selectedRoundId) ? (
          selectedLotteryNodeData?.endTime ? (
            <StyledDate>
              {t('Drawn')} {getDrawnDate(locale, selectedLotteryNodeData.endTime)}
            </StyledDate>
          ) : (
            <Skeleton width="185px" height="21px" />
          )
        ) : null}
      <Line/>
      <Flex
        justifyContent='space-between'
        mt={!isSmall && '10px'}
        flexDirection={isSmall ? 'column' : 'row'}>
        <Flex
          flexDirection='column'>
          <Text fontSize='15px' fontWeight='500' color='#FFF'>
            {t('Prize pool')}
          </Text>
          {isLoading ? (
            <Skeleton my="7px" height={40} width={200} />
          ) : (
            <Text fontSize={isSmall ? '28px' : '32px'} fontWeight='600' color='#FFF' mt='8px'>
              ${prizeInBusd.toLocaleString('en-EN')}
            </Text>
          )}
          <SecondaryText mt='15px'>
            {formatNumber(getBalanceNumber(selectedLotteryNodeData?.amountCollectedInTBCC), 0, 0)} TBCC
          </SecondaryText>
          <SecondaryText mt='15px'>
            {t('Total tickets this round')}:&nbsp;
            {
              (!isLoading) ? (
                <span style={{color: "#FFF"}}>{userDataForRound?.totalTickets || 0}</span>
              ) : (
                <Skeleton height={14} width={31} display="inline-block" />
              )
            }
          </SecondaryText>
        </Flex>
        <Flex
          flexDirection='column'
          ml={!isSmall && '20px'}
          mt={isSmall && '23px'}>
          <Text fontSize='15px' fontWeight='500' color='#FFF'>
            {t('Winning Number')}
          </Text>
          <CircleContainer>
            {selectedRoundId ? (
              selectedLotteryNodeData ? (
                <>
                  {numAsArray.map((el, index) => {
                    return (
                      <Circle key={`round-winner-ball-${el}-${index + 1}`}>
                        {el}
                      </Circle>
                    )
                  })}
                </>
              ) : (
                <Skeleton
                  width="100%"
                  height={['34px', null, null, '71px']}
                  mr="null"
                />
              )
            ) : (
              <>
                <Flex flexDirection="column" alignItems="center" width="100%">
                  <Text mb="8px">{t('Please specify Round')}</Text>
                </Flex>
              </>
            )}
          </CircleContainer>
        </Flex>
      </Flex>
      <Disclaimer>
        {t('You have')}
        &nbsp;
        {
          (userDataForRound) ? (
            <Button
              onClick={onPresentViewTicketsModal}
              style={{
                fontWeight: "500",
                fontSize: isMobile ? '15px' : '18px',
                lineHeight: isMobile ? '15px' : '24px',
                color: "#FFF",
                display: "inline",
                background: "none",
                border: 0,
                boxShadow: "none",
                padding: 0,
                height: "auto",
              }}
            >
              {`${userDataForRound.totalTickets} ${t('tickets')}`}
            </Button>
          ) : (
            <Text
              fontWeight="500"
              fontSize={isMobile ? '15px' : '16px'}
              lineHeight={isMobile ? '15px' : '24px'}
              color="#FFF"
              display="inline"
            >
              {`0 ${t('tickets')}`}
            </Text>
          )
        }
        &nbsp;
        {t('this round')}
      </Disclaimer>
    </Card>
  )
}

export default RoundWinner
