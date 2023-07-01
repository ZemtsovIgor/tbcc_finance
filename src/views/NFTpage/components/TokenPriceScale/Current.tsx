import React from "react";
import styled from "styled-components";
import {useTranslation} from "../../../../contexts/Localization";
import {Flex, Text, useMatchBreakpoints} from "../../../../uikit";
import CurrentPrice from "../../images/CurrentPrice";
import CurrentPriceMobile from "../../images/CurrentPriceMobile";

const Current = ({price}) => {

  const {t} = useTranslation()
  const {isMobile, isTablet} = useMatchBreakpoints()
  const isSmall = isMobile || isTablet

  return (
    <Container>
      {
        isSmall
          ? <CurrentPriceMobile
            style={{
              position: 'absolute',
              top: '-2px',
              left: '13px'
            }}
          />
          : <CurrentPrice style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'translate(-20px, -13px)'
          }}/>
      }

      <Flex
        width='100%'
        alignItems='center'
        position='relative'
        zIndex='11'
        flexDirection='column'>
        <Text fontSize='14px' fontWeight='500' color='#FFF'>
          {price}
        </Text>
        <Text fontSize='10px' fontWeight='500' color='#FFF'>
          {t('Current')}
        </Text>
      </Flex>
    </Container>
  )
}

export default Current

const Container = styled(Flex)`
  position: relative;
  width: 100%;
  align-items: center;
  margin-top: 12px;
  
  @media (max-width: 968px) {
    margin-top: 0;
    width: 80px;
  }
`