/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Drawer, Button, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import TocIcon from '@mui/icons-material/Toc';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import SearchComponent from './Functions/SearchComponent';
import SortComponent from './Functions/SortComponent';
import GroupComponent from './Functions/GroupComponent';
import FilterComponent from './Functions/FilterComponent';
import ColumnVisibilityToggle from './Functions/ColumnVisibilityToggleComponent';

const SidePanel = ({
  open,
  onClose,
  columns,
  setFilter,
  data,
  setGlobalFilter,
  setSorting,
  setGrouping,
  activeOption,
  setActiveOption,
  columnVisibility,
  setColumnVisibility,
  initialGroup,
}) => {

  const handleOptionSelect = (option) => {
    setActiveOption(option);
  };

  const goBack = () => {
    setActiveOption('');
  };

  const getTitle = () => {
    switch (activeOption) {
      case 'search':
        return 'Search';
      case 'sort':
        return 'Sort';
      case 'group':
        return 'Group';
      case 'filter':
        return 'Filter';
      case 'toggleColumns':
        return 'Toggle Columns';
      default:
        return 'Options';
    }
  };

  const renderActiveOption = () => {
    switch (activeOption) {
      case 'search':
        return <SearchComponent setGlobalFilter={setGlobalFilter} goBack={goBack} closePanel={onClose} />;
      case 'sort':
        return <SortComponent columns={columns} setSorting={setSorting} goBack={goBack} />;
      case 'group':
        return <GroupComponent columns={columns} setGrouping={setGrouping} goBack={goBack} closePanel={onClose} initialGroup={initialGroup} />;
      case 'filter':
        return <FilterComponent goBack={goBack} setFilter={setFilter} data={data} closePanel={onClose} />;
      case 'toggleColumns':
        return <ColumnVisibilityToggle columns={columns} columnVisibility={columnVisibility} setColumnVisibility={setColumnVisibility} goBack={goBack} />;
      default:
        return renderOptions();
    }
  };

  const renderOptions = () => (
    <div className='flex flex-col justify-center gap-6'>
      <Button
        startIcon={<SearchIcon />}
        fullWidth
        onClick={() => handleOptionSelect('search')}
        variant="contained"
        color="primary"
        >
        Search
      </Button>
      <Button
        startIcon={<SortIcon />}
        fullWidth
        onClick={() => handleOptionSelect('sort')}
        variant="contained"
        color="primary"
      >
        Sort
      </Button>
      <Button
        startIcon={<WorkspacesIcon />}
        fullWidth
        onClick={() => handleOptionSelect('group')}
        variant="contained"
        color="primary"
      >
        Group
      </Button>
      <Button
        startIcon={<FilterListIcon />}
        fullWidth
        onClick={() => handleOptionSelect('filter')}
        variant="contained"
        color="primary"
      >
        Filter
      </Button>
      <Button
        startIcon={<TocIcon />}
        fullWidth
        onClick={() => handleOptionSelect('toggleColumns')}
        variant="contained"
        color="primary"
      >
        Toggle Columns
      </Button>
    </div>
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className='w-[550px] p-10 text-center'>
        <h3 className='font-bold text-4xl mb-8 text-gray-900 mb-10'>{getTitle()}</h3>
        {renderActiveOption()}
      </div>
    </Drawer>
  );
};

export default SidePanel;