import { Outlet } from 'react-router-dom'
import { ClientList } from '../components/widgets/clientList'

export const ClientsPage = () => {
  return (
    <>
      <ClientList />
      <Outlet />
    </>
  )
}
