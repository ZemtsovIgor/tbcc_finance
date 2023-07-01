import React from "react";
import styled from "styled-components";
import { Flex, Box, Text} from "../../../uikit";
import {useTranslation} from "../../../contexts/Localization";
import { Title } from "./Round";
import {StyledBtn} from "../../Swap/styles";

const Container = styled(Flex)`
  width: 100%;
  max-width: 550px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 120px;

  @media (max-width: 968px) {
    width: calc(100% - 30px);
    margin: 120px auto 100px auto;
    max-width: 500px;
  }
`
const SecondaryText = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.45);
  text-align: center;
`
export const Question = () => {

  const { t } = useTranslation()

  return (
    <Container>
      <Title mb='12px'>
        {t('Have a questions?')}
      </Title>
      <SecondaryText>
        {t('In case you’ve got any questions about the lottery, we invite you to go over our detailed explanation in the docs section.')}
      </SecondaryText>
      <Box width='165px' mt='35px'>
        <StyledBtn>
          {t('Get in Touch')}
        </StyledBtn>
      </Box>
    </Container>
  )
}