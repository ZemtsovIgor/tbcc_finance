import React from "react";
import styled from 'styled-components'
import { Flex, Text, ArrowSmallLeftIcon, ArrowSmallRightIcon} from "../../../uikit";

const PageNumber = styled(Text)<{isActive?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  font-size: 14px;
  color: ${({isActive}) => isActive ? '#FFF' : '#525263'};
  background-color: transparent;
  border-radius: 6px;
  cursor: pointer;
`

const PageSwitcher: React.FC<{activePage: number, maxPages: number, setPage: (e) => void}> = ({activePage, maxPages, setPage}) => {

  const applyNumber = () => {
    if (activePage < 4) {
      return [false, 2, 3, 4, true]
    }
    if (activePage >= 4 && activePage + 2 < maxPages) {
      return [true, activePage - 1, activePage, activePage + 1, true]
    }
    if (activePage + 2 >= maxPages){
      return [true, maxPages-3, maxPages-2, maxPages-1, false]
    }
    return []
  }

  return maxPages > 1 ? (
    <Flex
      alignItems='center'>
      <ArrowSmallLeftIcon mr='19px' cursor='pointer' onClick={() => setPage(activePage === 1 ? activePage : activePage - 1)}/>
      <PageNumber onClick={() => setPage(1)} isActive={activePage === 1}>1</PageNumber>
      <PageNumber style={{display: applyNumber()[0] ? '' : 'none'}}>...</PageNumber>
      <PageNumber onClick={() => setPage(applyNumber()[1])} isActive={activePage === applyNumber()[1]}>{applyNumber()[1]}</PageNumber>
      {
        maxPages >= 3 ? (
          <PageNumber onClick={() => setPage(applyNumber()[2])} isActive={activePage === applyNumber()[2]}>{applyNumber()[2]}</PageNumber>
        ) : null
      }
      {
        maxPages >= 4 ? (
          <PageNumber onClick={() => setPage(applyNumber()[3])} isActive={activePage === applyNumber()[3]}>{applyNumber()[3]}</PageNumber>
        ) : null
      }
      {
        maxPages >= 5 ? (
          <PageNumber style={{display: applyNumber()[4] ? '' : 'none'}}>...</PageNumber>
        ) : null
      }
      {
        maxPages >= 5 ? (
          <PageNumber onClick={() => setPage(maxPages)} isActive={activePage === maxPages}>{maxPages}</PageNumber>
        ) : null
      }
      <ArrowSmallRightIcon ml='19px' cursor='pointer' onClick={() => setPage(activePage === maxPages ? maxPages : activePage + 1)}/>
    </Flex>
  ) : null
}

export default PageSwitcher
