import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { ArrowDropDownIcon, Box, BoxProps, Text } from '../../uikit'

const DropDownHeader = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-radius: 30px;
  background: #E4E4F5;
  transition: border-radius 0.15s;
`

const DropDownListContainer = styled.div`
  min-width: 150px;
  height: 0;
  position: absolute;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.input};
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  width: 100%;
`

const DropDownContainer = styled(Box)<{ isOpen: boolean }>`
  cursor: pointer;
  width: 150px;
  position: relative;
  border: none;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #292929;
  line-height: 20px;
  border-radius: 30px;
  height: 52px;
  min-width: 136px;
  user-select: none;
  z-index: 20;

  ${(props) =>
    props.isOpen &&
    css`
      ${DropDownHeader} {
        border-bottom: 0;
        box-shadow: none;
        border-radius: 30px 30px 0 0;
      }

      ${DropDownListContainer} {
        height: auto;
        transform: scaleY(1);
        opacity: 1;
        border: 0;
        top: 40px;
        border-top-width: 0;
        border-radius: 0 0 30px 30px;
        background: #E4E4F5;
      }
    `}

  svg {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
`

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: 10;
`

const ListItem = styled.li`
  list-style: none;
  padding: 8px 16px;
`

export interface SelectProps extends BoxProps {
  options: OptionProps[]
  onOptionChange?: (option: OptionProps) => void
  defaultOptionIndex?: number
  withOutArrow?: boolean
}

export interface OptionProps {
  label: string
  value: any
}

const Select: React.FunctionComponent<SelectProps> = ({
  options,
  onOptionChange,
  defaultOptionIndex = 0,
  withOutArrow,
  ...props
}) => {
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
    <DropDownContainer isOpen={isOpen} {...props}>
      <DropDownHeader onClick={toggling}>
        <Text
          fontSize="16px"
          color="#525263"
          fontWeight="500"
        >
          {options[selectedOptionIndex].label}
        </Text>
      </DropDownHeader>
      {
        withOutArrow ? null : (
          <ArrowDropDownIcon color="text" onClick={toggling} />
        )
      }
      <DropDownListContainer>
        <DropDownList ref={dropdownRef}>
          {options.map((option, index) =>
            index !== selectedOptionIndex ? (
              <ListItem onClick={onOptionClicked(index)} key={option.label}>
                <Text>{option.label}</Text>
              </ListItem>
            ) : null,
          )}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  )
}

export default Select
