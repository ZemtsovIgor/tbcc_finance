import React from "react";
import styled from "styled-components";
import {useTranslation} from "../../../contexts/Localization";
import { Flex } from "../../../uikit";

interface SwticherProps {
  elements: any[],
  activeIndex: number,
  colored?: boolean,
  isText?: boolean,
  setActive: (index) => void
}

const CustomSwitcher: React.FC<SwticherProps> = ({elements, activeIndex, colored, isText, setActive}) => {

  const { t } = useTranslation()

  return (
    <SwitchContainer>
      {elements.map((el, index) => {
        return (
          <SwitchElement key={Math.random()} isActive={activeIndex === index} colored={colored} onClick={() => setActive(index)}>
            {isText ? t(el) : el}
          </SwitchElement>
        )
      })}
    </SwitchContainer>
  )
}

export default CustomSwitcher

const SwitchContainer = styled(Flex)`
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  cursor: pointer;
`
const SwitchElement = styled(Flex)<{ isActive?: boolean, colored?: boolean }>`
  height: 45px;
  align-items: center;
  border-radius: 6px;
  background: ${({isActive, colored}) => isActive ? (colored ?'linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%)' : '#2D2B45') : ''};
  padding: 0 18px;
`
