import { FC } from 'react'
import { Button } from '@mui/material'
import { apiAdapter } from '../../../api'
import { useClientListStore } from '../../widgets/clientList/stores'

export const DeleteClientButton: FC = () => {
  const idList = useClientListStore((state) => state.selectedRows)
  const fetchClients = useClientListStore((state) => state.fetchClients)
  const handleClick = () => {
    Promise.all(
      idList?.map((id) => apiAdapter.deleteClient(String(id))),
    ).finally(fetchClients)
  }
  return (
    <Button
      variant="contained"
      onClick={handleClick}
      disabled={idList.length === 0}
    >
      Delete
    </Button>
  )
}
