import React from 'react';
import styled from "styled-components";
import {useTranslation} from "../../../../contexts/Localization";
import {Flex, Grid, Text, useMatchBreakpoints} from "../../../../uikit";
import {tarrifsData} from "./TarrifsData";
import TariffCard from "./TariffCard";

const StyledGrid = styled(Grid)`
  width: 1300px;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 17px;
  
  @media (max-width: 1300px) {
    padding: 0 17px 33px 17px;
  }
`
const GridContainer = styled(Flex)`
  width: 100vw;
  overflow-x: auto;
  justify-content: center;
  
  @media (max-width: 1300px) {
    justify-content: flex-start;
  } 

  ::-webkit-scrollbar {
    height: 4px;
    background-color: #171D3D;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #535870;
  }

  ::-webkit-scrollbar-track {
    box-shadow: none;
  }
`

const Tariffs = () => {

  const { t } = useTranslation()
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  return (
    <Flex
      flexDirection='column'
      mt='50px'
      mb='47px'>
      <Text
        fontSize={isSmall ? '24px' : '36px'}
        fontWeight='600'
        color='#FFF'
        textAlign='center'
        mb='50px'
        mx={isSmall ? '15px' : '0'}>
        {t('Join all rounds for more fun and max reward!')}
      </Text>
      <GridContainer>
        <StyledGrid>
          {tarrifsData.map((tarrif) => {
            return (
              <TariffCard {...tarrif} key={tarrif.percent}/>
            )
          })}
        </StyledGrid>
      </GridContainer>
    </Flex>
  );
};

export default Tariffs;