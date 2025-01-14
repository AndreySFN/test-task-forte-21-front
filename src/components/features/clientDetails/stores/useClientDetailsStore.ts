import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { IError } from '../../../../types'
import { apiAdapter } from '../../../../api'
import { ClientDto } from 'test-task-forte-21-api-adapter'

interface IClientStoreState {
  client: ClientDto | null
  loading: boolean
  error: string | null
  isOpen: boolean

  fetchClient: (id: string) => Promise<void>
  setIsOpen: (val: boolean) => void
}

const initialState = {
  client: null,
  loading: false,
  error: null,
  isOpen: true,
}

export const useClientDetailsStore = create<IClientStoreState>()(
  subscribeWithSelector((set) => ({
    ...initialState,
    setIsOpen: (val: boolean) => {
      set({ isOpen: val })
    },
    fetchClient: async (id: string) => {
      set({ loading: true, error: null })
      try {
        const client = await apiAdapter.getClientById(id)
        set({ client, loading: false })
      } catch (error: unknown) {
        set({
          error: (error as IError).message || 'Failed to fetch client', // TODO: Разобраться с типизацией
          loading: false,
        })
      }
    },
  })),
)
