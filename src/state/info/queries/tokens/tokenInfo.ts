import { request, gql } from 'graphql-request'
import { GRAPH_API_TOKEN } from 'config/constants/endpoints'

/**
 * Data for showing Pools table on the Token page
 */
const TOKEN_INFO = gql`
  query token($address: Bytes!) {
    token(id: $address) {
      id,
      totalSupply
    }
  }
`

interface TokenResponse {
  token: {
    id: string,
    totalSupply: string
  }
}

const fetchTokenInfo = async (
  address: string,
): Promise<{
  error: boolean
  data?: TokenResponse
}> => {
  try {
    const data = await request<TokenResponse>(GRAPH_API_TOKEN, TOKEN_INFO, {
      address,
    })
    return {
      error: false,
      data,
    }
  } catch (error) {
    console.error(`Failed to fetch token data ${address}`, error)
    return {
      error: true,
    }
  }
}

export default fetchTokenInfo
