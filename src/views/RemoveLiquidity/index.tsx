import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { splitSignature } from '@ethersproject/bytes'
import { Contract } from '@ethersproject/contracts'
import { TransactionResponse } from '@ethersproject/providers'
import { RouteComponentProps } from 'react-router'
import { BigNumber } from '@ethersproject/bignumber'
import { useTranslation } from 'contexts/Localization'
import { Button, Text, AddIcon, ArrowDownIcon, CardBody, Slider, Box, Flex, useMatchBreakpoints, useModal } from '../../uikit'
// import { Currency, currencyEquals, ETHER, Percent, WETH } from '../../sdk'
import { Currency, ETHER, Percent } from '../../sdk'
import { AutoColumn, ColumnCenter } from '../../components/Layout/Column'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { AppHeader, AppBody } from '../../components/App'
import { RowBetween, RowFixed } from '../../components/Layout/Row'
import ConnectWalletButton from '../../components/ConnectWalletButton'

import { CurrencyLogo, DoubleCurrencyLogo } from '../../components/Logo'
import { ROUTER_ADDRESS } from '../../config/constants'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useCurrency } from '../../hooks/Tokens'
import { usePairContract } from '../../hooks/useContract'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'

import { useTransactionAdder } from '../../state/transactions/hooks'
// import StyledInternalLink from '../../components/Links'
import { calculateGasMargin, calculateSlippageAmount, getRouterContract } from '../../utils'
import { currencyId } from '../../utils/currencyId'
import useDebouncedChangeHandler from '../../hooks/useDebouncedChangeHandler'
import { wrappedCurrency } from '../../utils/wrappedCurrency'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import Dots from '../../components/Loader/Dots'
import { useBurnActionHandlers, useDerivedBurnInfo, useBurnState } from '../../state/burn/hooks'

import { Field } from '../../state/burn/actions'
import { useGasPrice, useUserSlippageTolerance } from '../../state/user/hooks'
import Page from '../Page'


const BorderCard = styled.div`
  border: solid 1px rgba(255, 255, 255, 0.09);
  border-radius: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
`
const SwitcherContainer = styled(Flex)<{isMobile?: boolean}>`
  display: flex;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`
const Switcher = styled(Flex)<{isactive?: boolean}>`
  align-items: center;
  justify-content: center;
  padding: 15px 26px;
  border-radius: 6px;
  color: ${({isactive}) => isactive  ? '#FFF' : 'rgba(255, 255, 255, 0.45)'};
  background: ${({isactive}) => isactive  ? 'linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%)' : 'transparent'};
`
const StyledBtn = styled(Button)`
  width: 85px;
  height: 45px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: #FFF;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 10px;
`
const StyledCard = styled(Box)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 12px;
  padding: 24px 22px 14px 19px;
`
const Btn = styled(Button)<{onClick?, disabled?: boolean, width?: string, variant?: any}>`
border-radius: 6px;
height: 55px;
cursor: pointer;
background: ${({disabled}) => disabled ? 'rgba(255, 255, 255, 0.35) !important' : 'linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%)'} ;
`

export default function RemoveLiquidity({
  history,
  match: {
    params: { currencyIdA, currencyIdB },
  },
}: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const [currencyA, currencyB] = [useCurrency(currencyIdA) ?? undefined, useCurrency(currencyIdB) ?? undefined]
  const { account, chainId, library } = useActiveWeb3React()
  const [tokenA, tokenB] = useMemo(
    () => [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)],
    [currencyA, currencyB, chainId],
  )

  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const gasPrice = useGasPrice()

  // burn state
  const { independentField, typedValue } = useBurnState()
  const { pair, parsedAmounts, error } = useDerivedBurnInfo(currencyA ?? undefined, currencyB ?? undefined)
  const { onUserInput: _onUserInput } = useBurnActionHandlers()
  const isValid = !error

  // modal and loading
  const [showDetailed, setShowDetailed] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState(false) // clicked confirm

  // txn values
  const [txHash, setTxHash] = useState<string>('')
  const deadline = useTransactionDeadline()
  const [allowedSlippage] = useUserSlippageTolerance()

  const formattedAmounts = {
    [Field.LIQUIDITY_PERCENT]: parsedAmounts[Field.LIQUIDITY_PERCENT].equalTo('0')
      ? '0'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].lessThan(new Percent('1', '100'))
      ? '<1'
      : parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0),
    [Field.LIQUIDITY]:
      independentField === Field.LIQUIDITY ? typedValue : parsedAmounts[Field.LIQUIDITY]?.toSignificant(6) ?? '',
    [Field.CURRENCY_A]:
      independentField === Field.CURRENCY_A ? typedValue : parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? '',
    [Field.CURRENCY_B]:
      independentField === Field.CURRENCY_B ? typedValue : parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? '',
  }

  // pair contract
  const pairContract: Contract | null = usePairContract(pair?.liquidityToken?.address)

  // allowance handling
  const [signatureData, setSignatureData] = useState<{ v: number; r: string; s: string; deadline: number } | null>(null)
  const [approval, approveCallback] = useApproveCallback(parsedAmounts[Field.LIQUIDITY], ROUTER_ADDRESS)

  async function onAttemptToApprove() {
    if (!pairContract || !pair || !library || !deadline) throw new Error('missing dependencies')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    // try to gather a signature for permission
    const nonce = await pairContract.nonces(account)

    const EIP712Domain = [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ]
    const domain = {
      name: 'TBCCFinance LPs',
      version: '1',
      chainId,
      verifyingContract: pair.liquidityToken.address,
    }
    const Permit = [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ]
    const message = {
      owner: account,
      spender: ROUTER_ADDRESS,
      value: liquidityAmount.raw.toString(),
      nonce: nonce.toHexString(),
      deadline: deadline.toNumber(),
    }
    const data = JSON.stringify({
      types: {
        EIP712Domain,
        Permit,
      },
      domain,
      primaryType: 'Permit',
      message,
    })

    library
      .send('eth_signTypedData_v4', [account, data])
      .then(splitSignature)
      .then((signature) => {
        setSignatureData({
          v: signature.v,
          r: signature.r,
          s: signature.s,
          deadline: deadline.toNumber(),
        })
      })
      .catch((err) => {
        // for all errors other than 4001 (EIP-1193 user rejected request), fall back to manual approve
        if (err?.code !== 4001) {
          approveCallback()
        }
      })
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback(
    (field: Field, value: string) => {
      setSignatureData(null)
      return _onUserInput(field, value)
    },
    [_onUserInput],
  )

  const onLiquidityInput = useCallback((value: string): void => onUserInput(Field.LIQUIDITY, value), [onUserInput])
  const onCurrencyAInput = useCallback((value: string): void => onUserInput(Field.CURRENCY_A, value), [onUserInput])
  const onCurrencyBInput = useCallback((value: string): void => onUserInput(Field.CURRENCY_B, value), [onUserInput])

  // tx sending
  const addTransaction = useTransactionAdder()
  async function onRemove() {
    if (!chainId || !library || !account || !deadline) throw new Error('missing dependencies')
    const { [Field.CURRENCY_A]: currencyAmountA, [Field.CURRENCY_B]: currencyAmountB } = parsedAmounts
    if (!currencyAmountA || !currencyAmountB) {
      throw new Error('missing currency amounts')
    }
    const router = getRouterContract(chainId, library, account)

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(currencyAmountB, allowedSlippage)[0],
    }

    if (!currencyA || !currencyB) throw new Error('missing tokens')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    const currencyBIsETH = currencyB === ETHER
    const oneCurrencyIsETH = currencyA === ETHER || currencyBIsETH

    if (!tokenA || !tokenB) throw new Error('could not wrap')

    let methodNames: string[]
    let args: Array<string | string[] | number | boolean>
    // we have approval, use normal remove liquidity
    if (approval === ApprovalState.APPROVED) {
      // removeLiquidityETH
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETH', 'removeLiquidityETHSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          deadline.toHexString(),
        ]
      }
      // removeLiquidity
      else {
        methodNames = ['removeLiquidity']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          deadline.toHexString(),
        ]
      }
    }
    // we have a signature, use permit versions of remove liquidity
    else if (signatureData !== null) {
      // removeLiquidityETHWithPermit
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETHWithPermit', 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
      // removeLiquidityETHWithPermit
      else {
        methodNames = ['removeLiquidityWithPermit']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.raw.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
    } else {
      throw new Error('Attempting to confirm without approval or a signature. Please contact support.')
    }

    const safeGasEstimates: (BigNumber | undefined)[] = await Promise.all(
      methodNames.map((methodName) =>
        router.estimateGas[methodName](...args)
          .then(calculateGasMargin)
          .catch((err) => {
            console.error(`estimateGas failed`, methodName, args, err)
            return undefined
          }),
      ),
    )

    const indexOfSuccessfulEstimation = safeGasEstimates.findIndex((safeGasEstimate) =>
      BigNumber.isBigNumber(safeGasEstimate),
    )

    // all estimations failed...
    if (indexOfSuccessfulEstimation === -1) {
      console.error('This transaction would fail. Please contact support.')
    } else {
      const methodName = methodNames[indexOfSuccessfulEstimation]
      const safeGasEstimate = safeGasEstimates[indexOfSuccessfulEstimation]

      setAttemptingTxn(true)
      await router[methodName](...args, {
        gasLimit: safeGasEstimate,
        gasPrice,
      })
        .then((response: TransactionResponse) => {
          setAttemptingTxn(false)

          addTransaction(response, {
            summary: `Remove ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
              currencyA?.symbol
            } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencyB?.symbol}`,
          })

          setTxHash(response.hash)
        })
        .catch((err: Error) => {
          setAttemptingTxn(false)
          // we only care if the error is something _other_ than the user rejected the tx
          console.error(err)
        })
    }
  }

  function modalHeader() {
    return (
      <AutoColumn gap="md">
        <RowBetween align="flex-end">
          <Text color='#101428' fontSize="24px">{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</Text>
          <RowFixed gap="4px">
            <CurrencyLogo currency={currencyA} size="24px" />
            <Text color='#101428' fontSize="24px" ml="10px">
              {currencyA?.symbol}
            </Text>
          </RowFixed>
        </RowBetween>
        <RowFixed>
          <AddIcon width="16px" />
        </RowFixed>
        <RowBetween align="flex-end">
          <Text color='#101428' fontSize="24px">{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</Text>
          <RowFixed gap="4px">
            <CurrencyLogo currency={currencyB} size="24px" />
            <Text color='#101428' fontSize="24px" ml="10px">
              {currencyB?.symbol}
            </Text>
          </RowFixed>
        </RowBetween>

        <Text color='#101428' textAlign="left" pt="12px">
          {t('Output is estimated. If the price changes by more than %slippage%% your transaction will revert.', {
            slippage: allowedSlippage / 100,
          })}
        </Text>
      </AutoColumn>
    )
  }

  function modalBottom() {
    return (
      <>
        <RowBetween>
          <Text color='#101428'>
            {t('%assetA%/%assetB% Burned', { assetA: currencyA?.symbol ?? '', assetB: currencyB?.symbol ?? '' })}
          </Text>
          <RowFixed>
            <DoubleCurrencyLogo currency0={currencyA} currency1={currencyB} margin />
            <Text color='#101428'>{parsedAmounts[Field.LIQUIDITY]?.toSignificant(6)}</Text>
          </RowFixed>
        </RowBetween>
        {pair && (
          <>
            <RowBetween>
              <Text color='#101428'>{t('Price')}</Text>
              <Text color='#101428'>
                1 {currencyA?.symbol} = {tokenA ? pair.priceOf(tokenA).toSignificant(6) : '-'} {currencyB?.symbol}
              </Text>
            </RowBetween>
            <RowBetween>
              <div />
              <Text color='#101428'>
                1 {currencyB?.symbol} = {tokenB ? pair.priceOf(tokenB).toSignificant(6) : '-'} {currencyA?.symbol}
              </Text>
            </RowBetween>
          </>
        )}
        <Btn
          disabled={!(approval === ApprovalState.APPROVED || signatureData !== null)}
          onClick={onRemove}
        >
          {t('Confirm')}
        </Btn>
      </>
    )
  }

  const liquidityPercentChangeCallback = useCallback(
    (value: number) => {
      onUserInput(Field.LIQUIDITY_PERCENT, value.toString())
    },
    [onUserInput],
  )

  // const oneCurrencyIsETH = currencyA === ETHER || currencyB === ETHER
  // const oneCurrencyIsWETH = Boolean(
  //   chainId &&
  //     ((currencyA && currencyEquals(WETH[chainId], currencyA)) ||
  //       (currencyB && currencyEquals(WETH[chainId], currencyB))),
  // )

  const handleSelectCurrencyA = useCallback(
    (currency: Currency) => {
      if (currencyIdB && currencyId(currency) === currencyIdB) {
        history.push(`/remove/${currencyId(currency)}/${currencyIdA}`)
      } else {
        history.push(`/remove/${currencyId(currency)}/${currencyIdB}`)
      }
    },
    [currencyIdA, currencyIdB, history],
  )
  const handleSelectCurrencyB = useCallback(
    (currency: Currency) => {
      if (currencyIdA && currencyId(currency) === currencyIdA) {
        history.push(`/remove/${currencyIdB}/${currencyId(currency)}`)
      } else {
        history.push(`/remove/${currencyIdA}/${currencyId(currency)}`)
      }
    },
    [currencyIdA, currencyIdB, history],
  )

  const handleDismissConfirmation = useCallback(() => {
    setSignatureData(null) // important that we clear signature data to avoid bad sigs
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.LIQUIDITY_PERCENT, '0')
    }
    setTxHash('')
  }, [onUserInput, txHash])

  const [innerLiquidityPercentage, setInnerLiquidityPercentage] = useDebouncedChangeHandler(
    Number.parseInt(parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0)),
    liquidityPercentChangeCallback,
  )

  const [onPresentRemoveLiquidity] = useModal(
    <TransactionConfirmationModal
      title={t('You will receive')}
      customOnDismiss={handleDismissConfirmation}
      attemptingTxn={attemptingTxn}
      hash={txHash || ''}
      content={() => <ConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />}
      amountA={parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? ''}
      symbolA={currencyA?.symbol ?? ''}
      amountB={parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? ''}
      symbolB={currencyB?.symbol ?? ''}
    />,
    true,
    true,
    'removeLiquidityModal',
  )

  return (
    <Page>
      <Box height='50px'/>
      <AppBody maxWidth={isMobile ? 'calc(100% - 24px)' : '550px'}>
        <AppHeader
          backTo="/liquidity"
          title={t('Remove %assetA%-%assetB% liquidity', {
            assetA: currencyA?.symbol ?? '',
            assetB: currencyB?.symbol ?? '',
          })}
          subtitle={t('To receive %assetA% and %assetB%', {
            assetA: currencyA?.symbol ?? '',
            assetB: currencyB?.symbol ?? '',
          })}
          noConfig
        />

        <CardBody style={{padding: isMobile ? '13px 15px 25px 15px' : '13px 42px 44px 43px'}}>
          <AutoColumn gap="10px">
            <RowBetween>
              <SwitcherContainer>
                <Switcher isactive={!showDetailed} onClick={() => setShowDetailed(false)}>
                  {t('Simple')}
                </Switcher>
                <Switcher isactive={showDetailed} onClick={() => setShowDetailed(true)}>
                  {t('Detailed')}
                </Switcher>
              </SwitcherContainer>
            </RowBetween>
            <Text color='rgba(255, 255, 255, 0.45)' mt='10px'>
              {t('Amount')}
            </Text>
            {!showDetailed && (
              <BorderCard>
                <Text fontSize="36px" fontWeight='600' mb="16px" style={{ lineHeight: 1 }} color='#FFF'>
                  {formattedAmounts[Field.LIQUIDITY_PERCENT]}%
                </Text>
                <Slider
                  name="lp-amount"
                  min={0}
                  max={100}
                  value={innerLiquidityPercentage}
                  onValueChanged={(value) => setInnerLiquidityPercentage(Math.ceil(value))}
                  mb="0px"
                />
                <Flex  justifyContent="space-between" mb='10px' style={{flexWrap: 'wrap'}} >
                  <StyledBtn onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '25')}>
                    25%
                  </StyledBtn>
                  <StyledBtn onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '50')}>
                    50%
                  </StyledBtn>
                  <StyledBtn onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '75')}>
                    75%
                  </StyledBtn>
                  <StyledBtn onClick={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}>
                    Max
                  </StyledBtn>
                </Flex>
              </BorderCard>
            )}
          </AutoColumn>
          {!showDetailed && (
            <>
              {/* <ColumnCenter>
                <ArrowDownIcon color="textSubtle" width="24px" my="16px" />
              </ColumnCenter> */}
              <AutoColumn gap="10px">
                <Text color="rgba(255, 255, 255, 0.45)" fontSize="16px" mt='17px'>
                  {t('You will receive')}
                </Text>
                <StyledCard>
                  <Flex justifyContent="space-between" mb="15px">
                    <Flex>
                      <CurrencyLogo currency={currencyA} />
                      <Text color="#FFF" fontSize='16px' fontWeight='600' id="remove-liquidity-tokena-symbol" ml="4px" >
                        {currencyA?.symbol}
                      </Text>
                    </Flex>
                    <Text color="#FFF" fontSize='16px' fontWeight='600'>{formattedAmounts[Field.CURRENCY_A] || '-'}</Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Flex>
                      <CurrencyLogo currency={currencyB} />
                      <Text color="#FFF" fontSize='16px' fontWeight='600' id="remove-liquidity-tokenb-symbol" ml="4px">
                        {currencyB?.symbol}
                      </Text>
                    </Flex>
                    <Text color="#FFF" fontSize='16px' fontWeight='600'>{formattedAmounts[Field.CURRENCY_B] || '-'}</Text>
                  </Flex>
                  {/* {chainId && (oneCurrencyIsWETH || oneCurrencyIsETH) ? ( */}
                  {/*  <RowBetween style={{ justifyContent: 'flex-end', fontSize: '14px', marginTop: '9px' }}> */}
                  {/*    {oneCurrencyIsETH ? ( */}
                  {/*      <StyledInternalLink */}
                  {/*        to={`/remove/${currencyA === ETHER ? WETH[chainId].address : currencyIdA}/${ */}
                  {/*          currencyB === ETHER ? WETH[chainId].address : currencyIdB */}
                  {/*        }`} */}
                  {/*      > */}
                  {/*        {t('Receive WBNB')} */}
                  {/*      </StyledInternalLink> */}
                  {/*    ) : oneCurrencyIsWETH ? ( */}
                  {/*      <StyledInternalLink */}
                  {/*        to={`/remove/${currencyA && currencyEquals(currencyA, WETH[chainId]) ? 'BNB' : currencyIdA}/${ */}
                  {/*          currencyB && currencyEquals(currencyB, WETH[chainId]) ? 'BNB' : currencyIdB */}
                  {/*        }`} */}
                  {/*      > */}
                  {/*        {t('Receive BNB')} */}
                  {/*      </StyledInternalLink> */}
                  {/*    ) : null} */}
                  {/*  </RowBetween> */}
                  {/* ) : null} */}
                </StyledCard>
              </AutoColumn>
            </>
          )}

          {showDetailed && (
            <Box mt="0px">
              <CurrencyInputPanel
                value={formattedAmounts[Field.LIQUIDITY]}
                onUserInput={onLiquidityInput}
                onMax={() => {
                  onUserInput(Field.LIQUIDITY_PERCENT, '100')
                }}
                disableCurrencySelect
                currency={pair?.liquidityToken}
                pair={pair}
                id="liquidity-amount"
                onCurrencySelect={() => null}
              />
              <ColumnCenter>
                <ArrowDownIcon width="24px" mt="27px" mb='10px'/>
              </ColumnCenter>
              <CurrencyInputPanel
                hideBalance
                value={formattedAmounts[Field.CURRENCY_A]}
                onUserInput={onCurrencyAInput}
                onMax={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}
                currency={currencyA}
                label={t('Output')}
                onCurrencySelect={handleSelectCurrencyA}
                id="remove-liquidity-tokena"
              />
              <ColumnCenter>
                <AddIcon width="18px" mt="26px" mb='8px' fill='rgba(217, 217, 217, 0.6)'/>
              </ColumnCenter>
              <CurrencyInputPanel
                hideBalance
                value={formattedAmounts[Field.CURRENCY_B]}
                onUserInput={onCurrencyBInput}
                onMax={() => onUserInput(Field.LIQUIDITY_PERCENT, '100')}
                currency={currencyB}
                label={t('Output')}
                onCurrencySelect={handleSelectCurrencyB}
                id="remove-liquidity-tokenb"
              />
            </Box>
          )}
          {pair && (
            <AutoColumn gap="10px" style={{ marginTop: '16px' }}>
              <Text color="rgba(255, 255, 255, 0.45)" fontSize="16px">
                {t('Prices')}
              </Text>
              <StyledCard style={{padding: '24px 22px 24px 19px'}}>
                <Flex justifyContent="space-between">
                  <Text color="#FFF" fontSize='16px' fontWeight='600'>
                    1 {currencyA?.symbol} =
                  </Text>
                  <Text color="#FFF" fontSize='16px' fontWeight='600'>
                    {tokenA ? pair.priceOf(tokenA).toSignificant(6) : '-'} {currencyB?.symbol}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text color="#FFF" fontSize='16px' fontWeight='600'>
                    1 {currencyB?.symbol} =
                  </Text>
                  <Text color="#FFF" fontSize='16px' fontWeight='600'>
                    {tokenB ? pair.priceOf(tokenB).toSignificant(6) : '-'} {currencyA?.symbol}
                  </Text>
                </Flex>
              </StyledCard>
            </AutoColumn>
          )}
          <Box position="relative" mt="27px">
            {!account ? (
              <ConnectWalletButton />
            ) : (
              <RowBetween>
                <Btn
                  onClick={onAttemptToApprove}
                  disabled={approval !== ApprovalState.NOT_APPROVED || signatureData !== null}
                  width="100%"
                  mr="1rem"
                >
                  {approval === ApprovalState.PENDING ? (
                    <Dots>{t('Enabling')}</Dots>
                  ) : approval === ApprovalState.APPROVED || signatureData !== null ? (
                    t('Enabled')
                  ) : (
                    t('Enable')
                  )}
                </Btn>
                <Btn
                  variant={
                    !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]
                      ? 'danger'
                      : 'primary'
                  }
                  onClick={() => {
                    onPresentRemoveLiquidity()
                  }}
                  width="100%"
                  disabled={!isValid || (signatureData === null && approval !== ApprovalState.APPROVED)}
                >
                  {error || t('Remove')}
                </Btn>
              </RowBetween>
            )}
          </Box>
        </CardBody>
      </AppBody>

      {/* {pair ? (
        <AutoColumn style={{ minWidth: '20rem', width: '100%', maxWidth: '400px', marginTop: '1rem' }}>
          <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />
        </AutoColumn>
      ) : null} */}
      {isMobile && <Box height={80}/>}
    </Page>
  )
}
