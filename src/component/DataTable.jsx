/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import sampleData from '../sampleData';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import SidePanel from './SidePanel';
import moment from 'moment';

const DataTable = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeOption, setActiveOption] = useState('');
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [grouping, setGrouping] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [filteredData, setFilteredData] = useState(sampleData);
  const [initialGroup, setInitialGroup] = useState('');

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'subcategory',
        header: 'Subcategory',
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        Cell: ({ row }) => moment(row.original.createdAt).format('DD-MMM-YYYY, HH:mm'),
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        Cell: ({ row }) => moment(row.original.createdAt).format('DD-MMM-YYYY, HH:mm'),
      },
      {
        accessorKey: 'price',
        header: 'Price',
      },
      {
        accessorKey: 'sale_price',
        header: 'Sale Price',
      },
    ],
    []
  );

  useEffect(() => {
    const initialVisibility = {};
    columns.forEach(column => {
      initialVisibility[column.accessorKey] = true;
    });
    setColumnVisibility(initialVisibility);
  }, [columns]);

  const handleGroupApply = (group) => {
    setInitialGroup(group.length > 0 ? group[0] : '');
    setGrouping(group);
  };

  const openSidePanel = (option) => {
    setActiveOption(option);
    setIsPanelOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Table</h2>
      </div>
      <MaterialReactTable
        data={filteredData}
        columns={columns}
        enableColumnOrdering={false}
        enableCellActions={true}
        enableSorting={true}
        enableGrouping={true}
        enablePagination={true}
        enableColumnVisibility={true}
        enableFilters={true}
        manualPagination={false}
        enableColumnActions={false}
        muiPaginationProps={{
          color: 'primary',
          showRowsPerPage: false,
          shape: 'rounded',
          variant: 'outlined',
        }}
        muiTableHeadCellProps={{
          align: 'center',
        }}
        muiTableBodyCellProps={{
          align: 'center',
        }}
        muiTableFooterCellProps={{
          align: 'center',
        }}
        paginationDisplayMode='pages'
        state={{
          globalFilter,
          sorting,
          columnVisibility,
          grouping
        }}
        onGlobalFilterChange={setGlobalFilter}
        onSortingChange={setSorting}
        onGroupingChange={handleGroupApply}
        onColumnVisibilityChange={setColumnVisibility}
        renderTopToolbar={() => (
          <div className="flex justify-end">
            <IconButton onClick={() => openSidePanel('search')}>
              <SearchIcon />
            </IconButton>
            <IconButton onClick={() => openSidePanel('sort')}>
              <SwapVertIcon />
            </IconButton>
            <IconButton onClick={() => openSidePanel('filter')}>
              <FilterListIcon />
            </IconButton>
            <IconButton onClick={() => openSidePanel('toggleColumns')}>
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={() => openSidePanel('group')}>
              <GroupWorkIcon />
            </IconButton>
          </div>
        )}
      />
      <SidePanel
        open={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        columns={columns}
        data={sampleData}
        setGlobalFilter={setGlobalFilter}
        setFilter={setFilteredData}
        setSorting={setSorting}
        setGrouping={setGrouping}
        activeOption={activeOption}
        setActiveOption={setActiveOption}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        initialGroup={initialGroup}
      />
    </div>
  );
};

export default DataTable;