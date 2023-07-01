import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import Page from 'components/Layout/Page'
import { Text, Flex, useMatchBreakpoints } from '../../uikit'
import tokens from '../../config/constants/tokens'
import LiquidCardDiscWallet from "./components/LiquidCardDiscWallet";

export const LiquidityBackground = styled.div<{isMobile?: boolean}>`
  width: 100%;
  background-image: ${({isMobile}) => isMobile ? 'url(/images/decorations/LiqudityMobileBG.png)' : 'url(/images/decorations/LiqudityBackground.png)'} ;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

export default function Pool() {

  const navigate = useHistory()
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const currencyIdA: string = tokens[Object.keys(tokens).filter((token) => tokens[token].symbol === 'USDT')[0]].address
  const currencyIdB: string = tokens[Object.keys(tokens).filter((token) => tokens[token].symbol === 'TBCC')[0]].address

  return (
    <LiquidityBackground isMobile={isMobile}>
      <Page style={{padding: '15px'}}>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          mt="23px"
          >
          {account
            ? navigate.push(`/add/${currencyIdA}/${currencyIdB}`)
            :  <LiquidCardDiscWallet/>
          }

          {isMobile ? null
            : <Flex
              width='510px'
              mt='30px'>
              <Text
                fontSize = '14px'
                color='#78809C'
                textAlign='center'>
                {t('By adding liquidity, you will receive 0.17% of all trades on this pair in proportion to your share in the pool. Commissions are added to the pool, accumulated in real time and can be earned by withdrawing your liquidity.')}
              </Text>
            </Flex>
          }
        </Flex>
      </Page>
    </LiquidityBackground>
  )
}
