import { Button } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export interface IClientDetailsBtnProps {
  isDisabled?: boolean
  id?: string
}

export const ClientDetailsBtn: FC<IClientDetailsBtnProps> = ({
  id,
  isDisabled,
}) => {
  const navigate = useNavigate()
  // TODO: Вынести роуты в перечисление Show details
  return (
    <Button
      variant="contained"
      disabled={isDisabled}
      onClick={() => navigate(`/clients/${id}`)}
    >
      Show details
    </Button>
  )
}
