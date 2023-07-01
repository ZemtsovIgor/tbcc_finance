import { request, gql } from 'graphql-request'
import { GRAPH_API_NFTVODA } from 'config/constants/endpoints'
import { NFTVODAGraphEntity } from 'state/types'
import addresses from "../../config/constants/contracts";
import {getAddress} from "../../utils/addressHelpers";

export const getGraphNFTVODA = async (
  id: string,
  customerId: string
): Promise<NFTVODAGraphEntity> => {
  try {
    const response = await request(
      GRAPH_API_NFTVODA,
      gql`
        query getNFTVODA($id: Bytes!, $customerId: Bytes) {
          contract(id: $id) {
            totalSupply
            totalTokens
            busdPrice
          }
          tokens {
            id
          }
          inviter(id: $customerId) {
            count
            id
            reward
            referral {
              id
              claimed
              reward
              time
            }
          }
        }
      `,
      { id, customerId },
    )
    return {
      totalSupply: response.contract.totalSupply,
      totalTokens: response.contract.totalTokens,
      busdPrice: response.contract.busdPrice,
      tokens: response.tokens,
      inviter: response.inviter ? response.inviter : {
        id: '',
        count: '',
        reward: '',
        referral: []
      },
    }
  } catch (error) {
    console.error(error)
    return {
      totalSupply: '0',
      totalTokens: '0',
      busdPrice: '0',
      tokens: [],
      inviter: {
        id: '',
        count: '',
        reward: '',
        referral: []
      }
    }
  }
}

const getNFTVODAData = async (customerId: string): Promise<NFTVODAGraphEntity> => {
  const id = getAddress(addresses.nftVODA);
  const graphResponse = await getGraphNFTVODA(id, customerId.toLowerCase())
  return graphResponse
}

export default getNFTVODAData
