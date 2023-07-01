import React from 'react'
import { Token } from '../../../../sdk'
import {CurrencyLogo} from "../../../../components/Logo";
import {Box, Flex, useMatchBreakpoints} from "../../../../uikit";
import {CoreCard, RaisedCard, WhiteText} from "./TableRow";

export interface FarmProps {
  multiplier: string
  isCommunity: boolean
  token: Token
  quoteToken: Token
}

const Farm: React.FunctionComponent<FarmProps> = ({ token, quoteToken, multiplier, isCommunity }) => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  return (
    <>
      {
        isSmall ? (
          <Flex width='100%' alignItems='center'>
            <CurrencyLogo currency={token}/>
            <Box width='2px'/>
            <CurrencyLogo currency={quoteToken}/>
            <WhiteText ml='10px'>
              {token?.symbol}/{quoteToken?.symbol}
            </WhiteText>
            <Flex ml='auto'>
              {isCommunity ? (
                <CoreCard>Core</CoreCard>
              ) : null}

              {
                multiplier ? (
                  <RaisedCard style={{marginRight: '9px'}}>Raised</RaisedCard>
                ) : null
              }
            </Flex>
          </Flex>
        ) : (
          <>
            <Flex alignItems='center'>
              <CurrencyLogo currency={token}/>
              <Box width='2px'/>
              <CurrencyLogo currency={quoteToken}/>
              <WhiteText ml='10px'>
                {token?.symbol}/{quoteToken?.symbol}
              </WhiteText>
            </Flex>
            <Flex>
              {isCommunity ? (
                <CoreCard>Core</CoreCard>
              ) : null}

              {
                multiplier ? (
                  <RaisedCard style={{marginRight: '9px'}}>Raised</RaisedCard>
                ) : null
              }
            </Flex>
          </>
        )
      }
    </>

  )
}

export default Farm
