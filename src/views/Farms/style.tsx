import styled from "styled-components";
import {Flex, Heading, Text, Input, Grid} from "../../uikit";

export const Container = styled(Flex)`
  width: 100%;
  max-width: 1100px;
  flex-direction: column;
  position: relative;
  z-index: 10;
  
  @media (max-width: 968px) {
    padding: 0 15px;
  }
`
export const Header = styled(Flex)`
  width: 100%;
  align-items: center;
  margin-top: 86px;

  @media (max-width: 968px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
export const Title = styled(Heading)`
  font-weight: 600;
  font-size: 36px;
  line-height: 65px;
  color: #FFFFFF;

  @media (max-width: 968px) {
    font-size: 32px;
    line-height: 38px;
  }
`
export const SubTitle = styled(Text)`
  font-weight: 400;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
`
export const ConfigContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  width: 68%;

  @media (max-width: 968px) {
    width: 100%;
    flex-direction: column;
    margin-left: 0;
  }
`
export const StyledInput = styled(Input)`
  width: 190px;
  height: 45px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: #FFF;
  
  &::placeholder {
    font-weight: 600;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.4);
  }
  
  @media (max-width: 968px) {
    width: 100%;
    margin-top: 15px;
  }
`
export const ResponsiveGrid = styled(Grid)`
  align-items: center;
  grid-template-columns: 2fr 1.5fr 0.8fr 1.9fr 1.5fr 1fr 40px;
  height: 73px;
  padding-left: 39px;
`