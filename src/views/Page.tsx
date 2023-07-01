import React from 'react'
import styled from 'styled-components'
import { PageMeta } from 'components/Layout/Page'
import { useMatchBreakpoints } from '../uikit'
import Background from './Mint/components/Background'

const StyledPage = styled.div<{ $removePadding: boolean; isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: #101428;
  align-items: center;
  margin: 0 auto;
  width: 100vw;
  /* padding: ${({ isMobile }) => (isMobile ? '23px 16px' : '26px 42px')}; */
  padding-bottom: 0;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  color: #FFF;
`

const Page: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { removePadding?: boolean; hideFooterOnDesktop?: boolean }
> = ({ children, removePadding = false, ...props }) => {
  const { isMobile } = useMatchBreakpoints()

  return (
    <>
      <PageMeta />
      <StyledPage $removePadding={removePadding} isMobile={isMobile} {...props}>
      <Background/>
        {children}
        {/* <Footer /> */}
      </StyledPage>
    </>
  )
}

export default Page
