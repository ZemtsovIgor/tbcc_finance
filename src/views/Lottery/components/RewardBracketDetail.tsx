import React from 'react'
import styled from "styled-components";
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import {usePriceTBCCBusd} from 'state/farms/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { Flex, Skeleton, Text } from '../../../uikit'

const AccumulationCard = styled(Flex)`
  width: 220px;
  height: 130px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 12px;
`

interface RewardBracketDetailProps {
  tbccAmount: BigNumber
  rewardBracket?: number
  isBurn?: boolean
  isLoading?: boolean
}

const RewardBracketDetail: React.FC<RewardBracketDetailProps> = ({
  rewardBracket,
  tbccAmount,
  isBurn,
  isLoading,
}) => {
  const { t } = useTranslation()
  const tbccPriceBusd = usePriceTBCCBusd()

  const getRewardText = () => {
    const numberMatch = rewardBracket + 1
    if (isBurn) {
      return t('Burn')
    }
    if (rewardBracket === 5) {
      return t('Match all %numberMatch%', { numberMatch })
    }
    return t('Match first %numberMatch%', { numberMatch })
  }

  return (
    <AccumulationCard>
      {isLoading ? (
        <Skeleton mb="4px" mt="8px" height={16} width={80} />
      ) : (
        <Text fontSize='15px' fontWeight='500' color={isBurn ? '#FF4FAE' : '#FFF'}>
          {getRewardText()}
        </Text>
      )}
      <>
        {isLoading || tbccAmount.isNaN() ? (
          <Skeleton my="4px" mr="10px" height={20} width={110} />
        ) : (
          <Text fontSize='28px' fontWeight='600' color='#FFF'>
            {getBalanceNumber(tbccAmount).toLocaleString('en-EN', {maximumFractionDigits: 2})}
            &nbsp;
            <span style={{fontSize: '22px'}}>TBCC</span>
          </Text>
        )}
        {isLoading || tbccAmount.isNaN() ? (
          <>
            <Skeleton mt="4px" mb="16px" height={12} width={70} />
          </>
        ) : (
          <Text fontSize='14px' fontWeight='400' color='rgba(255, 255, 255, 0.45)'>
            ~${getBalanceNumber(tbccAmount.times(tbccPriceBusd)).toLocaleString('en-EN', {maximumFractionDigits: 2})}
          </Text>
        )}
      </>
    </AccumulationCard>
  )
}

export default RewardBracketDetail
