import React, {useState} from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import {
  Text,
  Flex,
  Button,
  ModalTitle,
  Heading,
  ModalCloseButton, ModalHeader, useMatchBreakpoints, Box, ModalContainer
} from '../../../../uikit'
import TicketInput, {getIdLabel} from './TicketInput'
import { UpdateTicketAction, Ticket } from './useTicketsReducer'
import {StyledBtn} from "../../../Mint/components/MintModal";
import RefreshIcon from "../../images/RefreshIcon";

const StyledModal = styled(ModalContainer)`
  position: relative;
  overflow: visible;
  background: #171533;
  box-shadow: 0 0 100px 100px rgba(161, 0, 255, 0.2);
  border-radius: 24px;

  ${({theme}) => theme.mediaQueries.xs} {
    max-width: calc(100vw - 30px);
  }

  ${({theme}) => theme.mediaQueries.sm} {
    min-width: 485px;
    max-width: 485px;
  }
`
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.0875) 50%, rgba(255, 255, 255, 0) 100%);
`

export const ModalBody = styled(Flex)`
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
`

const RandomizeBtn = styled(Button)`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 15px;
  background: linear-gradient(77.9deg, rgba(219, 0, 255, 0.15) -3.83%, rgba(44, 94, 224, 0.15) 110.36%);
  box-shadow: none;
  color: #FFF;
  border-radius: 6px;
  border: none;
  position: relative;
  cursor: pointer;
  margin-bottom: 20px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 6px;
    border: 1px solid transparent;
    background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%) border-box;
    mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;

  }
`
const IdText = styled(Text)<{isActive?: boolean}>`
  font-weight: 400;
  font-size: 14px;
  color: ${({isActive}) => isActive ? '#FFF' : 'rgba(255, 255, 255, 0.45)'};
  margin-right: 5px;
  cursor: pointer;
`

const EditNumbersModal: React.FC<{
  totalCost: string
  updateTicket: UpdateTicketAction
  randomize: () => void
  tickets: Ticket[]
  allComplete: boolean
  onConfirm: () => void
  isConfirming: boolean
  onDismiss?: () => void
}> = ({ totalCost, updateTicket, randomize, tickets, allComplete, onConfirm, isConfirming, onDismiss }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const [activeId, setActiveId] = useState(1)
  return (
    <StyledModal minWidth="330px" maxWidth="calc(100vw - 30px)"
    >
      <ModalHeader padding={isMobile ? '12px 25px 0 25px' : '17px 36px 0 36px'}>
        <ModalTitle>
          <Heading fontSize='24px' fontWeight='600' color='#FFF'>{t('Buy Tickets')}</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} light/>
      </ModalHeader>
      <Line mt='15px'/>
      <ModalBody p={isMobile ? '25px' : '24px 36px'}>
        <Flex flexDirection='column'>
          <Flex justifyContent="space-between" mb="16px">
            <Text fontSize='16px' fontWeight='500' color="#FFF">{t('Total cost')}:</Text>
            <Text fontSize='16px' fontWeight='500' color="#FFF">~{totalCost} TBCC</Text>
          </Flex>
          <Text fontSize="14px" color="rgba(255, 255, 255, 0.45)" mb="30px">
            {t(
              'Numbers are randomized, with no duplicates among your tickets. Tap a number to edit it. Available digits: 0-9',
            )}
          </Text>
          <RandomizeBtn
            disabled={isConfirming}
            mb="16px"
            variant="secondary"
            width="100%"
            height="32px"
            onClick={randomize}
          >
            <RefreshIcon mr='5px'/>
            {t('Randomize')}
          </RandomizeBtn>
          {/* {testData.map((ticket) => ( */}
          {/*  <TicketInput */}
          {/*    key={ticket.id} */}
          {/*    ticket={ticket} */}
          {/*    duplicateWith={ticket.duplicateWith} */}
          {/*    updateTicket={updateTicket} */}
          {/*    disabled={isConfirming} */}
          {/*  /> */}
          {/* ))} */}
          <Flex width='100%' flexWrap='wrap' mb='8px'>
            {tickets.map((ticket) => {
              return (
                <IdText key={ticket.id} isActive={ticket.id === activeId} onClick={() => setActiveId(ticket.id)}>
                  {getIdLabel(ticket.id)}
                </IdText>
              )
            })}
          </Flex>
          <TicketInput
            ticket={tickets[activeId - 1]}
            duplicateWith={tickets[activeId - 1].duplicateWith}
            updateTicket={updateTicket}
            disabled={isConfirming}/>
        </Flex>
        <Line mb='15px' mt='20px'/>
        <Flex flexDirection="column" justifyContent="center">
          <StyledBtn
            id="lotteryBuyEdited"
            disabled={!allComplete || isConfirming}
            onClick={() => {
              onConfirm()
            }}
            style={{minHeight: '55px'}}
          >
            {isConfirming ? t('Confirming') : t('Confirm and buy')}
          </StyledBtn>
          <StyledBtn
            mt="8px"
            disabled={isConfirming}
            onClick={onDismiss}
            style={{minHeight: '55px', background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)'}}
          >
            {t('Go back')}
          </StyledBtn>
        </Flex>
      </ModalBody>
    </StyledModal>
  )
}

export default EditNumbersModal
