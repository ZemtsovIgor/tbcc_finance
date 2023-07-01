import React from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import Flex from '../../../components/Box/Flex'
import { LogoWithTextIcon } from '../../../components/Svg'

interface Props {
  onlyIcon: boolean
  href: string
}

const blink = keyframes`
  0%,  100% { transform: scaleY(1); } 
  50% { transform:  scaleY(0.1); } 
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;

  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    display: flex;
    align-items: center;

    p {
      font-style: normal;
      font-weight: 300;
      font-size: 24px;
      line-height: 24px;
      margin-left: 5px;
      color: #505050;

      span {
        font-weight: 500;
      }
    }
  }
  .right-eye {
    animation-delay: 20ms;
  }
  &:hover {
    .left-eye,
    .right-eye {
      transform-origin: center 60%;
      animation-name: ${blink};
      animation-duration: 350ms;
      animation-iteration-count: 1;
    }
  }
`

const Logo: React.FC<Props> = ({ onlyIcon, href }) => {
  const isAbsoluteUrl = href.startsWith('http')
  const innerLogo = (
    <>
      <LogoWithTextIcon className="desktop-icon" onlyIcon={onlyIcon} />
    </>
  )

  return (
    <Flex>
      {isAbsoluteUrl ? <StyledLink to={href}>{innerLogo}</StyledLink> : <StyledLink to={href}>{innerLogo}</StyledLink>}
    </Flex>
  )
}

export default React.memo(Logo, (prev, next) => prev.onlyIcon === next.onlyIcon)
