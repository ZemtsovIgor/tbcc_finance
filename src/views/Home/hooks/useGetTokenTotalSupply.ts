import { useEffect, useReducer, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'

interface State {
  totalSupply: number
}

type Action =
  | { type: 'token_total_supply_gutted', payload: number }
  | { type: 'token_total_supply_loading' }
  | { type: 'token_total_supply_error' }

const initialState: State = {
  totalSupply: 0
}

const reducer = (state: State, actions: Action): State => {
  switch (actions.type) {
    case 'token_total_supply_gutted':
      return {
        ...state,
        totalSupply: actions.payload
      }
    case 'token_total_supply_loading':
      return {
        ...state,
        totalSupply: 0
      }
    case 'token_total_supply_error':
      return {
        ...state,
        totalSupply: 0
      }
    default:
      return state
  }
}

interface GetTokenTotalSupplyTransaction {
  onGetTokenTotalSupply?: () => Promise<any>
}

const useGetTokenTotalSupply = ({
  onGetTokenTotalSupply,
}: GetTokenTotalSupplyTransaction) => {
  const { account } = useWeb3React()

  const [state, dispatch] = useReducer(reducer, initialState)
  const handleTokenTotalSupplyOptions = useRef(onGetTokenTotalSupply)

  // Check if approval is necessary, re-check if account changes
  useEffect(() => {
    if (account && handleTokenTotalSupplyOptions.current) {
      handleTokenTotalSupplyOptions.current().then((result) => {
        if (result) {
          dispatch({ type: 'token_total_supply_gutted', payload: result })
        }
      })
    }
  }, [account, handleTokenTotalSupplyOptions, dispatch])

  return state.totalSupply
}

export default useGetTokenTotalSupply
