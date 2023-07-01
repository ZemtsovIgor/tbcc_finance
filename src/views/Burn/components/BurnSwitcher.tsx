import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { PATHS } from 'config/paths'
import { useTranslation } from 'contexts/Localization'
import {Flex, useMatchBreakpoints} from '../../../uikit'

interface Props {
  isActiveTab?: string
}

const NavTabsContainer = styled(Flex)<{isMobile?: boolean}>`
  display: flex;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-right: ${({ isMobile }) => isMobile ? '15px' : ''};
`
const NavTabsItem = styled(Flex)<{isactive?: string}>`
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  border-radius: 6px;
  color: ${({isactive}) => isactive === 'true' ? '#FFF' : 'rgba(255, 255, 255, 0.45)'};
  background: ${({isactive}) => isactive === 'true' ? 'linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%)' : 'transparent'};
`

const BurnSwitcher: React.FC<Props> = ({ isActiveTab }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  return (
    <NavTabsContainer isMobile={isMobile}>
      <NavTabsItem as={Link} to={PATHS.BURN} isactive={`${isActiveTab === 'Burn'}`}>
        {t('Burn')}
      </NavTabsItem>
      <NavTabsItem as={Link} to={PATHS.BURN_RATING} isactive={`${isActiveTab === 'Rating'}`}>
        {t('Rating')}
      </NavTabsItem>
    </NavTabsContainer>
  )
}

export default BurnSwitcher
