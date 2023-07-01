import styled from 'styled-components'
import { space, typography, layout } from 'styled-system'
import { TextProps } from './types'


const getFontSize = ({ fontSize, small }: TextProps) => {
  return small ? '14px' : fontSize || '16px'
}

const Text = styled.div<TextProps>`
  color: ${({ color }) => (color || '#505050')};
  font-size: ${getFontSize};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  line-height: 1.5;
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${({ ellipsis }) =>
    ellipsis &&
    `white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;`}

  ${space}
  ${typography}
  ${layout}
  
  &.addDots {
    //&:after {
    //  content: '...';
    //  position: absolute;
    //  right: 0;
    //  top: 5px;
    //}
  }
`

Text.defaultProps = {
  color: '#505050',
  small: false,
  ellipsis: false,
}

export default Text
