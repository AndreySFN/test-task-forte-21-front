import { ApiAdapter } from 'test-task-forte-21-api-adapter'
import { IAuthState } from './stores/useAuthStore.ts'

const VITE_SERVER_URI = import.meta.env.VITE_SERVER_URI

if (!VITE_SERVER_URI) {
  throw new Error('VITE_SERVER_URI does not exist in environment')
}

let token = null
try {
  token = (
    JSON.parse(localStorage.getItem('auth-store') || '') as {
      state: IAuthState
    }
  )?.state?.token // TODO: Костыльный костыль. Убрать
} catch {
  // do nothing TODO: Убрать
}

export const apiAdapter = new ApiAdapter(VITE_SERVER_URI, String(token))
apiAdapter.getInstance().interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/auth'
    }
    return Promise.reject(error)
  },
)
