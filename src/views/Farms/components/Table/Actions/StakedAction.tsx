import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useWeb3React } from '@web3-react/core'
import { useFarmUser, useLpTokenPrice, usePriceCakeBusd } from 'state/farms/hooks'
import { fetchFarmUserDataAsync } from 'state/farms'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useERC20 } from 'hooks/useContract'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { useAppDispatch } from 'state'
import { getAddress } from 'utils/addressHelpers'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { useModal } from '../../../../../uikit'
import { FarmWithStakedValue } from '../../Cards/FarmCard'
import useUnstakeFarms from '../../../hooks/useUnstakeFarms'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import useStakeFarms from '../../../hooks/useStakeFarms'
import useApproveFarm from '../../../hooks/useApproveFarm'
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
interface StackedActionProps extends FarmWithStakedValue {
  lpLabel?: string
  displayApr?: string
}

const Staked: React.FunctionComponent<StackedActionProps> = ({
  pid,
  apr,
  multiplier,
  lpSymbol,
  lpLabel,
  lpAddresses,
  quoteToken,
  token,
  displayApr,
}) => {
  const { t } = useTranslation()
  const { toastError } = useToast()
  const { account } = useWeb3React()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)
  const { onStake } = useStakeFarms(pid)
  const { onUnstake } = useUnstakeFarms(pid)
  const location = useLocation()
  const lpPrice = useLpTokenPrice(lpSymbol)
  const tftPrice = usePriceCakeBusd()

  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const lpAddress = getAddress(lpAddresses)
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const handleStake = async (amount: string) => {
    await onStake(amount)
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  const handleUnstake = async (amount: string) => {
    await onUnstake(amount)
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  }

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      lpPrice={lpPrice}
      lpLabel={lpLabel}
      apr={apr}
      displayApr={displayApr}
      stakedBalance={stakedBalance}
      onConfirm={handleStake}
      tokenName={lpSymbol}
      multiplier={multiplier}
      addLiquidityUrl={addLiquidityUrl}
      tftPrice={tftPrice}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={handleUnstake} tokenName={lpSymbol} />,
  )
  const lpContract = useERC20(lpAddress)
  const dispatch = useAppDispatch()
  const { onApprove } = useApproveFarm(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
    } catch (e) {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      console.error(e)
    } finally {
      setRequestedApproval(false)
    }
  }, [onApprove, dispatch, account, pid, t, toastError])

  if (!account) {
    return (
      <ConnectWalletButton width="100%" />
    )
  }

  if (isApproved) {
    return (
      <>
        <CustomBtn
          onClick={onPresentDeposit}
          disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
        >
          {t('Stake LP')}
        </CustomBtn>

        {
          stakedBalance.eq(0) ? null : (
            <CustomBtn
              onClick={onPresentWithdraw}
            >
              {t('Withdraw LP')}
            </CustomBtn>
          )
        }
      </>
    )
  }

  return (
    <CustomBtn
      width="100%"
      disabled={requestedApproval}
      onClick={handleApprove}
    >
      {t('Enable')}
    </CustomBtn>
  )
}

export default Staked
