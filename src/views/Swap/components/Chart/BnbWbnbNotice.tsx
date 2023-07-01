import { Flex, Text } from '../../../../uikit'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { StyledPriceChart } from './styles'

const BnbWbnbNotice: React.FC = () => {
  const { t } = useTranslation()
  return (
    <StyledPriceChart p="24px">
      <Flex justifyContent="center" alignItems="center" height="100%" flexDirection="column">
        <Text mb={['8px', '8px', '0px']} textAlign="center">
          {t('You can swap WBNB for BNB (and vice versa) with no trading fees.')}
        </Text>
        <Text mb={['8px', '8px', '0px']} textAlign="center">
          {t('Exchange rate is always 1 to 1.')}
        </Text>
      </Flex>
    </StyledPriceChart>
  )
}

export default BnbWbnbNotice
