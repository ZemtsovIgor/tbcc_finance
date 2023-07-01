import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { LotteryStatus } from 'config/constants/types'
import { useLottery } from 'state/lottery/hooks'
import { Flex, Box, Text } from '../../../../uikit'
import BuyTicketsButton from "../BuyTicketsButton";

const ScrollBox = styled(Box)`
  max-height: 300px;
  overflow-y: auto;
  margin-left: -24px;
  margin-right: -24px;
  padding-left: 24px;
  padding-right: 20px;
  margin-bottom: 25px;
`
const UserTicketContainer = styled(Flex)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  margin-bottom: 15px;
`
const TicketNumber = styled(Flex)`
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 18px;
  color: #FFFFFF;
`
const VerticalLine = styled(Box)`
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.0875) 0%, rgba(255, 255, 255, 0) 100%);
`

interface CurrentRoundTicketsInnerProps {
  setModalIsOpen?: (e) => void
}

const CurrentRoundTicketsInner = ({ setModalIsOpen }: CurrentRoundTicketsInnerProps) => {
  const { t } = useTranslation()
  const {
    isTransitioning,
    currentRound: { status, userTickets },
  } = useLottery()
  const ticketBuyIsDisabled = status !== LotteryStatus.OPEN || isTransitioning

  return (
    <>
      <Flex flexDirection="column">
        <Text bold textTransform="uppercase" color="#FFF" fontSize="12px" mb="16px">
          {t(`Your tickets`)}{` (${userTickets.tickets.length})`}
        </Text>
        <ScrollBox>
            {userTickets.tickets.map((ticket) => {
            return (
              <React.Fragment  key={ticket.id}>
                <Text fontSize='14px' fontWeight='400' color='rgba(255, 255, 255, 0.45)' my='10px'>
                  #{Number(ticket.id).toLocaleString('en-EN', {minimumIntegerDigits: 3})}
                </Text>
                <UserTicketContainer>
                  {[...ticket.number].map((number, index) => {
                    return (
                      <>
                        <TicketNumber key={number}>
                          {number}
                        </TicketNumber>
                        {index !== ticket.number.length - 1 && <VerticalLine/>}
                      </>
                    )
                  })}
                </UserTicketContainer>
              </React.Fragment>
            )
            })}
        </ScrollBox>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <BuyTicketsButton disabled={ticketBuyIsDisabled} setModalIsOpen={setModalIsOpen} maxWidth="130px" />
      </Flex>
    </>
  )
}

export default CurrentRoundTicketsInner
