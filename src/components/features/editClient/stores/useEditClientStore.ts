import { create } from 'zustand'
import { apiAdapter } from '../../../../api'
import { ClientDto } from 'test-task-forte-21-api-adapter'
import {IError} from "../../../../types";

interface ClientModalState {
  open: boolean
  id: string
  name: string
  company: string
  contact: string
  about: string
  phoneNumber: string
  error?: string
  loading: boolean
  setOpen: (open: boolean) => void
  setId: (id: string) => void
  setName: (value: string) => void
  setCompany: (value: string) => void
  setContact: (value: string) => void
  setAbout: (value: string) => void
  setPhoneNumber: (value: string) => void
  setError: (value?: string) => void
  reset: () => void
  fetchClient: (id: string) => Promise<void>
  saveClient: () => Promise<void>
}

const initialState = {
  open: false,
  id: '',
  name: '',
  company: '',
  contact: '',
  about: '',
  phoneNumber: '',
  error: undefined,
  loading: false,
}

export const useEditClientStore = create<ClientModalState>((set, get) => ({
  ...initialState,
  setOpen: (open: boolean) => set({ open }),
  setId: (id: string) => set({ id }),
  setName: (value: string) => set({ name: value }),
  setCompany: (value: string) => set({ company: value }),
  setContact: (value: string) => set({ contact: value }),
  setAbout: (value: string) => set({ about: value }),
  setPhoneNumber: (value: string) => set({ phoneNumber: value }),
  setError: (value?: string) => set({ error: value }),

  reset: () => set({ ...initialState }),

  fetchClient: async (id: string) => {
    try {
      set({ loading: true, error: undefined })
      const client = await apiAdapter.getClientById(id)
      set({
        id: client._id,
        name: client.name,
        company: client.company,
        contact: client.details?.contact || '',
        about: client.details?.about || '',
        phoneNumber: client.details?.phoneNumber || '',
      })
    } catch (error: unknown) {
      let message = 'Unknown error'
      if (error && typeof error === 'object' && 'message' in error) {
        message = (error as IError).message || 'Error fetching client'
      }
      set({ error: message })
    } finally {
      set({ loading: false })
    }
  },

  saveClient: async () => {
    const { id, name, company, contact, about, phoneNumber } = get()
    try {
      set({ loading: true, error: undefined })
      const updated = await apiAdapter.updateClient(id, {
        name,
        company,
        details: {
          contact,
          about,
          phoneNumber,
        },
      } as Partial<ClientDto>)
      set({
        id: updated._id,
        name: updated.name,
        company: updated.company,
        contact: updated.details?.contact || '',
        about: updated.details?.about || '',
        phoneNumber: updated.details?.phoneNumber || '',
      })
    } catch (error: unknown) {
      set({ error: (error as IError)?.message }) // TODO: Убрать
    } finally {
      set({ loading: false })
    }
  },
}))
