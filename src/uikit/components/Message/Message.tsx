import React from 'react'
import styled from 'styled-components'
import { MessageProps } from './types'

const MessageContainer = styled.div<MessageProps>`
  display: flex;
  padding: 16px;
  border-radius: 16px;
  border: solid 1px;
  background: #ffffff;
  border-color: #a5a5a4;
  color: #a5a5a4
`

const Message: React.FC<MessageProps> = ({ children, variant, ...props }) => {
  return (
    <MessageContainer variant={variant} {...props}>
      {children}
    </MessageContainer>
  )
}

export default Message
