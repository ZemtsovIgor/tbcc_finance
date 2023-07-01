import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { useLottery } from 'state/lottery/hooks'
import { LotteryStatus } from 'config/constants/types'
import styled from "styled-components";
import {Button, ButtonProps, useMatchBreakpoints, useModal} from '../../../uikit'
import BuyTicketModal from "./BuyTicketModal/BuyTicketsModal";

interface BuyTicketsButtonProps extends ButtonProps {
  disabled?: boolean
  setModalIsOpen?: (e) => void
}

export const StyledBtn = styled(Button)`
  height: 55px;
  width: 100%;
  color: #FFF;
  font-size: 15px;
  font-weight: 600;
  border: none;
  box-shadow: none;
  border-radius: 6px;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
`

const BuyTicketsButton: React.FC<BuyTicketsButtonProps> = ({ disabled, setModalIsOpen }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const [onPresentBuyTicketsModal] = useModal(<BuyTicketModal setModalIsOpen={setModalIsOpen} />)
  const {
    currentRound: { status },
  } = useLottery()

  const getBuyButtonText = () => {
    if (status === LotteryStatus.OPEN) {
      return t('Buy Tickets')
    }
    return t('On sale soon!')
  }

  return (
    <StyledBtn
      disabled={disabled}
      isMobile={isMobile}
      onClick={() => {
        setModalIsOpen(true);
        onPresentBuyTicketsModal();
      }}
    >
      {getBuyButtonText()}
    </StyledBtn>
  )
}

export default BuyTicketsButton
