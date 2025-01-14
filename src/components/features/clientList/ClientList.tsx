import { CustomTable } from '../../organisms'
import { useEffect } from 'react'
import SearchBar from '../../molecules/SearchBar.tsx'
import { CLIENT_LIST_TABLE_COLUMNS } from '../../../consts'
import { useClientListStore } from './stores/useClientListStore.ts'

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
  } = useClientListStore()

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
