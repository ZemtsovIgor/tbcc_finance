import React from "react";
import { Flex } from "../Box";
import { TbccTextIcon } from "../Svg";
import { Text } from "../Text";
import { FooterDropDown } from "./Components/FooterDropDown";
import { footerAboutUsLinks, footerSupportLinks, socials } from "./config";
import { FooterColumn } from "./styles";

const MobileFooter = () => {
	return (
		<Flex flexDirection='column' width='100%' mb='60px'>
			<FooterColumn mb='20px'>
				<Flex width='100%' justifyContent='flex-start'><TbccTextIcon mb='10px'/></Flex>
				<Text fontWeight='400' fontSize='14px' color='rgba(255, 255, 255, 0.3)'>
            © 2023 TBCC Labs
        </Text>
			</FooterColumn>
			<FooterColumn>
				<FooterDropDown title='AboutUs' body={footerAboutUsLinks}/>
			</FooterColumn>
			<FooterColumn>
				<FooterDropDown title='Support' body={footerSupportLinks}/>
			</FooterColumn>
			<FooterColumn>
				<FooterDropDown title='Community' body={socials}/>
			</FooterColumn>
		</Flex>
  )
}

export default MobileFooter
