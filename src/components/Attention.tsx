import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Text }from '../uikit'

const Container = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  position: relative;
  top: 0;
  background: #009688;
`

const Attention = () => {

  const { t } = useTranslation()

  return (
    <Container>
      <Text fontSize='14px' fontWeight='400' color='#FFF'>
        {t('The alpha version of TBCC FINANCE has been launched')}
      </Text>
    </Container>
  )
}

export default Attention
