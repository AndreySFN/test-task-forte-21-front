import { useAuth } from '../../../shared/hooks.ts'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../api/stores/useAuthStore.ts'

export const AuthBtn = () => {
  const isAuth = useAuth()
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const handleClick = () => {
    if (isAuth) {
      logout()
    } else {
      navigate('/auth')
    }
  }
  return (
    // TODO: ошибка TS неизвестной природы. Поправить
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <Button variant="primmary" onClick={handleClick}>
      {isAuth ? 'Log out' : 'Log in'}
    </Button>
  ) // TODO: Поправить убрать хардкод
}
