import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const regions = [
  { label: "Todas las regiones", value: "all" },
  { label: "África", value: "Africa" },
  { label: "America", value: "Americas" },
  { label: "Asia", value: "Asia" },
  { label: "Europa", value: "Europe" },
  { label: "Oceanía", value: "Oceania" },
];

interface RegionFilterProps {
  onRegionChange: (region: string) => void;
}

export default function ComboBox({ onRegionChange }: RegionFilterProps) {
  const handleChange = (_: React.SyntheticEvent, value: { label: string; value: string } | null) => {
    const selectedValue = value?.value || "";
    onRegionChange(selectedValue === "all" ? "" : selectedValue);
  };

  return (
    <Autocomplete
      disablePortal
      options={regions}
      getOptionLabel={(option) => option.label}
      sx={{
        width: 200,
        '& .MuiInputBase-root': {
          height: 40,
          color: 'white',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
        '& .MuiInputLabel-root': {
          color: 'white',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        }
      }}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label="Filtrar por región"
          variant="outlined"
          size="small"
        />
      )}
    />
  );
}