/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const SearchComponent = ({ setGlobalFilter, goBack, closePanel }) => {
  const [searchText, setSearchText] = useState('');

  const handleApply = () => {
    setGlobalFilter(searchText);
    closePanel();
  };

  const handleRemove = () => {
    setSearchText('');
    setGlobalFilter('');
  };

  return (
    <div className='w-full mx-auto mt-10'>
      <Button className="mb-22" onClick={goBack} color="primary">
        Go Back
      </Button>
      <TextField
        placeholder="Search..."
        fullWidth
        margin="normal"
        value={searchText}
        onChange={(e) => {
          setGlobalFilter(e.target.value)
          setSearchText(e.target.value)
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <Button variant="contained" color="primary" onClick={handleApply}>
          Apply
        </Button>
        <Button onClick={handleRemove}>
          Remove Search
        </Button>
      </div>
    </div>
  );
};

export default SearchComponent;