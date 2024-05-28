import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar: React.FC<{ searchTerm: string; setSearchTerm: React.Dispatch<React.SetStateAction<string>> }> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 ml-5">
      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

export default SearchBar;