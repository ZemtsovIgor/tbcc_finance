import styled from 'styled-components'
import { space, typography, layout } from 'styled-system'
import Text from '../Text/Text'
import { tags, HeadingProps } from './types'

const Heading = styled(Text).attrs({ bold: true })<HeadingProps>`
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: ${({ color }) => color || '#ffffff'};

  ${space}
  ${typography}
  ${layout}
`

Heading.defaultProps = {
  as: tags.H2,
}

export default Heading
