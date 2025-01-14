import React, { useState } from 'react'
import { Box, TextField, Button, Typography, Alert } from '@mui/material'
import { useAuthStore } from '../../../api/stores/useAuthStore.ts'
import { useNavigate } from 'react-router-dom'

export const Auth: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = useAuthStore((state) => state.login)
  const error = useAuthStore((state) => state.error)
  const navigate = useNavigate()
  const handleLogin = async () => {
    await login(username, password)
    navigate('/clients') // TODO: Вынести хардкод роутов
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        p={4}
        bgcolor="white"
        borderRadius={2}
        boxShadow={3}
        width="100%"
        maxWidth={400}
      >
        <Typography variant="h4" textAlign="center" marginBottom={2}>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          required
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          disabled={!username || !password}
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  )
}
