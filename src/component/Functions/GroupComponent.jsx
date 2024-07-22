/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';


const GroupComponent = ({ columns, setGrouping, goBack, closePanel, initialGroup }) => {
  const [selectedColumn, setSelectedColumn] = useState(initialGroup);

  useEffect(() => {
    setSelectedColumn(initialGroup);
  }, [initialGroup]);

  const handleGroupChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const applyGrouping = () => {
    setGrouping(selectedColumn ? [selectedColumn] : []);
    closePanel();
  };

  const clearGrouping = () => {
    setSelectedColumn('');
    setGrouping([]);
  };

  const filterColumns = columns.filter(
    (column) => column.accessorKey === 'category' || column.accessorKey === 'subcategory'
  );

  return (
    <div>
      <Button onClick={goBack} color="primary" style={{ marginBottom: '16px' }}>
        Go Back
      </Button>
      <FormControl fullWidth variant="outlined" style={{ marginBottom: '16px' }}>
        <InputLabel id="group-by-label">Select a column to group by</InputLabel>
        <Select
          labelId="group-by-label"
          value={selectedColumn}
          onChange={handleGroupChange}
          label="Select a column to group by"
        >
          {filterColumns.map((column) => (
            <MenuItem key={column.accessorKey} value={column.accessorKey}>
              {column.header}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className='flex flex row justify-around'>
        <Button
          variant="contained"
          color="primary"
          onClick={applyGrouping}
          style={{ marginTop: 16 }}
          disabled={!selectedColumn}
        >
          Apply Grouping
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={clearGrouping}
          style={{ marginTop: 16 }}
        >
          Clear Grouping
        </Button>
      </div>
    </div>
  );
};

export default GroupComponent;