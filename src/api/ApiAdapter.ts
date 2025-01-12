import { ApiAdapter } from 'test-task-forte-21-api-adapter'

const SERVER_URI = import.meta.env.VITE_SERVER_URI

console.log(SERVER_URI)

export const apiAdapter = new ApiAdapter(SERVER_URI)
