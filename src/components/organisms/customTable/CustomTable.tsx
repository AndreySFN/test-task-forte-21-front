import React from 'react'
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRowSelectionModel,
  GridValidRowModel,
} from '@mui/x-data-grid'
import { GridSortModel } from '@mui/x-data-grid/models/gridSortModel'
import { DEFAULT_PAGE_SIZE_OPTIONS } from '../../../consts'
import {Box} from "@mui/material";

export interface ICustomTableProps {
  sortModel: GridSortModel
  paginationModel: GridPaginationModel
  loading: boolean
  rows: GridValidRowModel[]
  columns: GridColDef[]
  total: number
  setSortModel: (model: GridSortModel) => void
  setPaginationModel: (model: GridPaginationModel) => void
  onSelectionModelChange?: (selectionModel: GridRowSelectionModel) => void
  selectionModel?: GridRowSelectionModel
  onDoubleCellClick?: (val: GridValidRowModel) => void
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
    onSelectionModelChange,
    selectionModel,
    onDoubleCellClick,
  } = props

  const isCheckboxSelectionEnabled = !!onSelectionModelChange

  return (
    <Box sx={{ width: '100%' }}>
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
        checkboxSelection={isCheckboxSelectionEnabled}
        onRowSelectionModelChange={onSelectionModelChange}
        rowSelectionModel={selectionModel}
        onCellDoubleClick={onDoubleCellClick}
      />
    </Box>
  )
}
