import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { GAS_PRICE_GWEI } from 'state/user/hooks/helpers'
import { useGasPriceManager } from 'state/user/hooks'
import styled from "styled-components";
import { Flex, Button, Text, useMatchBreakpoints, InfoTBCCIcon } from '../../../uikit'

const ButtonContainer = styled(Flex)<{ isMobile: boolean }>`
  flex-wrap: wrap;
  width: ${({ isMobile }) => isMobile ? 'calc(100% - 2px)' : ''};
  background: transparent;
  border: none;
  border-radius: 0;
  overflow: hidden;
`

const SelectButton = styled(Button)<{ isActive: boolean, isMobile: boolean }>`
  font-weight: 600;
  font-size: 15px;
  background: ${({ isActive }) => isActive ? 'linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${({ isActive }) => isActive ? '#FFF' : 'rgba(255, 255, 255, 0.45)'};
  border: ${({ isActive }) => isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.09)'};
  height: ${({ isMobile }) => isMobile ? '50px' : '47px'};
  padding: ${({ isMobile }) => isMobile ? '0 8px' : '0 18px'};
  border-radius: 6px;
  margin-right: 20px;
  margin-bottom: ${({isMobile}) => isMobile ? '15px' : ''};
`

const GasSettings = () => {
  const { t } = useTranslation()
  const [gasPrice, setGasPrice] = useGasPriceManager()
  const { isMobile } = useMatchBreakpoints()

  return (
    <Flex flexDirection="column">
      <Flex mb="11px" alignItems="center">
        <Text fontSize={isMobile ? '15px' : '14px'} lineHeight="16px" color="rgba(255, 255, 255, 0.45)">{t('Default Transaction Speed (GWEI)')}</Text>
        <InfoTBCCIcon ml='10px'/>
      </Flex>
      <ButtonContainer isMobile={isMobile}>
        <SelectButton
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.default)
          }}
          isActive={gasPrice === GAS_PRICE_GWEI.default}
          isMobile={isMobile}
        >
          {t('Standard')} (3)
        </SelectButton>
        <SelectButton
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.fast)
          }}
          isActive={gasPrice === GAS_PRICE_GWEI.fast}
          isMobile={isMobile}
        >
          {t('Fast')} (5)
        </SelectButton>
        <SelectButton
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.instant)
          }}
          isActive={gasPrice === GAS_PRICE_GWEI.instant}
          isMobile={isMobile}
        >
          {t('Instant')} (6)
        </SelectButton>
      </ButtonContainer>
    </Flex>
  )
}

export default GasSettings
