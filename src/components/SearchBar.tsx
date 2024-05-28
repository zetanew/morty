import React from 'react';
import TextField from '@mui/material/TextField';

const SearchBar: React.FC<{ searchTerm: string; setSearchTerm: React.Dispatch<React.SetStateAction<string>> }> = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextField
      label="Search by name"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}

export default SearchBar;