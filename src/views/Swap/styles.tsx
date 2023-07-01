import styled from 'styled-components'
import {Box, Flex, Text, Button, Grid} from '../../uikit'

export const StyledSwapContainer = styled(Flex)`
  flex-shrink: 0;
  height: fit-content;
  width: 100%;
  margin-bottom: 20px;
`

export const StyledInputCurrencyWrapper = styled(Box)<{ isMobile?: boolean }>`
  /* width: ${({ isMobile }) => (isMobile ? '100%' : '435px')}; */
  width: 100%;
`
export const Title = styled(Text)<{ isMobile?: boolean }>`
  font-size: ${({ isMobile }) => (isMobile ? '32px' : '36px')};
  font-weight: 600;
  color: #FFF;
  line-height: ${({ isMobile }) => (isMobile ? '42px' : '72px')};
  text-align: center;
`
export const SubTitle = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
`
export const StyledBtn = styled(Button)`
  height: 55px;
  color: #FFF;
  font-size: 15px;
  font-weight: 600;
  border: none;
  box-shadow: none;
  border-radius: 6px;
  background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
`
export const SwapTokensBtn = styled(Flex)`
  //position: absolute;
  //top: 35%;
  //left: 47%;
  z-index: 5;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.09);
  background: #241B4F;
  cursor: pointer;
`
export const ExpertModeGrid = styled(Grid)`
  width: 100%;
  min-height: 690px;
  grid-template-columns: 2.2fr 0.8fr 0.9fr;
`
