import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import {useTranslation} from "../../../contexts/Localization";
import { Flex, useMatchBreakpoints} from "../../../uikit";
import {PATHS} from "../../../config/paths";

const TabItem = styled(Flex)<{isActive?: boolean}>`
  padding: 13px 20px;
  background: ${({isActive}) => isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border: ${({isActive}) => isActive ? '1px solid rgba(255, 255, 255, 0.09)' : 'none'};
  color: ${({isActive}) => isActive ? '#FFF' : 'rgba(255, 255, 255, 0.45)'};
  font-weight: 600;
  font-size: 15px;
  margin-right: 10px;
  border-radius: 12px;
  cursor: pointer;

  @media (max-width: 968px) {
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`
const TabsContainer = styled(Flex)`
  width:100%;
  position: relative;
  z-index: 100;
  margin-top: 37px;
  margin-left: 300px;
  
  @media (max-width: 968px) {
    padding: 0 15px;
    margin-left: 0;
    margin-top: 90px;
  }
`
const tabs = [
  {
    title: 'GAME',
    href: PATHS.GAME_MAIN
  },
  {
    title: 'STATS',
    href: PATHS.GAME_STATS
  },
  {
    title: 'BONUSES',
    href: PATHS.GAME_BONUSES
  },
  {
    title: 'RULES',
    href: PATHS.GAME_RULES
  }
]

interface TabsProps {
  activeIndex: number
}

const SubPagesTabs:React.FC<TabsProps> = ({activeIndex}) => {

  const { t } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  return (
    <TabsContainer>
      {tabs.slice(0, isSmall ? 2 : 4).map((tab, index) => {
        return (
          <Link to={tab.href} key={tab.title} style={{flexGrow: isSmall ? '1' : '0'}}>
            <TabItem isActive={activeIndex === index}>
              {t(tab.title)}
            </TabItem>
          </Link>
        )
      })}
    </TabsContainer>
  );
};

export default SubPagesTabs;
