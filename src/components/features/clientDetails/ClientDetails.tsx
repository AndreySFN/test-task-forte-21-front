import { CustomModal } from '../../organisms'
import { useClientDetailsStore } from './stores/useClientDetailsStore.ts'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import withLoaderOverlay from '../../HOC/withLoaderOverlay.tsx'
import { clientDtoToModalElements } from './mappers/clientDtoToModalElement.ts'

const Modal = withLoaderOverlay(CustomModal)

export const ClientDetails = () => {
  const { loading, client, fetchClient, error, isOpen, setIsOpen } =
    useClientDetailsStore()
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      setIsOpen(true)
      void fetchClient(id)
    }
  }, [fetchClient, id, setIsOpen])

  return (
    <Modal
      data={clientDtoToModalElements(client)}
      isLoading={loading}
      title="Client details"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      {error}
      {!id && 'Wrong client ID'}
    </Modal>
  )
}
