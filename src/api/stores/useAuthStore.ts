import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { apiAdapter } from '../ApiAdapter.ts'

interface IAuthState {
  token: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  error: string | null
  isAuthenticated: boolean
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      token: null,
      error: null,
      isAuthenticated: false,
      login: async (username: string, password: string) => {
        try {
          const token = await apiAdapter.authenticate(username, password)
          set({ token, error: null, isAuthenticated: true })
        } catch (err: unknown) {
          set({ error: (err as Error).message, isAuthenticated: false })
        }
      },
      logout: () => set({ token: null, error: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
    },
  ),
)
