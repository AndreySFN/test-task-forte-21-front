import { AppBar, Toolbar, Typography } from '@mui/material'
import { FC } from 'react'
import { AuthBtn } from '../features/authBtn/AuthBtn.tsx'
import { useNavigate } from 'react-router-dom'

export const Header: FC = () => {
  const navigate = useNavigate()
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Typography
          sx={{ cursor: 'pointer' }}
          variant="h6"
          component="div"
          onClick={() => navigate('/clients')}
        >
          Forte-21 test task
        </Typography>
        <AuthBtn />
      </Toolbar>
    </AppBar>
  )
}
