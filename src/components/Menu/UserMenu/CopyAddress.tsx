import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Box, CopyIcon, Flex, FlexProps, IconButton } from '../../../uikit'

interface CopyAddressProps extends FlexProps {
  account: string,
  mobileVersion?: boolean,
}

const Wrapper = styled(Flex)<{ mobileVersion?: boolean}>`
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #E5E5E5;
  box-sizing: border-box;
  border-radius: 4px;
  position: ${({ mobileVersion }) => (mobileVersion ? 'initial' : 'relative')};
  padding: 14px 15px 14px 0;
`

const Address = styled.div`
  flex: 1;
  position: relative;
  padding-left: 16px;

  & > input {
    background: transparent;
    border: 0;
    color: #505050;
    font-size: 15px;
    line-height: 16px;
    display: block;
    padding: 0;
    width: 100%;

    &:focus {
      outline: 0;
    }
  }
`

const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  padding: 8px;
  top: -38px;
  right: 0;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.contrast};
  color: ${({ theme }) => theme.colors.invertedContrast};
  border-radius: 16px;
  opacity: 0.7;
  width: 100px;
`

const CopyAddress: React.FC<CopyAddressProps> = ({ mobileVersion, account, ...props }) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)
  const { t } = useTranslation()

  const copyAddress = () => {
    if (navigator.clipboard && navigator.permissions) {
      navigator.clipboard.writeText(account).then(() => displayTooltip())
    } else if (document.queryCommandSupported('copy')) {
      const ele = document.createElement('textarea')
      ele.value = account
      document.body.appendChild(ele)
      ele.select()
      document.execCommand('copy')
      document.body.removeChild(ele)
      displayTooltip()
    }
  }

  function displayTooltip() {
    setIsTooltipDisplayed(true)
    setTimeout(() => {
      setIsTooltipDisplayed(false)
    }, 1000)
  }

  return (
    <Box position={mobileVersion ? 'initial' : 'relative'} {...props}>
      <Wrapper mobileVersion={mobileVersion}>
        <Address title={account}>
          <input type="text" readOnly value={account} />
        </Address>
        <IconButton variant="text" onClick={copyAddress} style={{ height: '16px', position: mobileVersion ? 'absolute' : 'initial', top: mobileVersion ? '20px' : 'initial', right: mobileVersion ? '19px' : 'initial' }}>
          <CopyIcon color="primary" width="14px" />
        </IconButton>
      </Wrapper>
      <Tooltip isTooltipDisplayed={isTooltipDisplayed}>{t('Copied')}</Tooltip>
    </Box>
  )
}

export default CopyAddress
