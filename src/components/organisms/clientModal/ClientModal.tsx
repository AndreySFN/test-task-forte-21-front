import { FC } from 'react'
import {
  TextField,
  Button,
  DialogTitle,
  DialogActions,
  Dialog,
  DialogContent,
  Alert,
} from '@mui/material'

interface IClientModalProps {
  title?: string
  open: boolean
  name: string
  company: string
  contact: string
  about: string
  phoneNumber: string
  error?: string | null

  onClose: () => void
  onSave: () => void

  onChangeName: (value: string) => void
  onChangeCompany: (value: string) => void
  onChangeContact: (value: string) => void
  onChangeAbout: (value: string) => void
  onChangePhoneNumber: (value: string) => void
}

export const ClientModal: FC<IClientModalProps> = ({
  open,
  name,
  company,
  contact,
  about,
  phoneNumber,
  onClose,
  onSave,
  onChangeName,
  onChangeCompany,
  onChangeContact,
  onChangeAbout,
  onChangePhoneNumber,
  error,
  title,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      {error && <Alert severity="error">{error}</Alert>}
      <DialogContent>
        <TextField
          required
          fullWidth
          margin="normal"
          label="Name"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          label="Company"
          value={company}
          onChange={(e) => onChangeCompany(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Contact"
          value={contact}
          onChange={(e) => onChangeContact(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="About"
          value={about}
          onChange={(e) => onChangeAbout(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          value={phoneNumber}
          onChange={(e) => onChangePhoneNumber(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button sx={{ mr: 2 }} onClick={onClose}>
          Отмена
        </Button>
        <Button variant="contained" onClick={onSave}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
