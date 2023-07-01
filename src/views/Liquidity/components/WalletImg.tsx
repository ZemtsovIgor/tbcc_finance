import React from 'react'
import styled from 'styled-components'
import { KeyIcon } from 'uikit'
import { DarkCircle } from '../style'

const BigRectangle = styled.div`
    width: 65px;
    height: 49px;
    border-radius: 10px;
    background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
    display: flex;
    align-items: center;
`
const SmallRectangle = styled.div`
    width: 24px;
    height: 18px;
    border-radius: 4px;
    background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(10px);
`
const SmallCircle = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #DB00FF;
`

const WalletImg = () => {
    return (
        <DarkCircle>
            <BigRectangle>
                <KeyIcon ml='10px'/>
                <SmallRectangle>
                    <SmallCircle/>
                </SmallRectangle>
            </BigRectangle>
        </DarkCircle>
    )
}

export default WalletImg