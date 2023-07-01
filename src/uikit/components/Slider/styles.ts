import { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import Text from '../Text/Text'
import bunnyButt from './svg/bunnybutt.svg'

interface SliderLabelProps {
  progress: string
}

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isMax: boolean
}

interface DisabledProp {
  disabled?: boolean
}

const getCursorStyle = ({ disabled = false }: DisabledProp) => {
  return disabled ? 'not-allowed' : 'cursor'
}

const getBaseThumbStyles = ({ disabled }: StyledInputProps) => `
  -webkit-appearance: none;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  border: 4px solid #FFF;
  border-radius: 50%;
  cursor: ${getCursorStyle};
  width: 22px;
  height: 22px;
  filter: ${disabled ? 'grayscale(100%)' : 'none'};
  transform: translate(0px, 2px);
  transition: 200ms transform;

  // &:hover {
  //   transform: ${disabled ? 'scale(1) translate(-2px, -2px)' : 'scale(1.1) translate(-3px, -3px)'};
  // }
`

export const SliderLabelContainer = styled.div`
  bottom: 0;
  position: absolute;
  left: 0;
  width: calc(100% - 30px);
`

export const SliderLabel = styled(Text)<SliderLabelProps>`
  bottom: 0;
  font-size: 12px;
  left: ${({ progress }) => progress};
  position: absolute;
  text-align: center;
  min-width: 24px; // Slider thumb size
`

export const BunnyButt = styled.div<DisabledProp>`
  background: url(${bunnyButt}) no-repeat;
  height: 32px;
  filter: ${({ disabled }) => (disabled ? 'grayscale(100%)' : 'none')};
  position: absolute;
  width: 15px;
`

export const BunnySlider = styled.div`
  position: absolute;
  width: 100%;
`

export const StyledInput = styled.input<StyledInputProps>`
  cursor: ${getCursorStyle};
  height: 32px;
  position: relative;

  ::-webkit-slider-thumb {
    ${getBaseThumbStyles}
  }

  ::-moz-range-thumb {
    ${getBaseThumbStyles}
  }

  ::-ms-thumb {
    ${getBaseThumbStyles}
  }
`

export const BarBackground = styled.div<DisabledProp>`
  background-color: rgba(255, 255, 255, 0.3);
  height: 4px;
  position: absolute;
  top: 18px;
  width: 100%;
  border-radius: 6px;
`

export const BarProgress = styled.div<DisabledProp>`
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  filter: ${({ disabled }) => (disabled ? 'grayscale(100%)' : 'none')};
  height: 8px;
  position: absolute;
  top: 16px;
  border-radius: 6px;
`
