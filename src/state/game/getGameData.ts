import { request, gql } from 'graphql-request'
import { GRAPH_API_GAME } from 'config/constants/endpoints'
import { GameGraphEntity } from 'state/types'
import addresses from "../../config/constants/contracts";
import {getAddress} from "../../utils/addressHelpers";

export const getGraphGame = async (
  id: string,
  customerId: string
): Promise<GameGraphEntity> => {
  try {
    return await request(
      GRAPH_API_GAME,
      gql`
        query getGame($id: Bytes!, $customerId: Bytes) {
          contract(id: $id) {
            totalHits
          }
          customer(id: $customerId) {
            id
            verified
            currentTable
            myID
            inviterID
            totalHits
            inviterRewards {
              tableNum
              inviterAddress {
                id
              }
              inviterReward
            },
            winnerRewards {
              tableNum
              winnerAddress {
                id
              }
              winnerReward
            },
            winnerInviterRewards {
              tableNum
              winnerInviterAddress {
                id
              }
              winnerInviterReward
            }
          }
        }
      `,
      { id, customerId },
    )
  } catch (error) {
    console.error(error)
    return {
      contract: {
        totalHits: '0',
      },
      customer: {
        id: '',
        verified: false,
        myID: '0',
        inviterID: '0',
        totalHits: '0',
        currentTable: '0',
        inviterRewards: [],
        winnerRewards: [],
        winnerInviterRewards: [],
      }
    }
  }
}

const getGameData = async (customerId: string): Promise<GameGraphEntity> => {
  const id: string = getAddress(addresses.uraGame);
  const graphResponse = await getGraphGame(id, customerId.toLowerCase())
  return graphResponse
}

export default getGameData
