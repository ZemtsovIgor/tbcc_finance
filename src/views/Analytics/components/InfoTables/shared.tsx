import styled from 'styled-components'
import { Text, Flex } from '../../../../uikit'

export const ClickableColumnHeader = styled(Text)`
  cursor: pointer;
  height: 45px;
  display: flex;
  align-items: center;
`

export const TableWrapper = styled(Flex)`
  width: calc(100% - 65px);
  flex-direction: column;
  gap: 13px;
  margin-bottom: 60px;
  &:nth-child(1) {
    border-top-right-radius: 40px;
    border-top-left-radius: 40px;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 900px) {
    overflow: hidden;
    overflow-x: scroll;
  }
`

export const Arrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 20px;
  :hover {
    cursor: pointer;
  }
`

export const Break = styled.div`
  height: 1px;
  background-color: rgba(217, 217, 217, 0.05);
  width: 100%;
`
