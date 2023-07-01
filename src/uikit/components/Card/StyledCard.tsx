import styled, { DefaultTheme, keyframes, css } from 'styled-components'
import { space } from 'styled-system'
import { Box } from '../Box'
import { CardProps } from './types'

const PromotedGradient = keyframes`
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`

interface StyledCardProps extends CardProps {
  theme: DefaultTheme
}

export const StyledCard = styled.div<StyledCardProps>`
  background: transparent;
  color: ${({ theme, isDisabled }) => theme.colors[isDisabled ? 'textDisabled' : 'text']};
  overflow: hidden;
  position: relative;

  ${({ isActive }) =>
    isActive &&
    css`
      animation: ${PromotedGradient} 3s ease infinite;
      background-size: 400% 400%;
    `}

  ${space}
`

export const StyledCardInner = styled(Box)<{ background?: string; hasCustomBorder: boolean, borderRadius?: number }>`
  width: 100%;
  height: 100%;
  overflow: ${({ hasCustomBorder }) => (hasCustomBorder ? 'initial' : 'inherit')};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -weblit-backdrop-filter: blur(5px);
  box-shadow: none;
  border-radius: ${({borderRadius}) =>  borderRadius || '24px'};
  border: 1px solid #FFFFFF16;
`

StyledCard.defaultProps = {
  isActive: false,
  isSuccess: false,
  isWarning: false,
  isDisabled: false,
}
