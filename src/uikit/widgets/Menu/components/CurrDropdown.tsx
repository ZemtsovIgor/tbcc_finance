import React, { useState } from "react";
import styled from 'styled-components';
import {  BinanceChainIcon } from "../../../components/Svg";
import useMatchBreakpoints from "../../../hooks/useMatchBreakpoints";
import { Text } from '../../../components/Text'

const Card = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.0875);
    cursor: pointer;
    transition: 200ms;
`
const Header = styled.div<{isMobile?: boolean}>`
	display: flex;
	align-items: center;
  justify-content: center;
  width: 100%;
  color: #FFF;
  font-weight: 600;
  font-size: 14px;
  padding: ${({isMobile}) => isMobile ? '0 5px' : '0 12px'} ;
  height: ${({isMobile}) => isMobile ? '34px' : '45px'} ;
`
const CardBody = styled.div<{isMobile?: boolean}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #FFF;
  font-weight: 600;
  font-size: 14px;
  padding: ${({isMobile}) => isMobile ? '10px 5px' : '16px 12px'};
  transition: 200ms; 
`
const CardBodyitem = styled.div`
  display: flex;
	align-items: center;
  justify-content: flex-start;
`

interface CurrDropdownProps {
  initialOpenState?: boolean
}

export const CurrDropdown: React.FC<CurrDropdownProps> = ({ initialOpenState }) => {

  const { isMobile, isTablet } = useMatchBreakpoints()
  const [isOpen, setIsOpen] = useState(initialOpenState)

  // const toggleOpen = () => {
  //   setIsOpen(!isOpen)
  // }

  React.useEffect(() => {
    document.addEventListener("click", () => setIsOpen(false), { passive: true });
    // remove event on unmount to prevent a memory leak
    return () => document.removeEventListener("click", () => setIsOpen(false));
  })

  return (
    <Card onClick={(e) => e.stopPropagation()}>
      <Header isMobile={isTablet || isMobile}>
        <BinanceChainIcon mr={isTablet || isMobile ? '3px' : '10px'}/>
        {!isTablet && !isMobile && <Text fontSize='14px' fontWeight='600' color='#FFF'>Binance</Text>}
        {/* <ArrowDownIcon/> */}
      </Header>
      {isOpen &&
        <CardBody isMobile={isTablet || isMobile}>
          <CardBodyitem >
            <BinanceChainIcon mr='12px'/>
            {!isTablet && !isMobile && <Text fontSize='14px' fontWeight='600' color='#FFF'>Binance</Text>}
          </CardBodyitem>
        </CardBody>
      }
    </Card>
  )
}
