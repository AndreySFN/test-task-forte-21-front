import { CustomTable } from '../../organisms'
import { useEffect } from 'react'
import SearchBar from '../../molecules/searchBar/SearchBar.tsx'
import { CLIENT_LIST_TABLE_COLUMNS } from '../../../consts'
import { useClientListStore } from './stores'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../api/stores/useAuthStore.ts'
import { Box } from '@mui/material'
import { CreateClientButton } from '../../features/createClient/CreateClient.tsx'
import { UpdateClientButton } from '../../features/editClient/EditClient.tsx'
import { DeleteClientButton } from '../../features/deleteClient/DeleteClient.tsx'
import { ClientDetailsBtn } from '../../features/clientDetails/ClientDetailsBtn.tsx'

export const ClientList = () => {
  const {
    pageSize,
    page,
    sortField,
    sortOrder,
    changePagination,
    changeSort,
    rows,
    total,
    loading,
    error,
    fetchClients,
    setSelectionModel,
    changeSearch,
    selectedRows,
  } = useClientListStore()

  const isAuth = useAuthStore((state) => state.isAuthenticated)

  const navigate = useNavigate()

  useEffect(() => {
    void fetchClients()
  }, [fetchClients])

  return (
    <>
      <SearchBar searchCallback={changeSearch} />
      {isAuth && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-start',
            gap: 1,
            padding: '0 0 10px 0',
          }}
        >
          <CreateClientButton />
          <UpdateClientButton
            isDisabled={selectedRows.length !== 1} // TODO: Вынести проверку в утилиты
            id={String(selectedRows[0])}
          />
          <DeleteClientButton />
          <ClientDetailsBtn
            id={String(selectedRows[0])}
            isDisabled={selectedRows.length !== 1} // TODO: Вынести проверку в утилиты
          />
        </Box>
      )}
      {error ? (
        error
      ) : (
        <CustomTable
          onDoubleCellClick={(val) => navigate(`/clients/${val.id}`)}
          selectionModel={selectedRows}
          onSelectionModelChange={isAuth ? setSelectionModel : undefined} // TODO: придумать что-то получше
          total={total}
          rows={rows}
          columns={CLIENT_LIST_TABLE_COLUMNS}
          sortModel={
            sortField && sortOrder
              ? [{ field: sortField, sort: sortOrder }]
              : []
          }
          setSortModel={(model) => changeSort(model[0]?.field, model[0]?.sort)}
          paginationModel={{ page, pageSize }}
          loading={loading}
          setPaginationModel={({ page, pageSize }) =>
            changePagination(page, pageSize)
          }
        />
      )}
    </>
  )
}
