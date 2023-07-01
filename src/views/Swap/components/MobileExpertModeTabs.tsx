import React from "react";
import styled from "styled-components";
import { useTranslation } from "../../../contexts/Localization";
import { Flex, Grid } from "../../../uikit";

const TabsContainer = styled(Grid)`
  width: 100%;
  height: 45px;
  grid-template-columns: repeat(3, 1fr);
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  position: relative;
  z-index: 10;
`
const TabItem = styled(Flex)<{ isActive?: boolean }>`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 15px;
  color: ${({isActive}) => isActive ? '#FFF' : 'rgba(255, 255, 255, 0.45)'};
  background: ${({isActive}) => isActive ? 'linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%)' : 'transparent'};
  border-radius: 6px;
  transition: 300ms;
`

export const MobileExpertModeTabs = ({activeIndex, setActiveIndex}) => {

  const {t} = useTranslation()

  return (
    <TabsContainer>
      <TabItem
        onClick={() => setActiveIndex(0)}
        isActive={activeIndex === 0}>
        {t('Market')}
      </TabItem>
      <TabItem
        onClick={() => setActiveIndex(1)}
        isActive={activeIndex === 1}>
        {t('Swap')}
      </TabItem>
      <TabItem
        onClick={() => setActiveIndex(2)}
        isActive={activeIndex === 2}>
        {t('History')}
      </TabItem>
    </TabsContainer>
  )
}
