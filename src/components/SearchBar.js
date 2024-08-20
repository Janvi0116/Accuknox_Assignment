// src/components/SearchBar.js
import React, { useState } from 'react';
import { TextField, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#e6f0ff', borderRadius: '4px', width: '70%' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search widgets..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ flexGrow: 1, backgroundColor: '#e6f0ff' }}
      />
      <IconButton onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
