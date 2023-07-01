import tokens from 'config/constants/tokens'
import { Token } from '../../sdk'

const { bondly, safemoon } = tokens

interface WarningTokenList {
  [key: string]: Token
}

const SwapWarningTokens = <WarningTokenList>{
  safemoon,
  bondly,
}

export default SwapWarningTokens
