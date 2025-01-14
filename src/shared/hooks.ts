import { useAuthStore } from '../api/stores/useAuthStore.ts'

export const useAuth = () => useAuthStore((state) => state.isAuthenticated)
