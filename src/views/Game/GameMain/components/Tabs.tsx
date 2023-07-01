import React from 'react';
import styled from "styled-components";
import _ from 'lodash'
import {useTranslation} from "../../../../contexts/Localization";
import {Flex, useMatchBreakpoints} from "../../../../uikit";

const TabItem = styled(Flex)<{isActive?: boolean}>`
  width: 88px;
  height: 36px;
  align-items: center;
  justify-content: center;
  background: ${({isActive}) => isActive ? 'linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%)' : 'transparent'} ;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  color: ${({isActive}) => isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)'};
  cursor: pointer;
`

interface TabsProps {
  selectedRound?: number,
  numberOfRound: number,
  setSelectedRound: (e) => void
}

const Tabs: React.FC<TabsProps> = ({selectedRound, numberOfRound, setSelectedRound}) => {

  const { t } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  return (
    <Flex position='relative' zIndex='10' mt={isSmall ? '25px' : '0'}>
      {_.times(numberOfRound, (index) => {
        return (
          <TabItem
            key={`rounb #${index}`}
            isActive={index + 1 === selectedRound}
            onClick={() => setSelectedRound(index + 1)}
          >
            {t(isSmall ? 'R' :'Round')}&nbsp;{index + 1}
          </TabItem>
        )
      })}
    </Flex>
  );
};

export default Tabs;