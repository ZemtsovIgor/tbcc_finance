import React, { useState } from "react";
import { Flex } from "uikit/components/Box";
import { ArrowUpIcon, ArrowDownIcon } from "uikit/components/Svg";
import { FooterSectionsTitle, StyledLink } from "../styles";
import { FooterLinkType } from "../types";

interface Props {
	initialOpenState?: boolean,
	title: string,
	body: FooterLinkType[]
}

export const FooterDropDown: React.FC<Props> = ({initialOpenState = false, title, body}) => {

	const [isOpen, setIsOpen] = useState(initialOpenState)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

	return (
		<Flex flexDirection='column' alignItems='flex-start' width='100%' mb='30px'>
			<Flex onClick={toggleOpen} justifyContent='space-between' width='100%' mb='17px'>
				<FooterSectionsTitle style={{marginBottom: '0'}}>
					{title}
				</FooterSectionsTitle>
				{!isOpen ? <ArrowDownIcon/> : <ArrowUpIcon/>}
			</Flex>
			{isOpen &&
			<Flex flexDirection='column'>
				{body.map((el) => {
					return (
						<StyledLink href={el.href} key={el.label}>
							{el.label}
						</StyledLink>
					)
				})}
			</Flex>}
		</Flex>
	)
}
