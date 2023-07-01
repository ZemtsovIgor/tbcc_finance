import styled, { DefaultTheme } from 'styled-components'
import { space, layout, variant } from 'styled-system'
import { scaleVariants, styleVariants } from './theme'
import { BaseButtonProps } from './types'

interface ThemedButtonProps extends BaseButtonProps {
  theme: DefaultTheme
}

interface TransientButtonProps extends ThemedButtonProps {
  $isLoading?: boolean
}

const getDisabledStyles = ({ $isLoading }: TransientButtonProps) => {
  if ($isLoading === true) {
    return `
      &:disabled,
      &.pancake-button--disabled {
        cursor: not-allowed;
      }
    `
  }

  return `
    &:disabled,
    &.pancake-button--disabled {
      background: rgba(255, 255, 255, 0.25);
      border-color: rgba(255, 255, 255, 0.25);
      box-shadow: none;
      filter: none;
      color: color: rgba(255, 255, 255, 0.25);
      cursor: not-allowed;
    }
  `
}

/**
 * This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */

const getOpacity = ({ $isLoading = false }: TransientButtonProps) => {
  return $isLoading ? '.5' : '1'
}

const StyledButton = styled.button<BaseButtonProps>`
  border: none;
  box-shadow: none;
  cursor: pointer;
  opacity: ${getOpacity};
  outline: 0;
  transition: background-color 0.2s, opacity 0.2s;
  
  &#mintBtn {
    background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
    border-radius: 6px;
    color: #FFF;
    font-size: 16px;
    font-weight: 600;
    padding: 18px 28px;
    margin-top: 16px;
    height: auto;
  }

  &#tableBtn {
    margin-bottom: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {
    opacity: 0.65;
  }

  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }

  ${getDisabledStyles}
  ${variant({
    prop: 'scale',
    variants: scaleVariants,
  })}
  ${variant({
    variants: styleVariants,
  })}
  ${layout}
  ${space}
`

export default StyledButton
