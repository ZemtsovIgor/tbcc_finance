import React, {useState, useRef, useEffect} from "react";
import styled, { css } from "styled-components";
import {useTranslation} from "../../../contexts/Localization";
import {Flex, Box, Text, ChevronUpSecondIcon } from "../../../uikit";
import { ChevronDownIcon } from "../icons";

export interface SortbyDropDownProps {
  options: OptionProps[]
  onOptionChange?: (option: OptionProps) => void
  defaultOptionIndex?: number
}

export interface OptionProps {
  label: string
  value: any
}

const SortbyDropDown: React.FC<SortbyDropDownProps> = ({options, onOptionChange, defaultOptionIndex = 0,}) => {
  const { t } = useTranslation()
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(defaultOptionIndex)

  const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen)
    event.stopPropagation()
  }

  const onOptionClicked = (selectedIndex: number) => () => {
    setSelectedOptionIndex(selectedIndex)
    setIsOpen(false)

    if (onOptionChange) {
      onOptionChange(options[selectedIndex])
    }
  }

  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <DropdownContainer isOpen={isOpen}>
      <DropDownHeader onClick={toggling}>
        <Title>
          <Text fontWeight='600' fontSize='15px' color="rgba(255, 255, 255, 0.4)">
            {t('Sort by')}:&nbsp;
            <span style={{color: "#FFF"}}>{t(options[selectedOptionIndex].label)}</span>
          </Text>
          {
            isOpen
            ? <ChevronUpSecondIcon/>
            : <ChevronDownIcon/>
          }
        </Title>
      </DropDownHeader>
      <DropDownListContainer ref={dropdownRef}>
        <Line/>
        {options.map((option, index) =>
          index !== selectedOptionIndex ? (
            <Element key={option.label} onClick={onOptionClicked(index)}>
              {t(option.label)}
            </Element>
          ) : null,
        )}
      </DropDownListContainer>
    </DropdownContainer>
  )
}

export default SortbyDropDown

const DropdownContainer = styled(Box)<{ isOpen: boolean }>`
  width: 190px;
  height: 45px;
  position: relative;
  cursor: pointer;
  display: flex;
  user-select: none;
  z-index: 20;
  flex-direction: column;
  transition: height 3000ms;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({isOpen}) => isOpen ? '6px 6px 0 0' : '6px'};
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-bottom-width: ${({isOpen}) => isOpen ? 0 : '1px'};

  @media (max-width: 968px) {
    width: 100%;
  }

  ${(props) =>
      props.isOpen &&
      css`
    ${DropDownHeader} {
      border-bottom: 0;
    }

    ${DropDownListContainer} {
      height: auto;
      transform: scaleY(1);
      opacity: 1;
      top: 40px;
      border: 1px solid rgba(255, 255, 255, 0.09);
      background: rgba(255, 255, 255, 0.1);
      border-top-width: 0;
      border-radius: 0 0 6px 6px;
      width: calc(100% + 2px);
      margin-top: 4px;
      margin-left: -1px;
    }
  `}
  
  
`
const DropDownHeader = styled.div`
  width: 100%;
  height: 45px;
  padding: 0 17px;
`
const DropDownListContainer = styled.div`
  height: 0;
  position: absolute;
  overflow: hidden;
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  width: 100%;
  padding: 0 17px;
`

const Title = styled(Flex)`
  height: 45px;
  align-items: center;
  justify-content: space-between; 
`
const Element = styled(Flex)`
  font-weight: 500;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.4);
  padding: 7px 5px;
  border-radius: 4px;
  margin-bottom: 5px;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.0875) 50%, rgba(255, 255, 255, 0) 100%);
  margin-bottom: 15px;
`
