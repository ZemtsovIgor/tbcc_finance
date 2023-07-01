import React from 'react'
import styled from 'styled-components'
import { Card } from '../../uikit'

export const BodyWrapper = styled(Card)<{ maxWidth?: string, boxShadow?: string}>`
  max-width: ${({ maxWidth }) => maxWidth || '436px'};
  width: 100%;
  z-index: 1;
  box-shadow: ${({ boxShadow }) => boxShadow || null};
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, maxWidth, boxShadow }: { children: React.ReactNode, maxWidth?: string, boxShadow?: string }) {
  return <BodyWrapper maxWidth={maxWidth} boxShadow={boxShadow}>{children}</BodyWrapper>
}
