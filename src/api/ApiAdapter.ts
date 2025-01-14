import { ApiAdapter } from 'test-task-forte-21-api-adapter'

const VITE_SERVER_URI = import.meta.env.VITE_SERVER_URI

if (!VITE_SERVER_URI) {
  throw new Error('VITE_SERVER_URI does not exist in environment')
}

export const apiAdapter = new ApiAdapter(VITE_SERVER_URI) // TODO: Поправить авторизацию, слетает при перезагрузке
apiAdapter.getInstance().interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/auth'
    }
    return Promise.reject(error)
  },
)