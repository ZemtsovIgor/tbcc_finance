import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { LotteryTicketClaimData } from 'config/constants/types'
import { useAppDispatch } from 'state'
import { useLottery } from 'state/lottery/hooks'
import { fetchUserLotteries } from 'state/lottery'
import ClaimPrizesInner from './ClaimPrizesInner'
import {
  Heading,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalCloseButton,
  useMatchBreakpoints, Box
} from '../../../../uikit'

const StyledModal = styled(ModalContainer)`
  background: #171533;
`
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.0875) 50%, rgba(255, 255, 255, 0) 100%);
`

interface ClaimPrizesModalModalProps {
  roundsToClaim: LotteryTicketClaimData[]
  onDismiss?: () => void
}

const ClaimPrizesModal: React.FC<ClaimPrizesModalModalProps> = ({ onDismiss, roundsToClaim }) => {
  const { t } = useTranslation()
  const {isMobile} = useMatchBreakpoints()
  const { account } = useWeb3React()
  const { currentLotteryId } = useLottery()
  const dispatch = useAppDispatch()

  return (
    <StyledModal
      title={`${t('Collect Winnings')} #${roundsToClaim[0].roundId}`}
      minWidth={isMobile ? 'calc(100% - 30px)' : '420px'}
    >
      <ModalHeader padding={isMobile ? '12px 25px 0 25px' : '17px 36px 0 36px'}>
        <ModalTitle>
          <Heading fontSize='24px' fontWeight='600' color='#FFF'>{`${t('Collect Winnings')} #${roundsToClaim[0].roundId}`}</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} light/>
      </ModalHeader>
      <Line mt='15px'/>
      <ModalBody p={isMobile ? '25px' : '24px 36px'}>
        <ClaimPrizesInner
          onSuccess={() => {
            dispatch(fetchUserLotteries({ account, currentLotteryId }))
            onDismiss()
          }}
          roundsToClaim={roundsToClaim}
        />
      </ModalBody>
    </StyledModal>
  )
}

export default ClaimPrizesModal
