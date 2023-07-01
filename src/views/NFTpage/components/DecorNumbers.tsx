import React from "react";
import styled from "styled-components";
import { Box } from "../../../uikit";
import DecorNumber1 from "../images/DecorNumber1";
import DecorNumber2 from "../images/DecorNumber2";
import DecorNumber3 from "../images/DecorNumber3";
import DecorNumber4 from "../images/DecorNumber4";
import DecorNumber5 from "../images/DecorNumber5";

const Item = styled(Box)`
  position: absolute;
`

export const DecorNumbers = () => {

  return (
    <>
      <Item top='2%' left='-13%'>
        <DecorNumber1/>
      </Item>
      <Item top='-13%' left='87%'>
        <DecorNumber2/>
      </Item>
      <Item top='58%' left='114%'>
        <DecorNumber3/>
      </Item>
      <Item top='113%' left='69%'>
        <DecorNumber4/>
      </Item>
      <Item top='93%' left='-9%'>
        <DecorNumber5/>
      </Item>
    </>
  )
}