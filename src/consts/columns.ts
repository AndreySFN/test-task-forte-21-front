import { GridColDef } from '@mui/x-data-grid'

export const CLIENT_LIST_TABLE_COLUMNS: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'company', headerName: 'Company', width: 150 },
]
