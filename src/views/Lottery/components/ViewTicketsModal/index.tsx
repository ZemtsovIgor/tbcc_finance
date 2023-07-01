import React from 'react'
import styled from 'styled-components'
import {useTranslation} from 'contexts/Localization'
import {LotteryStatus} from 'config/constants/types'
import {useLottery} from 'state/lottery/hooks'
import {
  Heading,
  ModalCloseButton,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  useMatchBreakpoints,
  ModalBody, Box
} from '../../../../uikit'
import PreviousRoundTicketsInner from './PreviousRoundTicketsInner'
import CurrentRoundTicketsInner from './CurrentRoundTicketsInner'

const StyledModal = styled(ModalContainer)`
  background: #171533;
`
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.0875) 50%, rgba(255, 255, 255, 0) 100%);
`

interface ViewTicketsModalProps {
  roundId: string
  roundStatus?: LotteryStatus
  onDismiss?: () => void
  setModalIsOpen?: (e) => void
}

const ViewTicketsModal: React.FC<ViewTicketsModalProps> = ({onDismiss, roundId, roundStatus, setModalIsOpen}) => {
  const {t} = useTranslation()
  const {isMobile} = useMatchBreakpoints()
  const {currentLotteryId} = useLottery()
  const isPreviousRound = roundStatus?.toLowerCase() === LotteryStatus.CLAIMABLE || roundId !== currentLotteryId

  return (
    <StyledModal
      title={`${t('Round')} ${roundId}`}
      minWidth={isMobile ? 'calc(100% - 30px)' : '500px'}
    >
      <ModalHeader padding={isMobile ? '12px 25px 0 25px' : '17px 36px 0 36px'}>
        <ModalTitle>
          <Heading fontSize='24px' fontWeight='600' color='#FFF'>{`${t('Round')} ${roundId}`}</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} light/>
      </ModalHeader>
      <Line mt='15px'/>
      <ModalBody p={isMobile ? '25px' : '24px 36px'}>
         {isPreviousRound ? <PreviousRoundTicketsInner roundId={roundId} /> : <CurrentRoundTicketsInner setModalIsOpen={setModalIsOpen} />}
      </ModalBody>
    </StyledModal>
  )
}

export default ViewTicketsModal
