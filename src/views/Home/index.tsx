import React from "react";
import styled from "styled-components"
import Background from "views/Mint/components/Background";
import useMatchBreakpoints from "../../uikit/hooks/useMatchBreakpoints";
import ExtendedHome from "./components/ExtendedHome";
import ShortHome from "./components/ShortHome";

const Page = styled.div<{ isMobile?: boolean }>`
    background-color: #101428;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
`

const Home = ({ extended, setExtended }) => {
	const { isMobile } = useMatchBreakpoints()
	return (
		<Page isMobile={isMobile}>
			<Background extended={extended}/>
			<ShortHome setExtended={setExtended}/>
			{extended && <ExtendedHome/>}
		</Page>
	)
}

export default Home
