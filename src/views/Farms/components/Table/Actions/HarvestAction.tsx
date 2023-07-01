import React, { useState } from 'react'
import styled from "styled-components";
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import useHarvestFarm from '../../../hooks/useHarvestFarm'
import { FarmWithStakedValue } from '../../Cards/FarmCard'
import {StyledBtn} from "../../../../Swap/styles";

export const CustomBtn = styled(StyledBtn)`
  height: 45px;
  width: 100%;
  padding: 0;
  &:disabled {
    background: rgba(255, 255, 255, 0.25);
    color: rgba(255, 255, 255, 0.25);
  }
`

interface HarvestActionProps extends FarmWithStakedValue {
  userDataReady: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({ pid, userData, userDataReady }) => {
  const { toastSuccess, toastError } = useToast()
  const earningsBigNumber = new BigNumber(userData.earnings)
  let earnings = BIG_ZERO

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestFarm(pid)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  return (
    <CustomBtn
      disabled={earnings.eq(0) || pendingTx || !userDataReady}
      onClick={async () => {
        setPendingTx(true)
        try {
          await onReward()
          toastSuccess(
            `${t('Harvested')}!`,
            t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'VUL' }),
          )
        } catch (e) {
          toastError(
            t('Error'),
            t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
          )
          console.error(e)
        } finally {
          setPendingTx(false)
        }
        dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
      }}
      ml="4px"
    >
      {pendingTx ? t('Harvesting') : t('Harvest')}
    </CustomBtn>
  )
}

export default HarvestAction
