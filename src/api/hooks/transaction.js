import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuthContext } from '@/contexts/auth'

import { TrasactionService } from '../services/transaction'
import { getUserBalanceQueryKey } from './user'

export const createTransactionMutationKey = ['createTransaction']

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  return useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: (input) => TrasactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user.id }),
      })
    },
  })
}

export const getTransactionsQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['getTransactions', userId]
  }
  return ['getTransactions', userId, from, to]
}

export const useGetTransactions = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: getTransactionsQueryKey({ userId: user.id, from, to }),
    queryFn: () => TrasactionService.getAll({ from, to }),
  })
}
