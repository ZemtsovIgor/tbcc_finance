import React from "react"
import { Flex, useMatchBreakpoints } from '../../../../uikit'
import Advantages from "./Advantages"
// import Ecosystem from "./Ecosystem"
import FirstBlock from "./FirstBlock"
import LiquidityBlock from "./Liquidity"
import PartnersBlock from "./PartnersBlock"
import Footer from '../../../../uikit/components/Footer'

const ExtendedHome = () => {

    const { isMobile, isTablet } = useMatchBreakpoints()
    const isSmall = isMobile || isTablet

    return (
        <Flex 
            flexDirection='column' 
            alignItems={isSmall ? 'center' : 'flex-start'} 
            m={isSmall ? '0 auto': '0 0 80px 0'}
            p={isSmall && '0 20px'}>
            <FirstBlock/>
            <Advantages/>
            {/* <Ecosystem/> */}
            <LiquidityBlock/>
            <PartnersBlock/>
            <Footer/>
        </Flex>
    )
}

export default ExtendedHome