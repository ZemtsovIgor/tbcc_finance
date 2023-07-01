import React, { useCallback, useEffect } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import styled from 'styled-components'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import { Currency, ETHER, TokenAmount } from '../../sdk'
import Page from '../Page'
import {
  Button,
  Flex,
  IconButton,
  ArrowBackIcon,
  Box,
  Heading,
  Text,
  useMatchBreakpoints,
} from '../../uikit'
import { AppDispatch } from '../../state'
import { AutoColumn } from '../../components/Layout/Column'
import { RowBetween } from '../../components/Layout/Row'

import { ROUTER_ADDRESS } from '../../config/constants'
import { PairState } from '../../hooks/usePairs'
import { useCurrency } from '../../hooks/Tokens'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import { Field, resetMintState } from '../../state/mint/actions'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../state/mint/hooks'

import { useTransactionAdder } from '../../state/transactions/hooks'
import { useGasPrice, useUserSlippageTolerance } from '../../state/user/hooks'
import { calculateGasMargin, calculateSlippageAmount, getRouterContract } from '../../utils'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { wrappedCurrency } from '../../utils/wrappedCurrency'
import Dots from '../../components/Loader/Dots'
import { currencyId } from '../../utils/currencyId'
import PoolPriceBar from './PoolPriceBar'
import {LiquidityBackground} from "../Pool";
import LiqudityCurrencyInput from "./components/LiqudityCurrencyInput";


const Wrapper = styled.div`
  position: relative;
  padding: 0;
  background-color: transparent;
  width: 100%;
`

const AddingLiqudityCard = styled(Flex)<{isMobile?: boolean}>`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  margin: ${({isMobile}) => isMobile ? '70px auto 0 auto' : '200px auto 0 auto'};
  padding: ${({isMobile}) => isMobile ? '25px 10px' : '34px 41px 48px 41px'};
  width: ${({isMobile}) => isMobile ? '100%' : '550px'};
  position: relative;
  z-index: 10;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.09);
`
const StyledBtn = styled(Button)<{onClick?, disabled?: boolean, width?: string, variant?: any}>`
  border-radius: 6px;
  height: 55px;
  cursor: pointer;
  background: ${({disabled}) => disabled ? 'rgba(255, 255, 255, 0.35) !important' : 'linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%)'} ;
`

export default function AddLiquidity({
  match: {
    params: { currencyIdA, currencyIdB },
  },
  history,
}: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string }>) {
  const { account, chainId, library } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const gasPrice = useGasPrice()

  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)

  useEffect(() => {
    if (!currencyIdA && !currencyIdB) {
      dispatch(resetMintState())
    }
  }, [dispatch, currencyIdA, currencyIdB])

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  const isValid = !error

  // txn values
  const deadline = useTransactionDeadline() // custom from users settings
  const [allowedSlippage] = useUserSlippageTolerance() // custom from users

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {},
  )

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], ROUTER_ADDRESS)
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], ROUTER_ADDRESS)

  const addTransaction = useTransactionAdder()

  async function onAdd() {
    if (!chainId || !library || !account) return
    const router = getRouterContract(chainId, library, account)

    const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = parsedAmounts
    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !deadline) {
      return
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? 0 : allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? 0 : allowedSlippage)[0],
    }

    let estimate
    let method: (...args: any) => Promise<TransactionResponse>
    let args: Array<string | string[] | number>
    let value: BigNumber | null
    if (currencyA === ETHER || currencyB === ETHER) {
      const tokenBIsETH = currencyB === ETHER
      estimate = router.estimateGas.addLiquidityETH
      method = router.addLiquidityETH
      args = [
        wrappedCurrency(tokenBIsETH ? currencyA : currencyB, chainId)?.address ?? '', // token
        (tokenBIsETH ? parsedAmountA : parsedAmountB).raw.toString(), // token desired
        amountsMin[tokenBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), // token min
        amountsMin[tokenBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), // eth min
        account,
        deadline.toHexString(),
      ]
      value = BigNumber.from((tokenBIsETH ? parsedAmountB : parsedAmountA).raw.toString())
    } else {
      estimate = router.estimateGas.addLiquidity
      method = router.addLiquidity
      args = [
        wrappedCurrency(currencyA, chainId)?.address ?? '',
        wrappedCurrency(currencyB, chainId)?.address ?? '',
        parsedAmountA.raw.toString(),
        parsedAmountB.raw.toString(),
        amountsMin[Field.CURRENCY_A].toString(),
        amountsMin[Field.CURRENCY_B].toString(),
        account,
        deadline.toHexString(),
      ]
      value = null
    }
    await estimate(...args, value ? { value } : {})
      .then((estimatedGasLimit) =>
        method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
          gasPrice,
        }).then((response) => {

          addTransaction(response, {
            summary: `Add ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
              currencies[Field.CURRENCY_A]?.symbol
            } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencies[Field.CURRENCY_B]?.symbol}`,
          })

        }),
      )
      .catch((err) => {
        // we only care if the error is something _other_ than the user rejected the tx
        if (err?.code !== 4001) {
          console.error(err)
        }
      })
  }

  const handleCurrencyASelect = useCallback(
    (currencyA_: Currency) => {
      const newCurrencyIdA = currencyId(currencyA_)
      if (newCurrencyIdA === currencyIdB) {
        history.push(`/add/${currencyIdB}/${currencyIdA}`)
      } else if (currencyIdB) {
        history.push(`/add/${newCurrencyIdA}/${currencyIdB}`)
      } else {
        history.push(`/add/${newCurrencyIdA}`)
      }
    },
    [currencyIdB, history, currencyIdA],
  )
  const handleCurrencyBSelect = useCallback(
    (currencyB_: Currency) => {
      const newCurrencyIdB = currencyId(currencyB_)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          history.push(`/add/${currencyIdB}/${newCurrencyIdB}`)
        } else {
          history.push(`/add/${newCurrencyIdB}`)
        }
      } else {
        history.push(`/add/${currencyIdA || 'BNB'}/${newCurrencyIdB}`)
      }
    },
    [currencyIdA, history, currencyIdB],
  )

  const addIsUnsupported = useIsTransactionUnsupported(currencies?.CURRENCY_A, currencies?.CURRENCY_B)

  return (
    <LiquidityBackground>
      <Page style={{padding: isMobile && '0 10px'}}>
        <AddingLiqudityCard isMobile={isMobile}>

          <Flex alignItems="center" justifyContent="center" maxWidth="648px" width="100%" mb={isMobile ? '10px' : '8px'}>
            <IconButton as={Link} to="/liquidity" style={{ marginRight: 'auto'}}>
              <ArrowBackIcon width="16px" />
            </IconButton>
            <Heading fontSize={isMobile ? '24px' : '24px'} lineHeight="32px" color="#FFF" textAlign="center" mr="auto">
              {t('Adding liquidity')}
            </Heading>
          </Flex>

          <Flex alignItems="center" justifyContent="center" maxWidth="648px" width={isMobile ? '80%' : '100%'} mb={isMobile ? '0px' : '13px'}>
              <Text fontSize={isMobile ? '15px' : '16px'} color="rgba(255, 255, 255, 0.6);" textAlign={isMobile ? 'center' : 'left'}>
                {t('Add liquidity to get liquidity provider tokens.')}
              </Text>
          </Flex>

          <Flex
            flexDirection="column"
            alignItems="center"
            maxWidth="648px"
            width="100%"
            background='transparent'>
            <Flex width='100%'>
              <Wrapper id="swap-page">
                <AutoColumn gap="5px">
                  <LiqudityCurrencyInput
                    label={t('Coin 1 in the pool')}
                    value={formattedAmounts[Field.CURRENCY_A]}
                    onUserInput={onFieldAInput}
                    onMax={() => {
                      onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
                    }}
                    onCurrencySelect={handleCurrencyASelect}
                    currency={currencies[Field.CURRENCY_A]}
                    id="add-liquidity-input-tokena"
                  />
                  <LiqudityCurrencyInput
                    label={t('Coin 2 in the pool')}
                    value={formattedAmounts[Field.CURRENCY_B]}
                    onUserInput={onFieldBInput}
                    onCurrencySelect={handleCurrencyBSelect}
                    onMax={() => {
                      onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
                    }}
                    currency={currencies[Field.CURRENCY_B]}
                    id="add-liquidity-input-tokenb"
                  />
                </AutoColumn>
                <Box mt={isMobile ? '19px' : '38px'}>
                  {addIsUnsupported ? (
                    <StyledBtn disabled mb="4px">
                      {t('Unsupported Asset')}
                    </StyledBtn>
                  ) : (
                    <AutoColumn gap="md">
                      {(approvalA === ApprovalState.NOT_APPROVED ||
                        approvalA === ApprovalState.PENDING ||
                        approvalB === ApprovalState.NOT_APPROVED ||
                        approvalB === ApprovalState.PENDING) &&
                      isValid && (
                        <RowBetween>
                          {approvalA !== ApprovalState.APPROVED && (
                            <StyledBtn
                              onClick={approveACallback}
                              disabled={approvalA === ApprovalState.PENDING}
                              width={approvalB !== ApprovalState.APPROVED ? '48%' : '100%'}
                            >
                              {approvalA === ApprovalState.PENDING ? (
                                <Dots>{t('Enabling %asset%', { asset: currencies[Field.CURRENCY_A]?.symbol })}</Dots>
                              ) : (
                                t('Enable %asset%', { asset: currencies[Field.CURRENCY_A]?.symbol })
                              )}
                            </StyledBtn>
                          )}
                          {approvalB !== ApprovalState.APPROVED && (
                            <StyledBtn
                              onClick={approveBCallback}
                              disabled={approvalB === ApprovalState.PENDING}
                              width={approvalA !== ApprovalState.APPROVED ? '48%' : '100%'}
                            >
                              {approvalB === ApprovalState.PENDING ? (
                                <Dots>{t('Enabling %asset%', { asset: currencies[Field.CURRENCY_B]?.symbol })}</Dots>
                              ) : (
                                t('Enable %asset%', { asset: currencies[Field.CURRENCY_B]?.symbol })
                              )}
                            </StyledBtn>
                          )}
                        </RowBetween>
                      )}
                      <StyledBtn
                        variant={
                          !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]
                            ? 'danger'
                            : 'primary'
                        }
                        onClick={() => { onAdd() }}
                        disabled={!isValid || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED}
                      >
                        {error ?? t('Supply')}
                      </StyledBtn>
                    </AutoColumn>
                  )}
                </Box>
              </Wrapper>
            </Flex>
          </Flex>

          {
            (currencies[Field.CURRENCY_A] && currencies[Field.CURRENCY_B] && pairState !== PairState.INVALID) ? (
              <Flex flexDirection="column" alignItems="center" maxWidth="648px" width="100%">
                <PoolPriceBar
                  currencies={currencies}
                  poolTokenPercentage={poolTokenPercentage}
                  noLiquidity={noLiquidity}
                  price={price}
                />
              </Flex>
            ) : null
          }
        </AddingLiqudityCard>

      </Page>
    </LiquidityBackground>
  )
}
