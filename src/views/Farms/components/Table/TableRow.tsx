import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFarmUser } from 'state/farms/hooks'
import {useTranslation} from "../../../../contexts/Localization";
import {Flex, Text, ChevronUpSecondIcon, useMatchBreakpoints} from "../../../../uikit";
import {ResponsiveGrid} from "../../style";
import {ChevronDownIcon} from "../../icons";
import Apr, { AprProps } from './Apr'
import Farm, { FarmProps } from './Farm'
import Earned, { EarnedProps } from './Earned'
import Multiplier, { MultiplierProps } from './Multiplier'
import Liquidity, { LiquidityProps } from './Liquidity'
import { FarmWithStakedValue } from '../Cards/FarmCard'
import ActionPanel from "./Actions/ActionPanel";

export const CoreCard = styled(Flex)`
  width: 58px;
  height: 29px;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  border-radius: 6px;
  margin-right: 15px;

  @media (max-width: 968px) {
    margin-right: 0;
  }
`
export const RaisedCard = styled(CoreCard)`
  width: 70px;
  background: linear-gradient(77.9deg, #20C997 -3.83%, #33EAB4 110.36%);
  margin-right: 0;

  @media (max-width: 968px) {
    margin-left: 15px;
  }
`
export const WhiteText = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  color: #FFFFFF;
`
export const GreenText = styled(WhiteText)`
  color: #20C997;
`

export interface RowProps {
  apr: AprProps
  farm: FarmProps
  earned: EarnedProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
}

interface RowPropsWithLoading extends RowProps {
  userDataReady: boolean
}

const TableRow: React.FunctionComponent<RowPropsWithLoading> = (props) => {
  const { details, userDataReady } = props

  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  const hasStakedAmount = !!useFarmUser(details.pid).stakedBalance.toNumber()
  const [actionPanelExpanded, setActionPanelExpanded] = useState(hasStakedAmount)
  const { t } = useTranslation()

  const toggleActionPanel = () => {
    setActionPanelExpanded(!actionPanelExpanded)
  }

  useEffect(() => {
    setActionPanelExpanded(hasStakedAmount)
  }, [hasStakedAmount])

  return (
    <>
      {
        isSmall ? (
          <Flex flexDirection='column' p='22px 19px' onClick={toggleActionPanel}>
            {/* eslint-disable-next-line react/destructuring-assignment */}
            <Farm {...props.farm} />

            <Flex alignItems='flex-end' mt='20px'>
              <Flex flexDirection='column'>
                <Text fontSize='13px' fontWeight='400' color='rgba(255, 255, 255, 0.6)'>
                  {t('Earned')}
                </Text>
                {/* eslint-disable-next-line react/destructuring-assignment */}
                <Earned {...props.earned} userDataReady={userDataReady} />
              </Flex>
              <Flex flexDirection='column' ml='30px'>
                <Text fontSize='13px' fontWeight='400' color='rgba(255, 255, 255, 0.6)'>
                  {t('APR')}
                </Text>
                <Text fontSize='16px' fontWeight='500' color='rgba(255, 255, 255, 0.6)'>
                  {/* eslint-disable-next-line react/destructuring-assignment */}
                  <Apr {...props.apr} />
                </Text>
              </Flex>
              <Flex ml='auto' >
                <Text fontSize='14px' fontWeight='400' color={actionPanelExpanded ? '#FFF' : 'rgba(255, 255, 255, 0.6)'} mr='5px'>
                  {t('Details')}
                </Text>
                {
                  actionPanelExpanded
                    ? <ChevronUpSecondIcon opacity='0.4'/>
                    : <ChevronDownIcon/>
                }
              </Flex>
            </Flex>
          </Flex>
        ) : (
          <ResponsiveGrid style={{cursor: 'pointer', height: '90px'}} onClick={toggleActionPanel}>
            {/* eslint-disable-next-line react/destructuring-assignment */}
            <Farm {...props.farm} />
            {/* eslint-disable-next-line react/destructuring-assignment */}
            <Earned {...props.earned} userDataReady={userDataReady} />
            <Flex alignItems='center'>
              {/* eslint-disable-next-line react/destructuring-assignment */}
              <Apr {...props.apr} />
            </Flex>
            {/* eslint-disable-next-line react/destructuring-assignment */}
            <Liquidity {...props.liquidity} />
            {/* eslint-disable-next-line react/destructuring-assignment */}
            <Multiplier {...props.multiplier} />
            {
              actionPanelExpanded
                ? <ChevronUpSecondIcon opacity='0.4'/>
                : <ChevronDownIcon/>
            }
          </ResponsiveGrid>
        )
      }

      <ActionPanel {...props} expanded={actionPanelExpanded} />
    </>
  )
}

export default TableRow

