import { Link } from 'react-router-dom'
import styled from 'styled-components'

// An internal link from the react-router-dom library that is correctly styled
const StyledInternalLink = styled(Link)`
  text-decoration: underline;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  font-size: 13px;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

export default StyledInternalLink
