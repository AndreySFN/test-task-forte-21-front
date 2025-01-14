import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import {
  GridRowSelectionModel,
  GridSortDirection,
  GridValidRowModel,
} from '@mui/x-data-grid'
import { clientDtoToTableRowsMapper } from '../mappers'
import { IError } from '../../../../types'
import { apiAdapter } from '../../../../api'

interface IClientsStoreState {
  page: number
  pageSize: number
  search: string
  sortField?: string
  sortOrder?: GridSortDirection
  rows: GridValidRowModel[]
  loading: boolean
  error: string | null
  total: number
  selectedRows: GridRowSelectionModel

  changeSearch: (newSearch: string) => void
  changePagination: (newPage: number, newLimit: number) => void
  changeSort: (sortField?: string, sortOrder?: GridSortDirection) => void
  setSelectionModel: (selectionModel: GridRowSelectionModel) => void
  fetchClients: () => Promise<void>
}

export const useClientListStore = create<IClientsStoreState>()(
  subscribeWithSelector((set, get) => ({
    page: 0,
    pageSize: 10,
    search: '',
    sortField: undefined,
    sortOrder: undefined,
    rows: [],
    selectedRows: [],
    loading: false,
    error: null,
    total: 0,

    changeSearch: (newSearch: string) => {
      set({ search: newSearch })
      void get().fetchClients() // TODO: подумать, есть ли вариант лучше
    },
    changePagination: (newPage: number, newLimit: number) => {
      set({ page: newPage, pageSize: newLimit })
      void get().fetchClients()
    },
    changeSort: (sortField?: string, sortOrder?: GridSortDirection) => {
      set({ sortField, sortOrder })
      void get().fetchClients()
    },

    setSelectionModel: (newSelectionModel: GridRowSelectionModel) => {
      set({ selectedRows: newSelectionModel })
    },

    fetchClients: async () => {
      set({ loading: true, error: null })
      try {
        const { page, pageSize, search, sortField, sortOrder } = get()
        const { data, total } = await apiAdapter.getClients({
          page: page + 1,
          limit: pageSize,
          search,
          sortOrder: sortOrder as 'asc' | 'desc' | undefined, // TODO: вынести в api-адаптер тип
          sortField,
        })
        set({
          rows: data.map(clientDtoToTableRowsMapper),
          total,
          loading: false,
        })
      } catch (error: unknown) {
        set({
          error: (error as IError).message || 'Failed to fetch users',
          loading: false,
        })
      }
    },
  })),
)
