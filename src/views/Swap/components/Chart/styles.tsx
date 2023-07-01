import { Box } from '../../../../uikit'
import styled from 'styled-components'

export const StyledPriceChart = styled(Box)<{ isMobile?: boolean }>`
  border: none;
  border-radius: 4px;
  width: ${({ isMobile }) => (isMobile ? '100%' : 'calc(100% - 459px)')};
  height: 70%;
  padding-top: ${({ isMobile }) => (isMobile ? '19px' : '21px')};
  padding-bottom: ${({ isMobile }) => (isMobile ? '13px' : '0')};
  background-color: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.02);
`
