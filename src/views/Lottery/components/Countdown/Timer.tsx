import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import {Flex, Heading, useMatchBreakpoints} from "../../../../uikit";

export interface TimerProps {
  minutes?: number
  hours?: number
  days?: number
  seconds?: number
}

const StyledTimerFlex = styled(Flex)<{ showTooltip?: boolean }>`
  margin-top: 10px;
  div:last-of-type {
    margin-right: 0;
  }
`

const StyledTimerText = styled(Heading)<{ isMobile?: boolean }>`
  font-weight: 600;
  font-size: ${({ isMobile }) => (isMobile ? '32px' : '32px')};
  color: #FFF;
`

const Wrapper: React.FC<TimerProps> = ({ seconds, minutes, hours, days }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  return (
    <StyledTimerFlex alignItems="flex-end">
      {Boolean(days) && (
        <>
          <StyledTimerText isMobile={isMobile}>
            {days}
          </StyledTimerText>
          <StyledTimerText isMobile={isMobile} mr="8px">{t('d')}</StyledTimerText>
          <StyledTimerText isMobile={isMobile} mr="8px">:</StyledTimerText>
        </>
      )}
      {Boolean(hours) && (
        <>
          <StyledTimerText isMobile={isMobile}>
            {hours}
          </StyledTimerText>
          <StyledTimerText isMobile={isMobile} mr="8px">{t('h')}</StyledTimerText>
          <StyledTimerText isMobile={isMobile} mr="8px">:</StyledTimerText>
        </>
      )}
      {Boolean(minutes) && (
        <>
          <StyledTimerText isMobile={isMobile}>
            {minutes}
          </StyledTimerText>
          <StyledTimerText isMobile={isMobile} mr="8px">{t('m')}</StyledTimerText>
          <StyledTimerText isMobile={isMobile} mr="8px">:</StyledTimerText>
        </>
      )}
      {Boolean(seconds) && (
        <>
          <StyledTimerText isMobile={isMobile}>
            {seconds}
          </StyledTimerText>
          <StyledTimerText isMobile={isMobile} mr="8px">{t('s')}</StyledTimerText>
        </>
      )}
    </StyledTimerFlex>
  )
}

export default Wrapper
