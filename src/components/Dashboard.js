// src/components/Dashboard.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Grid, Box, Button, MenuItem, FormControl, Select } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import WidgetCard from './WidgetCard';
import AddWidgetModal from './AddWidgetModal';
import CategoryModal from './CategoryModal';
import SearchBar from './SearchBar';
import { useDashboard } from '../contexts/DashboardContext';

const Dashboard = () => {
  const { categories, addWidget, removeWidget } = useDashboard();
  const [openAddWidgetModal, setOpenAddWidgetModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [timeFilter, setTimeFilter] = useState(2);

  const handleOpenAddWidgetModal = (categoryId) => {
    setSelectedCategory(categoryId);
    setOpenAddWidgetModal(true);
  };

  const handleAddWidget = (widget) => {
    addWidget(selectedCategory, widget);
    setOpenAddWidgetModal(false);
  };

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const results = categories
      .map((category) => ({
        ...category,
        widgets: category.widgets.filter(
          (widget) =>
            widget.name.toLowerCase().includes(lowerCaseQuery) ||
            widget.description.toLowerCase().includes(lowerCaseQuery)
        ),
      }))
      .filter((category) => category.widgets.length > 0);

    setSearchResults(results);
  };

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f0f4ff', minHeight: '100vh' }}>
      {/* Top Bar */}
      <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none', minHeight: '56px' }}>
        <Toolbar sx={{ minHeight: '56px' }}>
          <Typography variant="subtitle2" component="div" sx={{ flexGrow: 0.2, color: '#000' }}>
            Home &gt; Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <SearchBar onSearch={handleSearch} />
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton size="large" edge="end" color="inherit">
              <AccountCircle sx={{ color: '#000' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Time Filter and Add Category Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, backgroundColor: '#f0f4ff' }}>
        <Button onClick={() => setOpenCategoryModal(true)}>+ Add Category</Button>
        <FormControl sx={{ ml: 2, minWidth: 120 }}>
          <Select
            value={timeFilter}
            onChange={handleTimeFilterChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Time Filter' }}
          >
            <MenuItem value={2}>Last 2 days</MenuItem>
            <MenuItem value={7}>Last 7 days</MenuItem>
            <MenuItem value={30}>Last 30 days</MenuItem>
            <MenuItem value={365}>Last year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Main Content */}
      <Grid container spacing={4} sx={{ p: 4 }}>
        {(searchResults.length > 0 ? searchResults : categories).map((category) => (
          <Grid item xs={12} key={category.id} sx={{ marginBottom: '40px' }}>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>{category.name}</Typography>
            <Grid container spacing={3}>
              {category.widgets.map((widget) => (
                <Grid item xs={12} lg={4} md={6} key={widget.id}>
                  <WidgetCard
                    name={widget.name}
                    description={widget.description}
                    onDelete={() => removeWidget(category.id, widget.id)}
                  >
                  </WidgetCard>
                </Grid>
              ))}
              <Grid item xs={12} lg={4} md={6}>
                <Button
                  variant="outlined"
                  sx={{ height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
                  onClick={() => handleOpenAddWidgetModal(category.id)}
                >
                  + Add Widget
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <AddWidgetModal
        open={openAddWidgetModal}
        onClose={() => setOpenAddWidgetModal(false)}
        onAdd={handleAddWidget}
      />

      <CategoryModal
        open={openCategoryModal}
        onClose={() => setOpenCategoryModal(false)}
      />
    </Box>
  );
};

export default Dashboard;
