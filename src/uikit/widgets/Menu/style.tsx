import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Text } from '../../components/Text'
import Flex from '../../components/Box/Flex'
import { Button } from '../../components/Button'

export const ConnectBtn = styled.button`
    width: 150px;
    height: 45px;
    font-size: 14px;
    font-weight: 600;
    background: transparent;
    box-shadow: none;
    color: #FFF;
    border-radius: 6px;
    border: none;
    position: relative;
    margin-right: 27px;
    cursor: pointer;
 
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 6px; 
        border: 2px solid transparent;
        background: linear-gradient(77.9deg, #DB00FF -3.83%, #2C5EE0 110.36%) border-box;
        mask:
            linear-gradient(#fff 0 0) padding-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;

    }
`
export const MenuBackgound = styled.div<{ isOpen?: boolean }>`
    position: absolute;
    background: rgba(255, 255, 255, 0.1);
    filter: blur(5px);
    height:100%;
    width:${({ isOpen }) => isOpen ? '255px' : '95px'};
    transition: 300ms ;
`
export const Wrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    left:0;
    z-index:10;
    height: 100vh;
    width: 250px;
    padding-top: 33px;
    padding-bottom: 33px;
`
export const Container = styled.div<{ isOpen?: boolean, extended?: boolean }>`
    overflow: hidden;
    position: fixed;
    top: 0;
    left:0;
    z-index:20;
    height: ${({ extended }) => extended ? '730px' : '100vh'};
    width: ${({ isOpen }) => isOpen ? '250px' : '90px'};
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: 300ms;
    border-radius: ${({ extended }) => extended && '0 0 24px 0'};
`
export const IconContainer = styled(Flex) <{ isOpen?: boolean }>`
    flex-direction: column;
    margin-top: 46px;
    width: 100%;
    align-items: center;
    justify-self: flex-start;
    padding-left: 32px;
`
export const MenuItem = styled(Link) <{ $isActive?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 35px;
    cursor: pointer;
    text-decoration: none;

    & > div {
    color: ${({ $isActive }) => $isActive ? '#FFF' : 'rgba(255, 255, 255, 0.4)'};
    text-decoration: none;
    }

    & > svg {
        opacity:${({ $isActive }) => $isActive ? '1' : ''};
        transition: 300ms;
    }

    &:hover {
    & > div {
        color: #FFF;
    }
    & > svg {
        opacity: 1;
    }
    }
`
export const OpenMenuBtn = styled(Flex) <{ isOpen?: boolean }>`
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: #3A405F;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    position: fixed;
    top: 43px;
    left: ${({ isOpen }) => isOpen ? '238px' : '78px'};
    cursor:pointer;
    z-index:25;
    transition: 300ms;
`
export const MenuText = styled(Text)`
  color: rgba(255, 255, 255, 0.4);
  font-size: 16px;
  font-weight: 500;
  margin-left: 32px;
  padding-top: 2px;
  transition: 300ms;
`
export const TopMenu = styled.div`
    position: absolute;
    top: 0;
    right:0;
    display: flex;
    margin-top: 32px;
    margin-right: 28px;
    z-index: 20;
`
export const SettingMenuItem = styled(Button) <{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  height: 45px;
  background-color: transparent;

  & > svg {
      opacity:${({ isActive }) => isActive ? '1' : ''};
      transition: 300ms;
    }

  &:hover {
    & > svg {
      opacity: 1;
    }
  }
`
export const BurgerBtn = styled.div`
    position: fixed;
    top: 22px;
    right: 19px;
    z-index: 15;
`
export const MobileBottomMenu = styled.div`
    position: fixed;
    bottom: 0;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.0875);
    height: 65px;
    z-index: 12;
`
export const MobileContainer = styled.div<{ isOpen?: boolean }>`
    overflow: hidden;
    position: fixed;
    top: 0;
    right:0;
    z-index:11;
    height: 100vh;
    width: ${({ isOpen }) => isOpen ? '100vw' : '0px'};
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    transition: 300ms;
    backdrop-filter: blur(5px);
`
export const MobileBackground = styled.div<{ isOpen?: boolean }>`
    position: fixed;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    filter: blur(5px);
    top: 0;
    right:0;
    height: 100vh;
    width:${({ isOpen }) => isOpen ? '100vw' : '0'};
    transition: 300ms ;
`
export const MobileWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 84px;
    left: 26px;
    z-index:10;
    padding: 5px 10px;
`
export const LangSelectorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
`
