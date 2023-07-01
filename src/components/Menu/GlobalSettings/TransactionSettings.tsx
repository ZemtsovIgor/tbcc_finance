import React, { useState } from 'react'
import { escapeRegExp } from 'utils'
import { useTranslation } from 'contexts/Localization'
import { useUserSlippageTolerance, useUserTransactionTTL } from 'state/user/hooks'
import styled from "styled-components";
import { Text, Button, Input, Flex, Box, useMatchBreakpoints, InfoTBCCIcon } from '../../../uikit'

enum SlippageError {
  InvalidInput = 'InvalidInput',
  RiskyLow = 'RiskyLow',
  RiskyHigh = 'RiskyHigh',
}

enum DeadlineError {
  InvalidInput = 'InvalidInput',
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

const ButtonContainer = styled(Flex)<{ isMobile: boolean }>`
  flex-wrap: wrap;
  width: ${({ isMobile }) => isMobile ? 'calc(100% - 2px)' : ''};
  background: transparent;
  border: none;
  overflow: hidden;
`

const SelectButton = styled(Button)<{ isActive: boolean, isMobile: boolean }>`
  font-weight: 600;
  font-size: 15px;
  background: ${({ isActive }) => isActive ? 'linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${({ isActive }) => isActive ? '#FFF' : 'rgba(255, 255, 255, 0.45)'};
  border: ${({ isActive }) => isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.09)'};
  height: ${({ isMobile }) => isMobile ? '50px' : '47px'};
  padding: ${({ isMobile }) => isMobile ? '0 8px' : '0 18px'};
  border-radius: 6px;
  margin-right: 20px;
  
  &:last-child {
    flex-grow: 1;
    margin-right: 0;
  }
`

const SelectInput = styled(Input)<{ isMobile: boolean }>`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 6px;
  box-shadow: none;
  font-size: 15px;
  font-weight: 600;
  color: #FFF;
  flex: 1 1 0;
  height: ${({ isMobile }) => isMobile ? '50px' : '47px'};

  &:focus:not(:disabled) {
    box-shadow: none;
  }
`

const SlippageTabs = () => {
  const [userSlippageTolerance, setUserSlippageTolerance] = useUserSlippageTolerance()
  const [ttl, setTtl] = useUserTransactionTTL()
  const [slippageInput, setSlippageInput] = useState('')
  const [customInput, setCustomInput] = useState(userSlippageTolerance !== 10 && userSlippageTolerance !== 50 && userSlippageTolerance !== 10)
  const [deadlineInput, setDeadlineInput] = useState('')

  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const slippageInputIsValid =
    slippageInput === '' || (userSlippageTolerance / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2)
  const deadlineInputIsValid = deadlineInput === '' || (ttl / 60).toString() === deadlineInput

  let slippageError: SlippageError | undefined
  if (slippageInput !== '' && !slippageInputIsValid) {
    slippageError = SlippageError.InvalidInput
  } else if (slippageInputIsValid && userSlippageTolerance < 50) {
    slippageError = SlippageError.RiskyLow
  } else if (slippageInputIsValid && userSlippageTolerance > 500) {
    slippageError = SlippageError.RiskyHigh
  } else {
    slippageError = undefined
  }

  let deadlineError: DeadlineError | undefined
  if (deadlineInput !== '' && !deadlineInputIsValid) {
    deadlineError = DeadlineError.InvalidInput
  } else {
    deadlineError = undefined
  }

  const parseCustomSlippage = (value: string) => {
    if (value === '' || inputRegex.test(escapeRegExp(value))) {
      setSlippageInput(value)

      try {
        const valueAsIntFromRoundedFloat = Number.parseInt((Number.parseFloat(value) * 100).toString())
        if (!Number.isNaN(valueAsIntFromRoundedFloat) && valueAsIntFromRoundedFloat < 5000) {
          setUserSlippageTolerance(valueAsIntFromRoundedFloat)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const parseCustomDeadline = (value: string) => {
    setDeadlineInput(value)

    try {
      const valueAsInt: number = Number.parseInt(value) * 60
      if (!Number.isNaN(valueAsInt) && valueAsInt > 0) {
        setTtl(valueAsInt)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" mb={isMobile ? '25px' : '28px'}>
        <Flex mb="12px">
          <Text fontSize={isMobile ? '15px' : '14px'} lineHeight="16px" color="rgba(255, 255, 255, 0.45)">{t('Slippage Tolerance')}</Text>
          <InfoTBCCIcon ml='10px'/>
        </Flex>
        <ButtonContainer isMobile={isMobile}>
          <SelectButton
            onClick={() => {
              setSlippageInput('')
              setCustomInput(false)
              setUserSlippageTolerance(10)
            }}
            isActive={userSlippageTolerance === 10}
            isMobile={isMobile}
          >
            0.1%
          </SelectButton>
          <SelectButton
            onClick={() => {
              setSlippageInput('')
              setCustomInput(false)
              setUserSlippageTolerance(50)
            }}
            isActive={userSlippageTolerance === 50}
            isMobile={isMobile}
          >
            0.5%
          </SelectButton>
          <SelectButton
            onClick={() => {
              setSlippageInput('')
              setCustomInput(false)
              setUserSlippageTolerance(100)
            }}
            isActive={userSlippageTolerance === 100}
            isMobile={isMobile}
          >
            1.0%
          </SelectButton>
          {
            customInput ? (
              <Flex alignItems="center" flex="1 1 0" 
              // padding={isMobile ? '0 8px' : '0 24px'}
              >
                <Box width="100%">
                  <SelectInput
                    scale="sm"
                    inputMode="decimal"
                    isMobile={isMobile}
                    pattern="^[0-9]*[.,]?[0-9]{0,2}$"
                    placeholder={(userSlippageTolerance / 100).toFixed(2)}
                    value={slippageInput}
                    onBlur={() => {
                      parseCustomSlippage((userSlippageTolerance / 100).toFixed(2))
                    }}
                    onChange={(event) => {
                      if (event.currentTarget.validity.valid) {
                        parseCustomSlippage(event.target.value.replace(/,/g, '.'))
                      }
                    }}
                    isWarning={!slippageInputIsValid}
                    isSuccess={![10, 50, 100].includes(userSlippageTolerance)}
                    style={{border: 0}}
                  />
                </Box>
              </Flex>
            ) : (
              <SelectButton
                onClick={() => {
                  setCustomInput(true)
                }}
                isActive={slippageInput === 'custom'}
                isMobile={isMobile}
              >
                {t('Specify')}
              </SelectButton>
            )
          }
        </ButtonContainer>
        {!!slippageError && (
          <Text fontSize={isMobile ? '15px' : '14px'} color={slippageError === SlippageError.InvalidInput ? 'red' : '#F3841E'} mt="8px">
            {slippageError === SlippageError.InvalidInput
              ? t('Enter a valid slippage percentage')
              : slippageError === SlippageError.RiskyLow
              ? t('Your transaction may fail')
              : t('Your transaction may be frontrun')}
          </Text>
        )}
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start" mb={isMobile ? '25px' : '28px'}>
        <Flex alignItems="center" mb="11px">
          <Text fontSize={isMobile ? '15px' : '14px'} lineHeight="16px" color="rgba(255, 255, 255, 0.45)">{t('Tx deadline (mins)')}</Text>
          <InfoTBCCIcon ml='10px'/>
        </Flex>
        <Flex>
          <Box width="293px">
            <SelectInput
              scale="sm"
              isMobile={isMobile}
              inputMode="numeric"
              pattern="^[0-9]+$"
              color={deadlineError ? 'red' : undefined}
              onBlur={() => {
                parseCustomDeadline((ttl / 60).toString())
              }}
              placeholder={(ttl / 60).toString()}
              value={deadlineInput}
              onChange={(event) => {
                if (event.currentTarget.validity.valid) {
                  parseCustomDeadline(event.target.value)
                }
              }}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SlippageTabs
