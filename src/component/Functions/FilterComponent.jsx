/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, Box, Chip, OutlinedInput, Slider, Grid, Typography } from '@mui/material';
import Fuse from 'fuse.js';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};

const FilterComponent = ({ setFilter, goBack, data, closePanel }) => {
  const [filters, setFilters] = useState({
    name: '',
    category: [],
    subcategory: [],
    startDate: null,
    endDate: null,
    priceRange: [0, 1000],
    salePriceRange: [0, 1000]
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [salePriceRange, setSalePriceRange] = useState([0, 1000]);

  useEffect(() => {
    const prices = data.map(item => item.price);
    const salePrices = data.map(item => item.sale_price).filter(price => price !== undefined);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const minSalePrice = salePrices.length ? Math.min(...salePrices) : 0;
    const maxSalePrice = salePrices.length ? Math.max(...salePrices) : 1000;
    setPriceRange([minPrice, maxPrice]);
    setSalePriceRange([minSalePrice, maxSalePrice]);
    setFilters(prev => ({
      ...prev,
      priceRange: [minPrice, maxPrice],
      salePriceRange: [minSalePrice, maxSalePrice]
    }));
  }, [data]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilter = (key) => {
    setFilters(prev => ({
      ...prev,
      [key]: key === 'name' ? '' :
        key === 'category' ? [] :
          key === 'subcategory' ? [] :
            key === 'startDate' ? null :
              key === 'endDate' ? null :
                key === 'priceRange' ? priceRange :
                  key === 'salePriceRange' ? salePriceRange : prev[key]
    }));
  };

  const applyFilters = () => {
    let filteredData = data;

    // name filter (fuzzy search)
    if (filters.name) {
      const fuse = new Fuse(data, { keys: ['name'], threshold: 0.3 });
      filteredData = fuse.search(filters.name).map(result => result.item);
    }

    // category filter
    if (filters.category.length > 0) {
      filteredData = filteredData.filter(item => filters.category.includes(item.category));
    }

    // subcategory filter
    if (filters.subcategory.length > 0) {
      filteredData = filteredData.filter(item => filters.subcategory.includes(item.subcategory));
    }

    // date range filter
    if (filters.startDate || filters.endDate) {
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.createdAt);
        const startDate = filters.startDate ? new Date(filters.startDate) : null;
        const endDate = filters.endDate ? new Date(filters.endDate) : null;

        return (
          (!startDate || itemDate >= startDate) &&
          (!endDate || itemDate <= endDate)
        );
      });
    }

    // price range filter
    filteredData = filteredData.filter(item => {
      return item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1];
    });

    // sale price range filter
    filteredData = filteredData.filter(item => {
      return item.sale_price === null || (item.sale_price >= filters.salePriceRange[0] && item.sale_price <= filters.salePriceRange[1]);
    });

    setFilter(filteredData);
    closePanel();
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      category: [],
      subcategory: [],
      startDate: null,
      endDate: null,
      priceRange: priceRange,
      salePriceRange: salePriceRange
    });
    setFilter(data);
  };

  const categoryOptions = data.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index);
  const subcategoryOptions = data.map(item => item.subcategory).filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div className='w-full mt-10'>
      <Button onClick={goBack} color="primary">
        Go Back
      </Button>
      <div className='flex flex-col gap-6 mb-10'>
        <Box mb={2} sx={{ borderBottom: 0 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1">Name</Typography>
            <IconButton onClick={() => resetFilter('name')}>
              <RefreshIcon />
            </IconButton>
          </Grid>
          <TextField
            fullWidth
            margin="normal"
            value={filters.name}
            onChange={e => handleFilterChange('name', e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1">Category</Typography>
            <IconButton onClick={() => resetFilter('category')}>
              <RefreshIcon />
            </IconButton>
          </Grid>
          <FormControl fullWidth>
            <Select
              multiple
              value={filters.category}
              onChange={e => handleFilterChange('category', e.target.value)}
              input={<OutlinedInput />}
              renderValue={selected => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(value => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categoryOptions.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mb={2}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1">Subcategory</Typography>
            <IconButton onClick={() => resetFilter('subcategory')}>
              <RefreshIcon />
            </IconButton>
          </Grid>
          <FormControl fullWidth>
            <Select
              multiple
              value={filters.subcategory}
              onChange={e => handleFilterChange('subcategory', e.target.value)}
              input={<OutlinedInput />}
              renderValue={selected => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map(value => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {subcategoryOptions.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mb={2}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1">Created At</Typography>
            <IconButton onClick={() => { resetFilter('startDate'); resetFilter('endDate'); }}>
              <RefreshIcon />
            </IconButton>
          </Grid>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex" gap={2}>
              <DatePicker
                label="Start Date"
                value={filters.startDate}
                onChange={date => handleFilterChange('startDate', date)}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="End Date"
                value={filters.endDate}
                onChange={date => handleFilterChange('endDate', date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
          </LocalizationProvider>
        </Box>
        <Box style={{ width: '100%', marginBottom: '30px' }}>
          <Grid container justifyContent="space-between" alignItems="center" marginBottom="50px" width="100%">
            <Typography variant="subtitle1">Price Range</Typography>
            <IconButton onClick={() => resetFilter('priceRange')}>
              <RefreshIcon />
            </IconButton>
          </Grid>
          <Slider
            value={filters.priceRange}
            onChange={(e, newValue) => handleFilterChange('priceRange', newValue)}
            valueLabelDisplay="on"
            min={priceRange[0]}
            max={priceRange[1]}
            style={{ width: 400 }}
          />
        </Box>
        <Box style={{ width: '100%' }}>
          <Grid container justifyContent="space-between" alignItems="center" marginBottom="50px">
            <Typography variant="subtitle1">Sale Price Range</Typography>
            <IconButton onClick={() => resetFilter('salePriceRange')}>
              <RefreshIcon />
            </IconButton>
          </Grid>
          <Slider
            value={filters.salePriceRange}
            onChange={(e, newValue) => handleFilterChange('salePriceRange', newValue)}
            valueLabelDisplay="on"
            min={salePriceRange[0]}
            max={salePriceRange[1]}
            style={{ width: 400 }}
          />
        </Box>
      </div>
      <div className='flex flex-row gap-3 justify-around'>
        <Button onClick={applyFilters} variant="contained" color="primary">
          Apply Filters
        </Button>
        <Button onClick={clearFilters} color="primary">
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterComponent;