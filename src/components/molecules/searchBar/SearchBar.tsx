import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'

export interface ISearchBar {
  searchCallback: (vat: string) => void
}

const SearchBar: React.FC<ISearchBar> = ({ searchCallback }) => {
  const [search, setSearch] = useState('')
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        maxWidth: '600px',
        margin: '0 auto',
        padding: 2,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Enter text to search"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ whiteSpace: 'nowrap' }}
        onClick={() => searchCallback(search)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            // TODO: Убрать хардкод
            searchCallback(search)
          }
        }}
      >
        Search
      </Button>
    </Box>
  )
}

export default SearchBar
