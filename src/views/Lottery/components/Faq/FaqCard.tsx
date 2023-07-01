import React, {useState} from "react";
import styled from "styled-components";
import {useTranslation} from "../../../../contexts/Localization";
import { Flex, Text, ChevronUpSecondIcon} from "../../../../uikit";
import ChevronDownIcon from "../../images/ChevronDownIcon";
import { FaqItem } from "./FaqData";

interface FaqCardProps {
  faqItem: FaqItem
}

const FaqCard: React.FC<FaqCardProps>  = ({faqItem}) => {

  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <FaqContainer>
      <Header onClick={() => setIsOpen(!isOpen)}>
        <Text fontWeight='600' fontSize='18px' color='#FFF'>
          {t(faqItem.question)}
        </Text>
        {isOpen ? <ChevronUpSecondIcon/> : <ChevronDownIcon/>}
      </Header>
      {
        isOpen &&
        <FaqBody>
          {t(faqItem.answer)}
        </FaqBody>
      }
    </FaqContainer>
  )
}
export default FaqCard

const FaqContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
  padding: 30px 35px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  margin-bottom: 25px;
  
  @media (max-width: 968px) {
    padding: 25px 17px;
  }
`
const Header = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`
const FaqBody = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 25px;
`