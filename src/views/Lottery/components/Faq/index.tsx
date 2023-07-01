import React, {useState} from "react";
import styled from "styled-components";
import {useTranslation} from "../../../../contexts/Localization";
import { Flex, Heading } from "../../../../uikit";
import {FaqData} from "./FaqData";
import FaqCard from "./FaqCard";

const FaqList = () => {

  const { t } = useTranslation()
  const [showAll, setShowAll] = useState(false)

  return (
    <Container mt='100px' >
      <Title mb='50px'>
        {t('Lottery FAQ')}
      </Title>
      {FaqData.slice(0, showAll ? FaqData.length : 4).map((faq) => {
        return(
          <FaqCard faqItem={faq} key={faq.question}/>
        )
      })}
      {
        !showAll && <ShowAllBtn onClick={() => setShowAll(true)}>Show all (4/{FaqData.length})</ShowAllBtn>
      }
    </Container>
  )
}

export default FaqList

const Container = styled(Flex)`
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  
  @media (max-width: 968px) {
    max-width: calc(100vw - 30px);
    padding: 0 15px;
  }
`
const Title = styled(Heading)`
  font-weight: 600;
  font-size: 42px;
  color: #FFFFFF;
  text-align: center;

  @media (max-width: 968px) {
    font-size: 32px;
  }
`
const ShowAllBtn = styled(Flex)`
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  margin: 20px auto;
`