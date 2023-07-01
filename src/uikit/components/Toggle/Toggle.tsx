import React from 'react'
import styled from "styled-components";
import { Flex } from '../Box'
import StyledToggle, { Input, Handle } from './StyledToggle'
import { ToggleProps, scales } from './types'
import {Text} from "../Text";

const SelectInput = styled(Input)`
  background: #E5E5E5;

  &:focus:not(:disabled) {
    box-shadow: none;
  }

  &:hover {
    box-shadow: none;
  }

  &.toggle-lottery-button {
    background: #E7E8F4;
    margin: 0;
    border: 0;
    outline: 0;
    padding: 0;
  }
`

const Toggle: React.FC<ToggleProps> = ({
  checked,
  defaultColor = 'input',
  checkedColor = 'success',
  scale = scales.LG,
  startIcon,
  endIcon,
  startText,
  endText,
  className,
  ...props
}) => {
  const isChecked = !!checked

  return (
    <StyledToggle $checked={isChecked} $checkedColor={checkedColor} $defaultColor={defaultColor} scale={scale} className={className} 
      style={{background: isChecked ? 'linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%)' : 'rgba(255, 255, 255, 0.05)',
      border: isChecked ? 'none' : '1px solid rgba(255, 255, 255, 0.09)'}}>
      <SelectInput checked={checked} scale={scale} {...props} type="checkbox" className={className} />
      {startIcon && endIcon ? (
        <>
          <Handle scale={scale}>
            <Flex height="100%" alignItems="center" justifyContent="center">
              {checked ? endIcon(checked) : startIcon(!checked)}
            </Flex>
          </Handle>
          <Flex width="100%" height="100%" justifyContent="space-around" alignItems="center">
            {startIcon()}
            {endIcon()}
          </Flex>
        </>
      ) : startText && endText ? (
        <>
          <Handle scale={scale} className={className}>
            <Flex height="100%" alignItems="center" justifyContent="center">
              <Text
                color="#FFFFFF"
                textAlign="center"
                fontWeight="600"
                fontSize="12px"
                lineHeight="47px"
                textTransform="uppercase"
                mt="15px"
                mb="15px"
              >
                {checked ? endText : startText }
              </Text>
            </Flex>
          </Handle>
          <Flex width="100%" height="100%" justifyContent="space-around" alignItems="center">
            <Text
              color="rgba(82, 82, 99, 0.7)"
              textAlign="center"
              fontWeight="600"
              fontSize="12px"
              lineHeight="47px"
              textTransform="uppercase"
              mt="15px"
              mb="15px"
            >
              {startText}
            </Text>
            <Text color="rgba(82, 82, 99, 0.7)" textAlign="center" fontWeight="600" fontSize="12px" lineHeight="47px" textTransform="uppercase" mt="15px" mb="15px">
              {endText}
            </Text>
          </Flex>
        </>
      ) : (
        <Handle scale={scale} style={{background: isChecked ? '#FFF' : 'rgba(255, 255, 255, 0.15)', top: isChecked ? '4px' : ''}}/>
      )}
    </StyledToggle>
  )
}

export default Toggle
