import React from 'react'
import styled from 'styled-components'
import { AppBody } from 'components/App'
import CurrencyInputHeader from 'views/Swap/components/CurrencyInputHeader'
import { Flex, useMatchBreakpoints } from '../../../uikit'

const Container = styled.div<{isMobile?: boolean}>`
    width: 100%;
    height: 100%;
    padding: ${({isMobile}) => isMobile ? '10px 13px 25px 14px' : '5px 40px 32px 41px'} ;
`

const MainCard = ({ children }) => {

	const { isMobile } = useMatchBreakpoints()

	return (
		<Flex width={isMobile ? 'calc(100% - 24px)' : '545px'} mb='100px' >
			<AppBody maxWidth='100%'>
				<CurrencyInputHeader isActiveTab='Liquidity' />
				<Container isMobile={isMobile}>
					{children}
				</Container>
			</AppBody>
		</Flex>
	)
}

export default MainCard