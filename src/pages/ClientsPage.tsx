import { Outlet } from 'react-router-dom'
import { ClientList } from '../components/features/clientList'

export const ClientsPage = () => {
  return (
    <>
      <ClientList />
      <Outlet />
    </>
  )
}
