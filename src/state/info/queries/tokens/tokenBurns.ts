import { request, gql } from 'graphql-request'
import { GRAPH_API_TOKEN } from 'config/constants/endpoints'

/**
 * Data for showing Pools table on the Token page
 */
const TOKEN_BURN_RATING = gql`
  query burns($address: Bytes!) {
    burners(
      id: $address,
      orderBy: amount,
      orderDirection: desc
    ) {
      id,
      sender,
      amount
    }
  }
`

export interface TokenBurnRatingResponse {
  id: string,
  sender: string
  amount: number
}

export const fetchTokenBurnRating = async (
  address: string,
): Promise<{
  error: boolean
  data?: TokenBurnRatingResponse[]
}> => {
  try {
    const data = await request<{ burners: TokenBurnRatingResponse[] }>(GRAPH_API_TOKEN, TOKEN_BURN_RATING, {
      address,
    })
    return {
      error: false,
      data: data.burners,
    }
  } catch (error) {
    console.error(`Failed to fetch token data ${address}`, error)
    return {
      error: true,
    }
  }
}

