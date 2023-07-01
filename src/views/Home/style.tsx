import styled from 'styled-components'
import { Button, Flex } from '../../uikit'

export const StyledBtn = styled(Button)`
    height: 60px;
    width: 100%;
    border-radius: 6px;
    background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
    font-weight: 600;
    font-size: 16px;
    color: #FFF;
`
export const TransparentBtn = styled(Button)`
    height: 60px;
    width: 100%; 
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    font-weight: 600;
    font-size: 16px;
    color: #FFF;
`
export const Container = styled(Flex) <{ isMobile?: boolean }>`
	width: 100%;
	padding-left: ${({ isMobile }) => isMobile ? '0px' : '270px'};
	align-items: center;
	position: relative;
	max-width: 1440px;

	@media (min-width: 2000px) {
		padding-left: 0;
		margin: 0 auto;
	}
`
export const SubContainer = styled(Flex) <{ isMobile?: boolean }>`
    width: 100%;
    max-width: 1440px;
    flex-direction: ${({ isMobile }) => isMobile ? 'column-reverse' : 'row'};
    justify-content: ${({ isMobile }) => isMobile ? 'center' : 'space-between'};
    align-items: center;
`