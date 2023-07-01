import React from "react";
import styled from "styled-components";
import { Flex, Box, Input, Grid, useMatchBreakpoints } from "../../../uikit";

interface CustomInputProps {
  value: number,
  onChange: (e) => void,
  onPlus: () => void,
  onMinus: () => void
}

const CustomInput: React.FC<CustomInputProps> = ({value, onChange, onPlus, onMinus}) => {

  const { isMobile } = useMatchBreakpoints()

  return (
    <>
      <InputContainer>
        <DiffBtn onClick={onMinus} isDisabled={value === 0}>
          -
        </DiffBtn>
        <Line/>
        <CentralElement>
          <StyledInput
            placeholder='0'
            type='number'
            min={0}
            max={100}
            value={value}
            onChange={(e) => {
              if (value > 100) {
                onChange(100)
              } else if (value < 0) {
                onChange(0)
              } else {
                onChange(Number(e.target.value))
              }
            }}
          />
        </CentralElement>
        <Line/>
        <DiffBtn onClick={onPlus}>
          +
        </DiffBtn>
      </InputContainer>
      <BtnsGrid>
        <FixedValueBtn
          onClick={() => onChange(10)}
        >
          10
        </FixedValueBtn>
        {!isMobile &&
          <FixedValueBtn
          onClick={() => onChange(25)}
        >
          25
        </FixedValueBtn>
        }
        <FixedValueBtn
          onClick={() => onChange(50)}
        >
          50
        </FixedValueBtn>
        <FixedValueBtn
          onClick={() => onChange(100)}
        >
          100
        </FixedValueBtn>
      </BtnsGrid>
    </>
  )
}

export default CustomInput

const InputContainer = styled(Flex)`
  width: 100%;
  height: 60px;
  align-items: center;
  background: transparent;
  border: 1px solid #4F5054;
  border-radius: 12px;
  margin-right: 16px;
`
const DiffBtn = styled(Flex)<{isDisabled?: boolean}>`
  height: 100%;
  width: 60px;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 20px;
  color: #FFF;
  cursor: pointer;
`
const Line = styled(Box)`
  height: 100%;
  width: 1px;
  background: linear-gradient(180deg, rgba(16,20,40, 0.0875) 0%, rgba(255, 255, 255, 0) 100%);
`
const CentralElement = styled(Flex)`
  height: 100%;
  width: calc(100% - 122px);
  align-items: center;
  justify-content: center;
`
const StyledInput = styled(Input)`
  background: transparent;
  border: none; 
  width: fit-content;
  height: fit-content;
  font-weight: 800;
  font-size: 20px;
  color: #FFF;
  text-align: center;
  -moz-appearance: textfield;
  
  &::placeholder {
    font-weight: 600;
    font-size: 20px;
    color: #FFF;
  }
  
  &::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`
const BtnsGrid = styled(Grid)`
  grid-template-columns: repeat(4, 1fr);
  widht:100%;
  grid-gap: 30px;
  margin-top: 19px;
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
`
const FixedValueBtn = styled(Flex)<{isActive?:boolean}>`
  width: 100%;
  height: 36px;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 16px;
  color: #FFF;
  cursor: pointer;
  border: 1px solid #4F5054;
  border-radius: 6px;
  background: transparent;
  
  &:hover {
    border: 1px solid #836DF3;
  }
`
