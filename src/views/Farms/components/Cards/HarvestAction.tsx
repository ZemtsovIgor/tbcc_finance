import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import useToast from 'hooks/useToast'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { useWeb3React } from '@web3-react/core'
import useHarvestFarm from '../../hooks/useHarvestFarm'
import {CustomBtn} from "../Table/ExpandedRow";

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const { account } = useWeb3React()
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestFarm(pid)
  const dispatch = useAppDispatch()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO

  return (
    <CustomBtn
      disabled={rawEarningsBalance.eq(0) || pendingTx}
      style={{width: '111px'}}
      onClick={async () => {
        setPendingTx(true)
        try {
          await onReward()
          toastSuccess(
            `${t('Harvested')}!`,
            t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'VAL' }),
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
    >
      {pendingTx ? t('Harvesting') : t('Harvest')}
    </CustomBtn>
  )
}

export default HarvestAction
