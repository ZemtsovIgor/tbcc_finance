import React, {useState} from "react";
import BigNumber from 'bignumber.js'
import styled from "styled-components";
import { DeserializedFarm } from 'state/types'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getAddress } from 'utils/addressHelpers'
import { getBscScanLink } from 'utils'
import {useTranslation} from "../../../../contexts/Localization";
import {Flex, Box, Text, LinkExternal, useMatchBreakpoints, Skeleton} from "../../../../uikit";
import {WhiteText, CoreCard, RaisedCard} from "../Table/TableRow";
import {CurrencyLogo} from "../../../../components/Logo";
import {ChevronDownIcon, ContractIcon} from "../../icons";
import ChevronUpSecond from "../../../../uikit/components/Svg/Icons/ChevronUpSecond";
import {PATHS} from "../../../../config/paths";
import CardActionsContainer from './CardActionsContainer'
import ApyButton from "./ApyButton";
import {ViewMode} from "../../../../state/user/actions";

const Card = styled(Flex)`
  position: relative;
  overflow: hidden;
  width: 100%;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  padding-top: 20px;
`

const MultiplierCard = styled(Flex)`
  width: 48px;
  height: 29px;
  font-size: 13px;
  font-weight: 600;
  color: #FFF;
  border-radius: 6px;
  position: relative;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 6px;
    border: 2px solid transparent;
    background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%) border-box;
    mask: linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;

  }
`
const SecondaryText = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
`
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin-top: 25px;
`
const LogoContainer1 = styled(Box)`
  transform: translate(-11px, 9px);
`
const LogoContainer2 = styled(Box)`
  transform: translateY(-18px);
`
const DetailsCard = styled(Flex)`
  position: absolute;
  bottom: 46px;
  left: 0;
  width: 100%;
  height: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.01);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`
const LinkContainer = styled(Flex)`
  width: calc(100% - 60px);
  height: 45px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 6px;
  margin-bottom: 20px;
  cursor: pointer;
`
const StyledLink = styled(LinkExternal)`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  color: #FFFFFF;
`

const CardRow = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  margin: 9px 0;

  @media (max-width: 968px) {
    padding: 0 20px;
  }
`

export interface FarmWithStakedValue extends DeserializedFarm {
  apr?: number
  lpRewardsApr?: number
  liquidity?: BigNumber
}

interface FarmCardProps {
  farm: FarmWithStakedValue
  displayApr: string
  removed: boolean
  tftPrice?: BigNumber
  account?: string
  viewMode: ViewMode
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, displayApr, removed, tftPrice, account, viewMode }) => {

  const {t} = useTranslation()
  const {isMobile, isTablet} = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const totalValueFormatted =
    farm.liquidity && farm.liquidity.gt(0)
      ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })}`
      : ''

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('TBCC', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : t('VUL + Fees')

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  })
  const addLiquidityUrl = `${PATHS.ADD_LIQUIDITY}/${liquidityUrlPathParts}`
  const lpAddress = getAddress(farm.lpAddresses)

  return (
    <Card>
      <Flex justifyContent='space-between' px={isSmall ? '20px' : '30px'}>
        <Flex flexDirection='column'>
          <Text fontSize='20px' fontWeight='400' color='#FFF'>
            {farm.token.symbol}/{farm.quoteToken.symbol}
          </Text>
          <Flex mt='7px'>
            {farm.isCommunity ? (
              <CoreCard>Core</CoreCard>
            ) : null}

            {
              farm.multiplier ? (
                <RaisedCard style={{marginRight: '9px'}}>Raised</RaisedCard>
              ) : null
            }

            {
              farm.multiplier ? (
                <MultiplierCard>{farm.multiplier}</MultiplierCard>
              ) : (
                <Skeleton ml="4px" width={48} height={29} />
              )
            }

          </Flex>
        </Flex>
        <Flex flexDirection='column'>
          <LogoContainer1>
            <CurrencyLogo currency={farm.token} style={{height: '32px', width: 'auto'}}/>
          </LogoContainer1>
          <LogoContainer2>
            <CurrencyLogo currency={farm.quoteToken} size='45px'/>
          </LogoContainer2>
        </Flex>
      </Flex>
      {!removed && (
        <CardRow style={{marginTop: '17px'}}>
          <SecondaryText>
            {t('APR')}:
          </SecondaryText>
          <Flex>
            {farm.apr ? (
              <ApyButton
                pid={farm.pid}
                lpSymbol={farm.lpSymbol}
                lpLabel={lpLabel}
                multiplier={farm.multiplier}
                tftPrice={tftPrice}
                apr={farm.apr}
                displayApr={displayApr}
                addLiquidityUrl={addLiquidityUrl}
                viewMode={viewMode}
              />
              ) : (
                <Skeleton height={24} width={80} />
              )
            }
          </Flex>
        </CardRow>
      )}
      <CardRow>
        <SecondaryText>
          {t('Liquidity')}:
        </SecondaryText>
        {totalValueFormatted ? <WhiteText>{totalValueFormatted}</WhiteText> : <Skeleton width={75} height={25} />}
      </CardRow>
      <CardRow>
        <SecondaryText>
          {t('Earn')}:
        </SecondaryText>
        <WhiteText>{earnLabel}</WhiteText>
      </CardRow>
      <Box width='100%' style={{filter: showExpandableSection && 'blur(30px)'}}>
        <CardActionsContainer
          farm={farm}
          lpLabel={lpLabel}
          account={account}
          tftPrice={tftPrice}
          addLiquidityUrl={addLiquidityUrl}
        />
      </Box>
      {
        showExpandableSection ? (
          <DetailsCard>
            <LinkContainer>
              {!removed && (
                <LinkExternal
                  href={addLiquidityUrl}
                >
                  {t('Get %symbol%', { symbol: lpLabel })}
                </LinkExternal>
              )}
            </LinkContainer>
            <LinkContainer>
              <StyledLink
                href={getBscScanLink(lpAddress, 'address')}
              >
                {t('View Contract')}
                <ContractIcon ml='5px'/>
              </StyledLink>
            </LinkContainer>
            {/* <LinkContainer style={{marginBottom: '0'}}> */}
            {/*  <LinkExternal */}
            {/*    color='#FFF' */}
            {/*    fontSize='14px' */}
            {/*    fontWeight='500' */}
            {/*    href={`/info/pool/${lpAddress}`} */}
            {/*  > */}
            {/*    {t('See Pair Info')} */}
            {/*  </LinkExternal> */}
            {/* </LinkContainer> */}
          </DetailsCard>
        ) : null
      }
      <Line/>
      <Flex style={{cursor: 'pointer'}} justifyContent='center' alignItems='center' height='45px' onClick={() => setShowExpandableSection(!showExpandableSection)}>
        <Text fontSize='13px' fontWeight='600' color={showExpandableSection ? '#FFF' :'rgba(255, 255, 255, 0.4)'}>
          {t('DETAILS')}
        </Text>
        {
          showExpandableSection
          ? <ChevronUpSecond ml='8px'/>
          : <ChevronDownIcon ml='8px'/>
        }
      </Flex>
    </Card>
  )
}

export default FarmCard
