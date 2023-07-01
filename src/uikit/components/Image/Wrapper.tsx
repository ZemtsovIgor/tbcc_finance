import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { space } from 'styled-system'
import { WrapperProps } from './types'

const StyledWrapper = styled.div<{ $width: number | string; $height: number | string }>`
  max-height: ${({ $height }) => $height};
  max-width: ${({ $width }) => $width};
  position: relative;
  width: 100%;

  &:after {
    content: '';
    display: block;
    padding-top: ${({ $width, $height }) => (Number($height) / Number($width)) * 100}%;
  }

  ${space}
`

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(({ width, height, ...props }, ref) => {
  return <StyledWrapper ref={ref} $width={width} $height={height} {...props} />
})

export default Wrapper
