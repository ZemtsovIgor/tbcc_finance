import React from 'react'
import styled from 'styled-components'
import useLastTruthy from 'hooks/useLast'
import { AdvancedSwapDetails, AdvancedSwapDetailsProps } from './AdvancedSwapDetails'

const AdvancedDetailsFooter = styled.div<{ show: boolean, isExpertMode?: boolean }>`
  margin-top: ${({isExpertMode}) => isExpertMode ? '15px' : '28px'};
  padding: 19px 4px;
  width: 100%;
  color: #FFF;
  background: ${({isExpertMode}) => isExpertMode ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter:${({isExpertMode}) => isExpertMode ? 'none' : 'blur(5px)'};
  -webkit-backdrop-filter: ${({isExpertMode}) => isExpertMode ? 'none' : 'blur(5px)'};
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.02);
  border-radius: 24px;
  border: ${({isExpertMode}) => isExpertMode ? 'none' : '1px solid rgba(255, 255, 255, 0.09)'};

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
`

export default function AdvancedSwapDetailsDropdown({ trade, isExpertMode, ...rest }: AdvancedSwapDetailsProps) {
  const lastTrade = useLastTruthy(trade)

  return (
    <AdvancedDetailsFooter show={Boolean(trade)} isExpertMode={isExpertMode}>
      <AdvancedSwapDetails {...rest} trade={trade ?? lastTrade ?? undefined} />
    </AdvancedDetailsFooter>
  )
}
