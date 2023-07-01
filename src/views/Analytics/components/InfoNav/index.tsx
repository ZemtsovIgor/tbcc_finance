import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
// import Search from 'views/Analytics/components/InfoSearch'
import { Box, Flex,  useMatchBreakpoints } from '../../../../uikit'

const NavWrapper = styled(Flex)<{isMobile?: boolean}>`
  justify-content: ${({isMobile}) => isMobile ? 'center' : 'space-between'};
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({isMobile}) => isMobile ? ' 15px 23px' : ' 31px 0px'};
  flex-direction: ${({isMobile}) => isMobile ? ' column' : 'row'};
  gap: ${({isMobile}) => isMobile ? ' 16px' : '8px'};
`

const BackGround = styled.div`
  background: #F0F3FE;`

const StyledButtonMenu = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: #E2E6F5;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;`

const StyledButtonMenuItem = styled.div<{isActive?: boolean, isMobile?: boolean}>`
  color: ${({isActive}) => isActive ? '#4E89E3' : '#525263'} ;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  
  &::after {
    content: ${({isActive}) => isActive ? `''` : 'none'};
    width: ${({isMobile}) => isMobile ? '60%' : '40%'};
    height: 3px;
    background-color: #4E89E3;
    position: absolute;
    top: 29px;
    left: ${({isMobile}) => isMobile ? '18%' : '30%'};
    border-radius: 3px;
  }
`

const InfoNav: React.FC<{activeIndex: number, setActiveIndex: (e) => void}> = ({activeIndex, setActiveIndex}) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  return (
    <BackGround>
      <NavWrapper isMobile={isMobile}>
        <Flex
          width={isMobile ? '100%' : '335px'}
          height='50px'>
          <StyledButtonMenu>
            <StyledButtonMenuItem isMobile={isMobile} isActive={activeIndex === 0} onClick={() => setActiveIndex(0)}>
              {t('Overview')}
            </StyledButtonMenuItem>
            <StyledButtonMenuItem isMobile={isMobile} isActive={activeIndex === 1} onClick={() => setActiveIndex(1)}>
              {t('Pools')}
            </StyledButtonMenuItem>
            <StyledButtonMenuItem isMobile={isMobile} isActive={activeIndex === 2} onClick={() => setActiveIndex(2)}>
              {t('Transactions')}
            </StyledButtonMenuItem>
          </StyledButtonMenu>
        </Flex>
        <Box width={['100%', '100%', '250px']}>
          {/* <Search /> */}
        </Box>
      </NavWrapper>
    </BackGround>
  )
}

export default InfoNav
