import React from 'react';
import TextField from '@mui/material/TextField';

interface SearchInputProps {
  onSearchChange: (searchTerm: string) => void;
  searchTerm: string;
}

export default function SearchInput({ onSearchChange, searchTerm }: SearchInputProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <TextField
      label="Buscar país"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearch}
      size="small"
      sx={{ 
        width: 250,
        '& .MuiInputBase-root': {
          height: 40,
          color: 'white',
        },
        '& .MuiInputLabel-root': {
          color: 'white',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white', 
        }
      }}
    />
  );
}