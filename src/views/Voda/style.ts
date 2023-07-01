import styled, {keyframes} from "styled-components";
import {Box, Flex, Text } from "../../uikit";

export const appearence = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const Container = styled(Flex)`
  width:100%;
  max-width: 1200px;
  flex-direction: column;
  margin: 0 auto;
  padding-bottom: 60px;
  
  @media (max-width: 968px) {
    padding: 0 15px 80px;
  }
`
export const Title = styled(Text)`
  font-size: 60px;
  color: #FFF;
  font-weight: 800;
  line-height: 1;
  margin-top: 90px;
  
  @media (max-width: 968px) {
    font-weight: 800;
    font-size: 28px;
    margin-top: 55px;
  }
`
export const WalletContainer = styled(Flex)`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  background: #4F5054;
  border-radius: 12px;
  padding: 0 18px 0 29px;
`
export const Circle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #836DF3;
  margin-right: 17px;
`
export const Adress = styled(Text)`
  font-weight: 800;
  font-size: 16px;
  color: #FFF;
  letter-spacing: 0.15em;
`
export const DiscText = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  cursor: pointer;
  
  @media (max-width: 968px) {
    font-size: 12px;
  }
`
export const ContentContainer = styled(Box)`
  width: 100%;
`
export const SecondaryText = styled(Text)`
  font-weight: 600;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.4);
`
export const StyledInput = styled.input.attrs({type: 'text'})`
  width: 100%;
  height: 60px;
  font-weight: 800;
  font-size: 16px;
  letter-spacing: 0.15em;
  color: #FFF;
  border: 1px solid #4F5054;
  border-radius: 12px;
  background: transparent;
  padding: 15px 29px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`
export const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
`

export const StyledColorWrap = styled(Flex)`
  flex-wrap: wrap;
  gap: 10px;
`;

export const StyledColorBtn = styled(Box)<{
  backgroundImage?: string
  active?: boolean
  disabled?: boolean
}>`
  width: calc((100% - 70px) / 8);
  aspect-ratio: 1/1;
  background-image: url(${({backgroundImage}) => backgroundImage && `/images/Fellows/${backgroundImage}.png`});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border-radius: 15px;
  transition: all 500ms ease;
  border: ${({ active }) => active ? '1px solid #836DF3' : '1px solid #000000'};
  position: relative;
  pointer-events: ${({ disabled }) => disabled ? 'none' : 'all'};
  
  &:after {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    background: ${({ disabled }) => disabled ? 'rgba(0, 0, 0, 0.5)' : 'none'};
    border-radius: 15px;
  }
  
  &:hover {
    &:after {
      background: rgba(131, 109, 243, 0.5);
      cursor: pointer;
    }
  }

  @media (max-width: 968px) {
    width: calc((100% - 30px) / 4);
  }
`

export const StyledColorSpan = styled.span`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-weight: 400;
  font-size: 8px;
  color: rgba(255, 255, 255, 1);
`;
