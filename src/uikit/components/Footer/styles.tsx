import styled from 'styled-components'
import { darkColors } from '../../theme/colors'
import { Box, Flex } from '../Box'
import { Text } from '../Text'

export const StyledFooter = styled(Flex)`
  background: ${darkColors.backgroundAlt};
`

export const StyledList = styled.ul`
  list-style: none;
  margin-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0px;
  }
`

export const StyledListItem = styled.li`
  font-size: 16px;
  margin-bottom: 8px;
  text-transform: capitalize;

  &:first-child {
    color: ${darkColors.secondary};
    font-weight: 600;
    text-transform: uppercase;
  }
`

export const StyledIconMobileContainer = styled(Box)`
  margin-bottom: 24px;
`

export const StyledToolsContainer = styled(Flex)`
  border-color: ${darkColors.cardBorder};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  padding: 24px 0;
  margin-bottom: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    border-top-width: 0;
    border-bottom-width: 0;
    padding: 0 0;
    margin-bottom: 0;
  }
`
export const StyledText = styled.span`
  color: ${darkColors.text};
`

export const FooterContainer = styled(Flex)`
  max-width: 1100px;
  width: 100%;
  margin: 150px 0 100px 0;
  justify-content: space-between;
  align-items: flex-start;
  background: transparent;
`
export const FooterColumn = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
export const FooterSectionsTitle = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #FFF;
  margin-bottom: 17px;
`
export const StyledLink = styled.a`
  font-weight: 400;
  font-size: 16px;
  line-height: 42px;
  color: rgba(255, 255, 255, 0.6);
`
export const CustomContainer = styled(Flex)<{center?: boolean}>`
  padding-left:${({center}) => center? '0px' : '270px'};
  padding-right:30px;
  width: 100%;
  max-width: 1640px;
  margin: 0 auto;
  justify-content: center;
  @media (min-width: 1640px) {
    padding: 0;
  }
`