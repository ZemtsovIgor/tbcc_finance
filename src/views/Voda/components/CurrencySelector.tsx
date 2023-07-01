import React from "react";
import styled from "styled-components";
import { Flex } from "../../../uikit";

const SelectorContainer = styled(Flex)`
  width: 100%;
  background: #4F5054;
  border-radius: 12px;
  overflow: hidden;
`
const SelectorItem = styled(Flex)<{isActive?: boolean}>`
  width: 50%;
  height: 60px;
  align-items: center;
  justify-content: center;
  background: ${({isActive}) => isActive ? '#FFF' : 'transparent'};
  color: ${({isActive}) => isActive ? '#333333' : '#FFF'};
  font-weight: 800;
  font-size: 16px;
  text-align: center;
  letter-spacing: 0.15em;
  cursor: pointer;
  border-radius: 12px;
  transition: all 500ms ease;
`

interface CurrencySelectorProps {
  selectedCurr: string,
  setSelectedCurr: (curr: string) => void
}

export const CurrencySelector = ({selectedCurr, setSelectedCurr} : CurrencySelectorProps) => {
  return (
    <SelectorContainer>
      <SelectorItem
        isActive={selectedCurr === 'BNB'}
        onClick={() => setSelectedCurr('BNB')}
      >
        BNB
      </SelectorItem>
      <SelectorItem
        isActive={selectedCurr === 'TBCC'}
        onClick={() => setSelectedCurr('TBCC')}
      >
        TBCC
      </SelectorItem>
    </SelectorContainer>
  )
}
