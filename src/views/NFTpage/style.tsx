import styled from "styled-components";
import {Box, Flex, Text} from "../../uikit";

export const Container = styled(Flex)`
  width: 100%;
  max-width: 1100px;
  flex-direction: column;
  position: relative;
  z-index: 10;
  
  @media (max-width: 968px) {
    max-width: 600px;
    align-items: center;
    padding: 0 15px;
  }
`
export const BackgroundCircle = styled(Box)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(43.56deg, rgba(210, 2, 244, 0) 17.08%, #D202F4 45.67%, #A51BEF 57.73%, #345AE1 84.94%, #2C5EE0 86.82%);
  filter: blur(9px);
  opacity: 0.42;
`
export const GradientText = styled(Text)`
  font-weight: 600;
  font-size: 48px;
  line-height: 1;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media (max-width: 968px) {
    font-size: 42px;
  }
`
export const SubTitle = styled(Text)`
  font-weight: 600;
  font-size: 36px;
  color: #FFFFFF;
  text-align: center;

  @media (max-width: 968px) {
    font-size: 28px;
  }
`
export const DecorCircle = styled(Box)<{top: number, left: number, blur?: number, size: string}>`
  position: absolute;
  top: ${({top}) => top}%;
  left: ${({left}) => left}%;
  filter: ${({blur}) => blur ? `blur(${blur}px)` : 'blur(18px)'};
  opacity: 0.42;
  width: ${({size}) => size === 'big' ? '111px' : (size === 'middle' ? '65px' : '45px')};
  height: ${({size}) => size === 'big' ? '111px' : (size === 'middle' ? '65px' : '45px')};
  border-radius: 50%;
  background: linear-gradient(43.56deg, rgba(210, 2, 244, 0) 17.08%, #D202F4 45.67%, #A51BEF 57.73%, #345AE1 84.94%, #2C5EE0 86.82%);
`