import { CustomTable } from '../../organisms'
import { useEffect } from 'react'
import SearchBar from '../../molecules/searchBar/SearchBar.tsx'
import { CLIENT_LIST_TABLE_COLUMNS } from '../../../consts'
import { useClientListStore } from './stores'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../api/stores/useAuthStore.ts'
import { Box } from '@mui/material'
import { CreateClientButton } from '../../features/addClient/AddClient.tsx'
import { UpdateClientButton } from '../../features/editClient/EditClient.tsx'

export const ClientList = () => {
  const {
    pageSize,
    page,
    sortField,
    sortOrder,
    changePagination,
    changeSort,
    changeSearch,
    rows,
    total,
    loading,
    error,
    fetchUsers,
    setSelectionModel,
    selectedRows,
  } = useClientListStore()

  const isAuth = useAuthStore((state) => state.isAuthenticated)

  const navigate = useNavigate()

  useEffect(() => {
    void fetchUsers()
  }, [fetchUsers])

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
            isDisabled={selectedRows.length !== 1}
            id={String(selectedRows[0])}
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
