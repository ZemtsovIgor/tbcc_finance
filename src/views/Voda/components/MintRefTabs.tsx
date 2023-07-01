import React from "react";
import styled from "styled-components";
import { useTranslation } from "../../../contexts/Localization";
import { Flex, Text, useMatchBreakpoints } from "../../../uikit";

const TabItem = styled(Text)<{isActive?: boolean}>`
  font-weight: 800;
  font-size: 24px;
  color: ${({isActive}) => isActive ? '#505050': 'rgba(255, 255, 255, 0.4)'};
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  background: ${({isActive}) => isActive ? 'linear-gradient(77.9deg,#DB00FF -3.83%,#2C5EE0 110.36%)' : 'rgba(255, 255, 255, 0.4)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media (max-width: 968px) {
    font-size: 16px;
  }
`

interface MintRefTabsProps {
  activeTab: number,
  setActiveTab: (e: number) => void
}

export const MintRefTabs = ({activeTab, setActiveTab}: MintRefTabsProps) => {

  const { t } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  return (
    <Flex>
      <TabItem
        isActive={activeTab === 0}
        onClick={() => setActiveTab(0)}
        mr={isSmall ? '30px' :'40px'}
      >
        {isSmall ? t('Mint') : `${t('Mint a')} Fellow`}
      </TabItem>
      <TabItem
        isActive={activeTab === 1}
        onClick={() => setActiveTab(1)}
      >
        {t('referral')}
      </TabItem>
    </Flex>
  )
}
