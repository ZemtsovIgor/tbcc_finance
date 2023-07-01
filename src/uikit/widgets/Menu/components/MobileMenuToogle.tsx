import React from 'react'
import styled from 'styled-components'
import { Button } from '../../../components/Button'
import Flex from '../../../components/Box/Flex'

interface Props {
  isActive: boolean
  onMobileMenuToogle: (isActive: boolean) => void
  loggedIn: boolean
}

const StyledButton = styled(Button)<{ isActive: boolean, loggedIn?: boolean }>`
  background: none;
  display: block;
  position: relative;
  -webkit-user-select: none;
  user-select: none;
  z-index: 1;
  width: 34px;
  height: 34px;
  padding: 0;
  margin-right: ${({ loggedIn }) => loggedIn ? '10px' : '6px'};
  opacity: 1 !important;
  box-shadow: none;

  .wrap {
    display: flex;
    flex-direction: column;
    width: 20px;
    height: 20px;
    z-index: 2;
    margin: 0 auto;
  }

  span {
    display: flex;
    width: 20px;
    height: 2px;
    margin-bottom: 4px;
    position: relative;
    background: #505050;
    border-radius: 4px;
    z-index: 1;
    transform-origin: 5px 0px;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      opacity 0.55s ease;

    &:first-child {
      transform-origin: 0% 0%;
    }

    &:last-child {
      transform-origin: 0% 100%;
    }
  }

  &.active {
    & span {
      opacity: 1;
      transform: rotate(-45deg) translate(1px, 5px);

      &:nth-last-child(3) {
        opacity: 1;
        transform: rotate(45deg) translate(4px, -2px);
        background: #505050;
      }

      &:nth-last-child(2) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }
    }
  }
`

const MobileMenuToogle: React.FC<Props> = ({ isActive, onMobileMenuToogle, loggedIn }) => {
  const handleButtonClick = () => {
    onMobileMenuToogle(!isActive)
  }

  return (
    <Flex>
      <StyledButton onClick={handleButtonClick} isActive={isActive} loggedIn={loggedIn} className={isActive ? 'active' : ''}>
        <div className="wrap">
          <span />
          <span />
          <span />
        </div>
      </StyledButton>
    </Flex>
  )
}

export default React.memo(
  MobileMenuToogle,
  (prev, next) => prev.isActive === next.isActive && prev.onMobileMenuToogle === next.onMobileMenuToogle,
)
