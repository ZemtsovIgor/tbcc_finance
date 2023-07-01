import { request, gql } from 'graphql-request'
import { GRAPH_API_NFTTFA } from 'config/constants/endpoints'
import { NFTTDAGraphEntity } from 'state/types'
import addresses from "../../config/constants/contracts";
import {getAddress} from "../../utils/addressHelpers";

export const getGraphNFTTDA = async (
  id: string,
  ownerId: string
): Promise<NFTTDAGraphEntity> => {
  try {
    const response = await request(
      GRAPH_API_NFTTFA,
      gql`
        query getNFTTDA($id: Bytes!, $ownerId: Bytes) {
          contract(id: $id) {
            totalSupply
            totalTokens
            busdPrice
            totalOwners
            floorPrice
          }
          owners(id: $ownerId) {
            totalTokens
            tokens {
              id
            }
          }
        }
      `,
      { id, ownerId },
    )
    return response.contract
  } catch (error) {
    console.error(error)
    return {
      totalSupply: '0',
      totalTokens: '0',
      busdPrice: '0',
      totalOwners: '0',
      floorPrice: '0',
      owner: {
        totalTokens: '0',
        tokens: []
      }
    }
  }
}

const getNFTTDAData = async (ownerId: string): Promise<NFTTDAGraphEntity> => {
  const id: string = getAddress(addresses.nftTDA);
  const graphResponse = await getGraphNFTTDA(id, ownerId)
  return graphResponse
}

export default getNFTTDAData
