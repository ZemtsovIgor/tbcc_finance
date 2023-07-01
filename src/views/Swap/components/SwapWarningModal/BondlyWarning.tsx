import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Text } from '../../../../uikit'

const BondlyWarning = () => {
  const { t } = useTranslation()

  return <Text>{t('Warning: BONDLY has been compromised. Please remove liquidity until further notice.')}</Text>
}

export default BondlyWarning
