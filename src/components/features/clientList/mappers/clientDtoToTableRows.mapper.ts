import { ClientDto } from '../../../../../../test-task-forte-21-api-adapter/src'
import { GridValidRowModel } from '@mui/x-data-grid'

export const clientDtoToTableRowsMapper = (
  dto: ClientDto,
): GridValidRowModel => ({ id: dto._id, ...dto })
