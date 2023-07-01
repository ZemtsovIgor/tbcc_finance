import React from "react";
import styled from "styled-components";
import {useTranslation} from "../../../../contexts/Localization";
import {Flex, Text} from "../../../../uikit";

const Next = ({price}) => {

  const {t} = useTranslation()

  return (
    <Container>
      <Text fontSize='14px' fontWeight='500' color='#56BCA0'>
        {price}
      </Text>
      <Text fontSize='10px' fontWeight='500' color='#FFF'>
        {t('Next')}
      </Text>
    </Container>
  )
}
export default Next

const Container = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 3px;
  
  @media (max-width: 968px) {
    margin-top: 0;
    width: 80px;
  }
`