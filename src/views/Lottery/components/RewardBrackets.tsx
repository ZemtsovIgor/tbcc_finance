import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { BIG_ZERO } from 'utils/bigNumber'
import { useTranslation } from 'contexts/Localization'
import { LotteryRound } from 'state/types'
import { Flex, Text } from '../../../uikit'
import RewardBracketDetail from './RewardBracketDetail'
import {HorizontalLine} from "../style";

const Wrapper = styled(Flex)`
  flex-direction: column;
`

const RewardsInner = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 20px;
`

interface RewardMatchesProps {
  lotteryNodeData: LotteryRound
}

interface RewardsState {
  isLoading: boolean
  tbccToBurn: BigNumber
  rewardsLessTreasuryFee: BigNumber
  rewardsBreakdown: string[]
  countWinnersPerBracket: string[]
}

const RewardBrackets: React.FC<RewardMatchesProps> = ({ lotteryNodeData }) => {
  const { t } = useTranslation()
  const [state, setState] = useState<RewardsState>({
    isLoading: true,
    tbccToBurn: BIG_ZERO,
    rewardsLessTreasuryFee: BIG_ZERO,
    rewardsBreakdown: null,
    countWinnersPerBracket: null,
  })

  useEffect(() => {
    if (lotteryNodeData) {
      const { treasuryFee, amountCollectedInTBCC, rewardsBreakdown, countWinnersPerBracket } = lotteryNodeData

      const feeAsPercentage = new BigNumber(treasuryFee).div(1000)
      const tbccToBurn = feeAsPercentage.div(100).times(new BigNumber(amountCollectedInTBCC))
      const amountLessTreasuryFee = new BigNumber(amountCollectedInTBCC).minus(tbccToBurn)
      setState({
        isLoading: false,
        tbccToBurn,
        rewardsLessTreasuryFee: amountLessTreasuryFee,
        rewardsBreakdown,
        countWinnersPerBracket,
      })
    } else {
      setState({
        isLoading: true,
        tbccToBurn: BIG_ZERO,
        rewardsLessTreasuryFee: BIG_ZERO,
        rewardsBreakdown: null,
        countWinnersPerBracket: null,
      })
    }
  }, [lotteryNodeData])

  const getTBCCRewards = (bracket: number) => {
    const shareAsPercentage = new BigNumber(state.rewardsBreakdown[bracket]).div(100)
    return state.rewardsLessTreasuryFee.div(100).times(shareAsPercentage)
  }

  const { isLoading, tbccToBurn } = state

  const rewardBrackets = [0, 1, 2, 3, 4, 5]

  return (
    <Wrapper>
      <Text
        fontSize='15px'
        fontWeight='400'
        color='rgba(255, 255, 255, 0.6)'
        textAlign='center'
        my='30px'
      >
        {t('Match the winning number in the same order to share prizes. Current prizes up for grabs')}:
      </Text>
      <RewardsInner>
        {rewardBrackets.map((bracketIndex) => (
          <RewardBracketDetail
            key={bracketIndex}
            rewardBracket={bracketIndex}
            tbccAmount={!isLoading && getTBCCRewards(bracketIndex)}
            isLoading={isLoading}
          />
        ))}
        <RewardBracketDetail rewardBracket={0} tbccAmount={tbccToBurn} isBurn isLoading={isLoading} />
      </RewardsInner>
      <HorizontalLine mt='45px'/>
    </Wrapper>
  )
}

export default RewardBrackets
