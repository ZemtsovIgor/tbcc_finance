import { useReducer } from 'react'
import { noop } from 'lodash'
import { ethers } from 'ethers'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'

type LoadingState = 'idle' | 'loading' | 'success' | 'fail'

type Action =
  | { type: 'confirm_sending' }
  | { type: 'confirm_receipt' }
  | { type: 'confirm_error' }

interface State {
  approvalState: LoadingState
  confirmState: LoadingState
}

const initialState: State = {
  approvalState: 'idle',
  confirmState: 'idle',
}

const reducer = (state: State, actions: Action): State => {
  switch (actions.type) {
    case 'confirm_sending':
      return {
        ...state,
        confirmState: 'loading',
      }
    case 'confirm_receipt':
      return {
        ...state,
        confirmState: 'success',
      }
    case 'confirm_error':
      return {
        ...state,
        confirmState: 'fail',
      }
    default:
      return state
  }
}

interface OnSuccessProps {
  state: State
  receipt: ethers.providers.TransactionReceipt
}

interface ConfirmTransaction {
  onConfirm: (params?) => Promise<ethers.providers.TransactionResponse>
  onSuccess: ({ state, receipt }: OnSuccessProps) => void
}

const useRunBNBTransaction = ({
  onConfirm,
  onSuccess = noop,
}: ConfirmTransaction) => {
  const { t } = useTranslation()
  const [state, dispatch] = useReducer(reducer, initialState)
  const { toastError } = useToast()

  return {
    isConfirmingTrans: state.confirmState === 'loading',
    isConfirmedTrans: state.confirmState === 'success',
    hasConfirmFailedTrans: state.confirmState === 'fail',

    handleConfirmTrans: async (params = {}) => {
      dispatch({ type: 'confirm_sending' })
      try {
        const tx = await onConfirm(params)

        const receipt = await tx.wait()
        if (receipt.status) {
          dispatch({ type: 'confirm_receipt' })
          onSuccess({ state, receipt })
        }
      } catch (error) {
        dispatch({ type: 'confirm_error' })
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    },
  }
}

export default useRunBNBTransaction
