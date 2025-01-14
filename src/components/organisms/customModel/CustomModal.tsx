import React, { ReactNode } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import { IModalElement } from './types/ModalElement.ts'

export interface ICustomModalProps {
  title?: string
  data?: IModalElement[]
  onClose?: () => void
  isOpen?: boolean
  children?: ReactNode
}

export const CustomModal: React.FC<ICustomModalProps> = ({
  title,
  data,
  onClose,
  isOpen,
  children,
}) => {
  return (
    <Dialog
      sx={{ padding: 10 }}
      open={Boolean(isOpen)}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {data?.map((elem) => (
          <Typography variant="subtitle1">
            <strong>{elem.subtitle}</strong>: {elem.value}
          </Typography>
        ))}
        {children}
      </DialogContent>
      {onClose && (
        <DialogActions>
          <Button onClick={onClose} color="primary" variant="contained">
            Закрыть
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}
