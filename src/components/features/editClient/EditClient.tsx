import { FC } from 'react'
import { Button } from '@mui/material'
import { ClientModal } from '../../organisms/clientModal/ClientModal.tsx'
import { useEditClientStore } from './stores/useEditClientStore.ts'
import { useClientListStore } from '../../widgets/clientList/stores'

export interface IUpdateUserButtonProps {
  isDisabled: boolean
  id: string
}

export const UpdateClientButton: FC<IUpdateUserButtonProps> = ({
  isDisabled,
  id,
}) => {
  const {
    open,
    name,
    company,
    contact,
    about,
    phoneNumber,
    error,
    setOpen,
    setName,
    setCompany,
    setContact,
    setAbout,
    setPhoneNumber,
    fetchClient,
    saveClient,
    reset,
  } = useEditClientStore()

  const fetchClients = useClientListStore((state) => state.fetchClients)

  const handleOpen = async () => {
    await fetchClient(id)
    setOpen(true)
  }
  const handleClose = () => {
    reset()
  }
  const handleSave = () => {
    saveClient().then(() => {
      void fetchClients()
      handleClose()
    })
  }

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} disabled={isDisabled}>
        Update client
      </Button>

      <ClientModal
        title="Update client"
        open={open}
        error={error}
        name={name}
        company={company}
        contact={contact}
        about={about}
        phoneNumber={phoneNumber}
        onClose={handleClose}
        onSave={handleSave}
        onChangeName={setName}
        onChangeCompany={setCompany}
        onChangeContact={setContact}
        onChangeAbout={setAbout}
        onChangePhoneNumber={setPhoneNumber}
      />
    </>
  )
}
