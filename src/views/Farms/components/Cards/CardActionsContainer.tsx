import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { getAddress } from 'utils/addressHelpers'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { DeserializedFarm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useERC20 } from 'hooks/useContract'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { Flex, Text, Box, useMatchBreakpoints } from '../../../../uikit'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'
import useApproveFarm from '../../hooks/useApproveFarm'
import {CustomBtn} from "../Table/ExpandedRow";
import {formatAmount} from "../../../Swap/utils/formatInfoNumbers";

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
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  account?: string
  addLiquidityUrl?: string
  tftPrice?: BigNumber
  lpLabel?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, account, addLiquidityUrl, tftPrice, lpLabel }) => {
  const { t } = useTranslation()
  const {isMobile, isTablet} = useMatchBreakpoints()
  const isSmall = isMobile || isTablet
  const { toastError } = useToast()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses } = farm
  const { allowance, tokenBalance, stakedBalance, earnings } = farm.userData || {}
  const lpAddress = getAddress(lpAddresses)
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const dispatch = useAppDispatch()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(tftPrice).toNumber() : 0


  const lpContract = useERC20(lpAddress)

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

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={farm.lpSymbol}
        pid={pid}
        apr={farm.apr}
        lpLabel={lpLabel}
        tftPrice={tftPrice}
        addLiquidityUrl={addLiquidityUrl}
      />
    ) : (
      <CustomBtn
        mt="8px"
        width="100%"
        disabled={requestedApproval}
        onClick={handleApprove}
      >
        {t('Enable Contract')}
      </CustomBtn>
    )
  }

  return (
    <>
      <CardRow style={{marginTop: '16px'}}>
        <Flex flexDirection='column'>
          <Text fontWeight='600' fontSize='13px' color='rgba(255, 255, 255, 0.4)'>
            TBCC {t('EARNED')}
          </Text>
          <Text fontWeight='400' fontSize='20px' color='rgba(255, 255, 255, 0.25)'>
            {formatAmount(earningsBusd)}
          </Text>
        </Flex>
        <HarvestAction earnings={earnings} pid={pid} />
      </CardRow>
      {/* <CardRow style={{marginTop: '15px'}}> */}
      {/*  <Flex flexDirection='column'> */}
      {/*    <Text fontWeight='600' fontSize='13px' color='rgba(255, 255, 255, 0.4)'> */}
      {/*      {t('YIELD BOOSTER')} */}
      {/*    </Text> */}
      {/*    <Text fontWeight='500' fontSize='20px' color="#FFF"> */}
      {/*      {t('Up to')}&nbsp;2x */}
      {/*    </Text> */}
      {/*  </Flex> */}

      {/*  <CustomBtn style={{width: '111px'}}> */}
      {/*    {t('Go to Pool')} */}
      {/*  </CustomBtn> */}
      {/* </CardRow> */}
      {/* <Disclaimer style={{ */}
      {/*  borderRadius: '6px', */}
      {/*  marginTop: '2px', */}
      {/*  margin: isSmall ? '0 20px' : '0 30px', */}
      {/*  width: isSmall ? 'calc(100% - 40px)' : 'calc(100% - 60px)'}}> */}
      {/*  <InfoIcon mr='8px'/> */}
      {/*  <Text fontSize='13px' fontWeight='400' color='rgba(255, 255, 255, 0.35)'> */}
      {/*    {t('Lock VUL to activate yield booster')} */}
      {/*  </Text> */}
      {/* </Disclaimer> */}
      <Text
        fontSize='13px'
        fontWeight='600'
        color='rgba(255, 255, 255, 0.4)'
        m={isSmall ? '20px 0 10px 20px' :'20px 0 10px 30px'}
      >
        {farm.lpSymbol} {t('STAKED')}
      </Text>
      <Box width='calc(100% -60px)' px={isSmall ? '20px' : '30px'}>
        {!account ? <ConnectWalletButton mt="8px" width="100%" /> : renderApprovalOrStakeButton()}
      </Box>
    </>

  )
}

export default CardActions
