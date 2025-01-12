import React from 'react'
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridValidRowModel,
} from '@mui/x-data-grid'
import { GridSortModel } from '@mui/x-data-grid/models/gridSortModel'
import { DEFAULT_PAGE_SIZE_OPTIONS } from '../../consts/pagination.ts'

export interface ICustomTableProps {
  sortModel: GridSortModel
  setSortModel: (model: GridSortModel) => void
  paginationModel: GridPaginationModel
  setPaginationModel: (model: GridPaginationModel) => void
  loading: boolean
  rows: GridValidRowModel[]
  columns: GridColDef[]
  total: number
}

export const CustomTable: React.FC<ICustomTableProps> = (props) => {
  const {
    sortModel,
    setSortModel,
    paginationModel,
    setPaginationModel,
    loading,
    rows,
    columns,
    total,
  } = props
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        loading={loading}
        columns={columns}
        paginationMode="server"
        sortingMode="server"
        hideFooterSelectedRowCount
        pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        disableColumnMenu
        rowCount={total}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
      />
    </div>
  )
}
