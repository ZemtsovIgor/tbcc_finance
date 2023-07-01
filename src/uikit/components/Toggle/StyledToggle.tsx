import styled from 'styled-components'
import { ToggleProps, HandleProps, InputProps, ScaleKeys, scales, StyleToggleProps } from './types'

const scaleKeyValues = {
  sm: {
    handleHeight: '16px',
    handleWidth: '16px',
    handleLeft: '2px',
    handleTop: '2px',
    checkedLeft: 'calc(100% - 18px)',
    toggleHeight: '20px',
    toggleWidth: '36px',
  },
  md: {
    handleHeight: '20px',
    handleWidth: '20px',
    handleLeft: '3px',
    handleTop: '3px',
    checkedLeft: 'calc(100% - 24px)',
    toggleHeight: '28px',
    toggleWidth: '48px',
  },
  lg: {
    handleHeight: '32px',
    handleWidth: '32px',
    handleLeft: '4px',
    handleTop: '4px',
    checkedLeft: 'calc(100% - 36px)',
    toggleHeight: '40px',
    toggleWidth: '72px',
  },
}

const getScale =
  (property: ScaleKeys) =>
  ({ scale = scales.LG }: ToggleProps) => {
    return scaleKeyValues[scale][property]
  }

export const Handle = styled.div<HandleProps>`
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  cursor: pointer;
  height: 20px;
  left: ${getScale('handleLeft')};
  position: absolute;
  top: ${getScale('handleTop')};
  transition: left 200ms ease-in;
  width: 20px;
  z-index: 1;
  box-shadow: none!important;

  &.toggle-lottery-button {
    background: linear-gradient(180deg, #64C2FC 0%, #4E89E3 100%);
    border-radius: 30px;
    width: 196px;
    height: 47px;
    font-weight: 600;
    font-size: 12px;
    line-height: 72px;
    letter-spacing: 0.1em;
    color: #FFFFFF;
    top: 0;
    left: 0;
    text-transform: uppercase;

    @media screen and (max-width: 670px) {
      width: 150px;
      height: 40px;
    }
  }

  &.token-dismiss-toogle {
    background-color: #E7E8F4;
  }
`

export const Input = styled.input<InputProps>`
  cursor: pointer;
  opacity: 0;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 3;

  &:checked + ${Handle} {
    left: ${getScale('checkedLeft')};

    &.toggle-lottery-button {
      left: calc(100% - 196px);

      @media screen and (max-width: 670px) {
        left: calc(100% - 150px);
      }
    }

    &.token-dismiss-toogle {
      left: calc(100% - 196px);
    }
  }

  &:focus + ${Handle} {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  &:hover + ${Handle}:not(:disabled):not(:checked) {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`

const StyledToggle = styled.div<StyleToggleProps>`
  align-items: center;
  background:  rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 20px;
  cursor: pointer;
  display: inline-flex;
  height: 28px;
  position: relative;
  transition: background-color 200ms;
  width: 48px;
  
  &.toggle-lottery-button {
    width: 392px;
    height: 49px;
    border-radius: 30px;
    background: #E7E8F4;
    margin-right: 0;

    @media screen and (max-width: 670px) {
      width: 300px;
      height: 40px;
    }
  }

  &.token-dismiss-toogle {
    background: #E7E8F4!important;
    
    > div {
      background: #ffffff!important;
    }
  }
`

export default StyledToggle
