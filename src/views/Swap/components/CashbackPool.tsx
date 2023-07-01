import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, Text, useMatchBreakpoints } from '../../../uikit'

const Container = styled(Flex)<{isMobile?: boolean}>`
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid #FFFFFF16;
    border-radius: 12px;
    padding: ${({isMobile}) => isMobile ? '12px 14px' : '20px 40px'};
    margin-bottom: ${({isMobile}) => isMobile ? '80px' : ''};
`
const ProgressBar = styled.div`
    position: relative;
    width: 100%;
    height: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
    margin-top: 11px;
`
const Progress = styled.div<{width: number}>`
    width: ${({width}) => width && `${width}%` };
    height: 100%;
    background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%);
`

const BarText = styled.div`
    position: absolute;
    top: 0;
    left: 35%;
`

interface CashbackPoolProps {
    current: number,
    total: number
}

const CashbackPool: React.FC<CashbackPoolProps> = ({current, total}) => {

    const { t } = useTranslation()
    const { isMobile } = useMatchBreakpoints()

    return (
        <Container isMobile={isMobile}>
            <Text fontWeight='600' fontSize='15px' color='#FFF' textAlign='center'>
                {t('Cashback pool')}
            </Text>
            <Text fontWeight='400' fontSize='13px' color='#FFFFFF99' textAlign='center'>
                {t('The total daily pool for cashback rewards is limited by 5 000 TBCC. The pool is refilled every day at 00:00:00 UTC')}
            </Text>
            <ProgressBar>
                <BarText>
                    <Text color='#FFF' fontSize='12px' fontWeight='600'>
                        {t('Distributed')} {current}/{total}
                    </Text>
                </BarText>
                <Progress width={(current / total) * 100}/>
            </ProgressBar>
        </Container>
    )
}

export default CashbackPool