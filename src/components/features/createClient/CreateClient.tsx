import { useState } from 'react'
import { Button } from '@mui/material'
import { ClientModal } from '../../organisms/clientModal/ClientModal.tsx'
import { apiAdapter } from '../../../api'
import { IError } from '../../../types'
import { useClientListStore } from '../../widgets/clientList/stores'

export const CreateClientButton = () => {
  const fetchClients = useClientListStore((state) => state.fetchClients)
  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [contact, setContact] = useState('')
  const [about, setAbout] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setError(null)
    setOpen(false)
  }

  const handleSave = async () => {
    try {
      await apiAdapter.createClient({
        name,
        company,
        details: {
          contact,
          about,
          phoneNumber,
        },
      })
      handleClose()
    } catch (e: unknown) {
      setError((e as IError).message) // TODO: убрать
    }
    void fetchClients()
  }

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Create client
      </Button>

      <ClientModal
        title="Create new client"
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
