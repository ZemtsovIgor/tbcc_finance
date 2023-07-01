import React from 'react'
import styled from 'styled-components'
import {useTable, ColumnType, Flex, Text, Box, useMatchBreakpoints, useTooltip} from '../../../../uikit'
import Row, { RowProps } from './TableRow'
import {useTranslation} from "../../../../contexts/Localization";
import { InfoIcon } from "../../icons";
import { ResponsiveGrid } from "../../style";

const TableWrapper = styled(Flex)`
  flex-direction: column;
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  margin-top: 44px;
  margin-bottom: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.12);
`
const ColumnHeader = styled(Flex)`
  font-weight: 400;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  align-items: center;
`
const BreakLine = styled(Box)`
  width: 100%;
  height: 1px;
  background: #D9D9D9;
  opacity: 0.05;
`

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
export const WhiteText = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  color: #FFFFFF;
`
export const GreenText = styled(WhiteText)`
  color: #20C997;
`
const ReferenceElement = styled.div`
  display: inline-block;
`

export interface ITableProps {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
  userDataReady: boolean
  sortColumn?: string
}

const FarmTable: React.FC<ITableProps> = (props) => {
  const { data, columns, userDataReady } = props

  const { t } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet


  const { rows } = useTable(columns, data, { sortable: true, sortColumn: 'farm' })

  const tooltipLiquidityContent = t('Total value of the funds in this farm’s liquidity pool');

  const tooltipMultiplierContent = (
    <>
      <Text>
        {t(
          'The Multiplier represents the proportion of VUL rewards each farm receives, as a proportion of the VUL produced each block.',
        )}
      </Text>
      <Text my="24px">
        {t('For example, if a 1x farm received 1 VUL per block, a 10x farm would receive 10 VUL per block.')}
      </Text>
      <Text>{t('This amount is already included in all APR calculations for the farm.')}</Text>
    </>
  )

  const liquidityTooltip = useTooltip(tooltipLiquidityContent, {
    placement: 'top-end',
    tooltipOffset: [20, 10],
  })

  const multiplierTooltip = useTooltip(tooltipMultiplierContent, {
    placement: 'top-end',
    tooltipOffset: [20, 10],
  })

  return (
    <TableWrapper>
      {!isSmall &&
        <ResponsiveGrid style={{background: 'rgba(255, 255, 255, 0.05)'}}>
          <ColumnHeader>
            {t('Pair')}
          </ColumnHeader>
          <ColumnHeader/>
          <ColumnHeader>
            {t('Earned')}
          </ColumnHeader>
          <ColumnHeader>
            {t('APR')}
          </ColumnHeader>
          <ColumnHeader>
            {t('Liquidity')}
            <ReferenceElement ref={liquidityTooltip.targetRef}>
              <InfoIcon ml='5px'/>
            </ReferenceElement>
          </ColumnHeader>
          <ColumnHeader>
            {t('Multiplier')}
            <ReferenceElement ref={multiplierTooltip.targetRef}>
              <InfoIcon ml='5px'/>
            </ReferenceElement>
          </ColumnHeader>
          <ColumnHeader/>
        </ResponsiveGrid>
      }
      {rows.map((row, index) => {
        return (
          <div key={`table-row-${index + 1}`}>
            <Row {...row.original} userDataReady={userDataReady}  />
            {index !== rows.length - 1 && <BreakLine  />}
          </div>
        )
      })}
      {liquidityTooltip.tooltipVisible && liquidityTooltip.tooltip}
      {multiplierTooltip.tooltipVisible && multiplierTooltip.tooltip}
    </TableWrapper>
  )
}

export default FarmTable
