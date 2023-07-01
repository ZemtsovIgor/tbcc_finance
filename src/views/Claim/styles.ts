import styled from "styled-components";
import {Box, CheckboxProps} from "../../uikit";

export const ContentContainer = styled(Box)`
  width: 100%;
  max-width: 1150px;
  padding: 0 15px;
  position: relative;
  z-index: 2;
`
export const StyledCheckBox = styled.input.attrs({ type: 'checkbox' })<CheckboxProps>`
  appearance: none;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  height: 16px;
  width: 16px;
  vertical-align: middle;
  transition: background-color 0.2s ease-in-out;
  border: 1px solid rgba(255 255 255 / 0.4);
  border-radius: 4px;
  background-color: transparent;
  margin: 0;

  &:after {
    content: '';
    position: absolute;
    border-bottom: 2px solid;
    border-left: 2px solid;
    border-color: transparent;
    top: 30%;
    left: 0;
    right: 0;
    width: 50%;
    height: 25%;
    margin: auto;
    transform: rotate(-50deg);
    transition: border-color 0.2s ease-in-out;
  }
  
  &:checked {
    border: none;
    background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
    &:after {
      border-color: white;
    }
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`