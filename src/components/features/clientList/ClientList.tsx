import { CustomTable } from '../../organisms/customTable'
import { useEffect } from 'react'
import SearchBar from '../../molecules/searchBar/SearchBar.tsx'
import { CLIENT_LIST_TABLE_COLUMNS } from '../../../consts'
import { useClientListStore } from './stores'
import { useNavigate } from 'react-router-dom'

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
    // setSelectionModel, //TODO: до работы с аутентификацикей
    selectedRows,
  } = useClientListStore()

  const navigate = useNavigate()

  useEffect(() => {
    void fetchUsers()
  }, [fetchUsers])

  return (
    <>
      <SearchBar searchCallback={changeSearch} />
      {error ? (
        error
      ) : (
        <CustomTable
          onDoubleCellClick={(val) => navigate(`/clients/${val.id}`)}
          selectionModel={selectedRows}
          //onSelectionModelChange={setSelectionModel} // TODO: Должно пробрасоваться только если пользователь авторизован
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
