import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getAddress } from 'utils/addressHelpers'
import { getBscScanLink } from 'utils'
import BigNumber from "bignumber.js";
import { FarmWithStakedValue } from '../../Cards/FarmCard'
import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import Apr, { AprProps } from '../Apr'
import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'
import {Box, Flex, Grid, useMatchBreakpoints, LinkExternal, Text} from "../../../../../uikit";
import {CalculatorIcon, ContractIcon, InfoIcon} from "../../../icons";
import {getBalanceAmount} from "../../../../../utils/formatBalance";
import {BIG_ZERO} from "../../../../../utils/bigNumber";
import {formatAmount} from "../../../../Swap/utils/formatInfoNumbers";

export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
  userDataReady: boolean
  account?: string
  tftPrice?: BigNumber
  expanded: boolean
}

const expandAnimation = keyframes`
  from {
    max-height: 0;
  }
  to {
    max-height: 500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0;
  }
`

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: rgba(0, 0, 0, 0.15);
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0;
`

const CardsGrid = styled(Grid)`
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 13px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`
const Card = styled(Flex)`
  width: 100%;
  height: 140px;
  flex-direction: column;
  padding-top: 30px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;

  @media (max-width: 968px) {
    height: 100px;
    align-items: center;
    justify-content: center;
    padding-top: 0;
  }
`
const CardTitle = styled(Text)`
  font-weight: 600;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  margin-left: 30px;

  @media (max-width: 968px) {
    margin-left: 0;
  }
`

const WhiteText = styled(Text)`
  font-weight: 500;
  font-size: 24px;
  color: #FFFFFF;
`

const LinksGrid = styled(Grid)`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  margin-top: 18px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`
const LinkContainer = styled(Flex)`
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const Row = styled(Flex)`
  width: 100%;
  height: 35px;
  align-items: center;
  justify-content: space-between;
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  apr,
  multiplier,
  liquidity,
  userDataReady,
  account,
  tftPrice,
  expanded
}) => {
  const farm = details

  const { t } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const { quoteToken, token } = farm
  const { earnings } = farm.userData || {}
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(tftPrice).toNumber() : 0

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('TBCC', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const lpAddress = getAddress(farm.lpAddresses)

  return (
    <Container expanded={expanded}>
      <CardsGrid>
        <Card style={{flexDirection: isSmall ? 'row' : 'column', justifyContent: isSmall ? 'space-between' : 'flex-start'}}>
          <Flex flexDirection='column' ml={isSmall ? '20px' : '0'}>
            <CardTitle>
              {t('VUL EARNED')}
            </CardTitle>
            {
              isSmall ? (
                <WhiteText>
                  {formatAmount(earningsBusd)}
                </WhiteText>
              ) : null
            }
          </Flex>
          <Flex
            alignItems='center'
            justifyContent='space-between'
            px={isSmall ? '0' :'30px'}
            mt={isSmall ? '0' :'5px'}
            mr={isSmall ? '20px' : '0'}>
            {
              !isSmall ? (
                <WhiteText>
                  {formatAmount(earningsBusd)}
                </WhiteText>
              ) : null
            }
            <Box width='100px'>
              <HarvestAction {...farm} userDataReady={userDataReady} />
            </Box>
          </Flex>
        </Card>
        <Card style={{height: isSmall ? '120px' : '140px'}}>
          <CardTitle width={isSmall ? '100%' : 'auto'} px={isSmall ? '30px' : '0'}>
            {t('START FARMING')}
          </CardTitle>
          <Box width='100%' px='30px'>
            <StakedAction {...farm} lpLabel={lpLabel} displayApr={apr.value} />
          </Box>
        </Card>
      </CardsGrid>
      {
        isSmall &&
        <Flex width='100%' flexDirection='column' mt='23px'>
          <Row>
            <Flex>
              <Text fontSize='13px' fontWeight='400' color='rgba(255, 255, 255, 0.6)'>APR</Text>
              <CalculatorIcon ml='8px'/>
            </Flex>
            <Apr {...apr} />
          </Row>
          <Row>
            <Flex>
              <Text fontSize='13px' fontWeight='400' color='rgba(255, 255, 255, 0.6)'>
                {t('Liquidity')}
              </Text>
              <InfoIcon ml='5px'/>
            </Flex>
            <Liquidity {...liquidity} />
          </Row>
          <Row>
            <Flex>
              <Text fontSize='13px' fontWeight='400' color='rgba(255, 255, 255, 0.6)'>
                {t('Multiplier')}
              </Text>
              <InfoIcon ml='5px'/>
            </Flex>
            <Multiplier {...multiplier} />
          </Row>
        </Flex>
      }
      <LinksGrid>
        <LinkContainer>
          <LinkExternal
            href={`/add/${liquidityUrlPathParts}`}
            color='#FFF'
            fontWeight='500'
            fontSize='14px'
          >
            {t('Get %symbol%', { symbol: lpLabel })}
          </LinkExternal>
        </LinkContainer>
        <LinkContainer
          style={
            !isSmall
              ? {borderLeft: '1px solid rgba(255, 255, 255, 0.1)', borderRight: '1px solid rgba(255, 255, 255, 0.1)'}
              : {borderTop: '1px solid rgba(255, 255, 255, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}
          }>
          <LinkExternal
            href={getBscScanLink(lpAddress, 'address')}
            fontWeight='500'
            fontSize='14px'
            color='#FFF'
          >
            {t('View Contract')}
          </LinkExternal>
          <ContractIcon ml='5px'/>
        </LinkContainer>
        {/* <LinkContainer> */}
        {/*  <LinkExternal color='#FFF' fontWeight='500' fontSize='14px'> */}
        {/*    {t('See Pair Info')} */}
        {/*  </LinkExternal> */}
        {/* </LinkContainer> */}
      </LinksGrid>
    </Container>
  )
}

export default ActionPanel
