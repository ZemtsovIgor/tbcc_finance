import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { LotteryTicket, LotteryTicketClaimData } from 'config/constants/types'
import { fetchLottery } from 'state/lottery/helpers'
import { getWinningTickets } from 'state/lottery/fetchUnclaimedUserRewards'
import { fetchUserTicketsForOneRound } from 'state/lottery/getUserTicketsData'
import { LotteryRound } from 'state/types'
import { useGetUserLotteryGraphRoundById } from 'state/lottery/hooks'
import { useTranslation } from 'contexts/Localization'
import {
  useTooltip,
  useModal,
  Box,
  Text,
  Flex,
  Skeleton,
  TooltipText,
  InfoIcon,
  Heading,
  useMatchBreakpoints
} from '../../../../uikit'
import {parseRetrievedNumber, processLotteryResponse} from '../../helpers'
import ClaimPrizesModal from "../ClaimPrizesModal";
import WinningBackground from '../../images/WinningNumBackground.svg'
import {StyledBtn} from "../../../Swap/styles";
import UserTocketBackground from '../../images/UserTicketBackground.svg'

const ScrollBox = styled(Box)`
  margin-right: -20px;
  padding-right: 24px;
  max-height: 300px;
  overflow-y: scroll;
  margin-top: 24px;
`
const WinningNumContainer = styled(Flex)`
  width: 100%;
  height: 85px;
  align-items: center;
  justify-content: space-around;
  background-image: url(${WinningBackground});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`
const Numbers = styled(Text)`
  font-weight: 600;
  font-size: 18px;
  color: #FFFFFF;
`
export const UserTicketContainer = styled(Flex)`
  width: 115px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-image: url(${UserTocketBackground});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  font-weight: 500;
  font-size: 14px;
  color: #FFF;
  letter-spacing: 4px;
`

const TicketSkeleton = () => {
  return (
    <>
      <Skeleton width="32px" height="12px" mt="2px" mb="4px" />
      <Skeleton width="100%" height="34px" mb="12px" />
    </>
  )
}

const PreviousRoundTicketsInner: React.FC<{ roundId: string }> = ({ roundId }) => {
  const [lotteryInfo, setLotteryInfo] = useState<LotteryRound>(null)
  const [allUserTickets, setAllUserTickets] = useState<LotteryTicket[]>(null)
  const [userWinningTickets, setUserWinningTickets] = useState<{
    allWinningTickets: LotteryTicket[]
    ticketsWithUnclaimedRewards: LotteryTicket[]
    isFetched: boolean
    claimData: LotteryTicketClaimData
  }>({ allWinningTickets: null, ticketsWithUnclaimedRewards: null, isFetched: false, claimData: null })
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { account } = useWeb3React()
  const { totalTickets } = useGetUserLotteryGraphRoundById(roundId)
  const [onPresentClaimModal] = useModal(<ClaimPrizesModal roundsToClaim={[userWinningTickets.claimData]} />, false)

  let numAsArray = [];
  if (lotteryInfo) {
    const number = lotteryInfo?.finalNumber.toString();
    const reversedNumber = parseRetrievedNumber(number)
    numAsArray = reversedNumber.split('')
  }

  const TooltipComponent = () => (
    <>
      <Text mb="16px">
        {t('Tickets must match the winning number in the exact same order, starting from the first digit.')}
      </Text>
      <Text mb="16px">{t('If the winning number is “123456”:')}</Text>
      <Text mb="4px">{t('“120000” matches the first 2 digits.')}</Text>
      <Text>
        {t('“000006” matches the last digit, but since the first five digits are wrong, it doesn’t win any prizes.')}
      </Text>
    </>
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })

  useEffect(() => {
    const addWinningTicketInfoToAllTickets = (
      _allTickets: LotteryTicket[],
      _allWinningTickets: LotteryTicket[],
    ): LotteryTicket[] => {
      const allTicketsWithWinningTickets = _allTickets.map((ticket) => {
        const winningTicketEquivalent = _allWinningTickets.find((winningTicket) => winningTicket.id === ticket.id)
        if (winningTicketEquivalent) {
          return winningTicketEquivalent
        }
        return ticket
      })
      return allTicketsWithWinningTickets
    }

    const sortTicketsByWinningBracket = (tickets) => {
      return tickets.sort((ticketA, ticketB) => {
        const rewardBracket1 = ticketA.rewardBracket === undefined ? 0 : ticketA.rewardBracket + 1
        const rewardBracket2 = ticketB.rewardBracket === undefined ? 0 : ticketB.rewardBracket + 1
        return rewardBracket2 - rewardBracket1
      })
    }

    const fetchData = async () => {
      const userTickets = await fetchUserTicketsForOneRound(account, roundId)
      const lotteryData = await fetchLottery(roundId)
      const processedLotteryData = processLotteryResponse(lotteryData)
      const winningTickets = await getWinningTickets({
        roundId,
        userTickets,
        finalNumber: processedLotteryData.finalNumber.toString(),
      })

      setUserWinningTickets({
        isFetched: true,
        allWinningTickets: winningTickets?.allWinningTickets,
        ticketsWithUnclaimedRewards: winningTickets?.ticketsWithUnclaimedRewards,
        claimData: winningTickets,
      })
      setLotteryInfo(processedLotteryData)

      // If the user has some winning tickets - modify the userTickets response to include that data
      if (winningTickets?.allWinningTickets) {
        const allTicketsWithWinningTicketInfo = addWinningTicketInfoToAllTickets(
          userTickets,
          winningTickets.allWinningTickets,
        )

        const ticketsSortedByWinners = sortTicketsByWinningBracket(allTicketsWithWinningTicketInfo)

        setAllUserTickets(ticketsSortedByWinners)
      } else {
        setAllUserTickets(userTickets)
      }
    }

    fetchData()
  }, [roundId, account, totalTickets])

  const getFooter = () => {
    if (userWinningTickets?.ticketsWithUnclaimedRewards?.length > 0) {
      return (
        <StyledBtn onClick={onPresentClaimModal} mt="24px" width="100%">
          {t('Collect Prizes')}
        </StyledBtn>
      )
    }
    if (!userWinningTickets.allWinningTickets) {
      return (
        <div ref={targetRef}>
          <Flex alignItems="center" justifyContent="center" mt="20px">
            <InfoIcon height="20px" width="20px" color="#FFF" mr="8px" />
            <TooltipText color="#FFF">{t("Why didn't I win?")}</TooltipText>
          </Flex>
        </div>
      )
    }
    return null
  }

  return (
    <>
      {tooltipVisible && tooltip}
      <Flex
        mb="8px"
        justifyContent="space-between"
        flexDirection="column"
      >
        <Heading
          mb='29px'
          fontWeight="600"
          fontSize='18px'
          lineHeight={isMobile ? '24px' : '24px'}
          color="#FFF"
        >
          {t('Winning number')}
        </Heading>

        <WinningNumContainer>
          {lotteryInfo?.finalNumber ? (
            <Flex>
              {numAsArray.map((el, index) => {
                return (
                  <Numbers key={`previus-round-tickets-inner-${el}-${index + 1}`}>
                    {el}
                  </Numbers>
                )
              })}
            </Flex>
          ) : (
            <Skeleton width="80%" height="34px" />
          )}
        </WinningNumContainer>
      </Flex>

      <ScrollBox>
        <Heading
          mb="24px"
          fontWeight="600"
          fontSize='18px'
          lineHeight={isMobile ? '24px' : '24px'}
          color="#FFF"
        >
          {t('Your tickets')}
        </Heading>
        <Flex mb="8px" justifyContent="space-between">
          <Flex>
            <Text
              display="inline"
              fontWeight="400"
              fontSize="16px"
              lineHeight="22px"
              color="rgba(255, 255, 255, 0.45)"
            >
              {t('Total tickets')}
            </Text>
          </Flex>
          <Text bold color="#FFF">
            {allUserTickets ? allUserTickets.length : <Skeleton width="56px" height="24px" />}
          </Text>
        </Flex>
        <Flex mb="24px" justifyContent="space-between">
          <Flex>
            <Text
              display="inline"
              fontWeight="400"
              fontSize="16px"
              lineHeight="22px"
              color="rgba(255, 255, 255, 0.45)"
            >
              {t('Winning tickets')}
            </Text>
          </Flex>
          <Text bold color="#FFF">
            {userWinningTickets.isFetched ? (
              userWinningTickets?.allWinningTickets?.length || '0'
            ) : (
              <Skeleton width="40px" height="24px" />
            )}
          </Text>
        </Flex>
        <Flex alignItems='center' flexWrap='wrap' style={{gridGap: '15px'}}>
        {allUserTickets ? (
          allUserTickets.map((ticket) => {
            return (
              <UserTicketContainer key={ticket.id}>{parseRetrievedNumber(ticket.number)}</UserTicketContainer>
            )
          })
        ) : (
          <>
            <TicketSkeleton />
            <TicketSkeleton />
            <TicketSkeleton />
            <TicketSkeleton />
          </>
        )}
        </Flex>
      </ScrollBox>
        <Flex alignItems="center" justifyContent="center">
         {userWinningTickets.isFetched && getFooter()}
        </Flex>
    </>
  )
}

export default PreviousRoundTicketsInner
