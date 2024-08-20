// src/components/CategoryModal.js
import React, { useState, useEffect } from 'react';
import { Drawer, Box, Typography, Button, FormControlLabel, Checkbox, Tabs, Tab, TextField } from '@mui/material';
import { useDashboard } from '../contexts/DashboardContext';

const CategoryModal = ({ open, onClose }) => {
  const { categories, updateCategoryWidgets, addCategory } = useDashboard();
  const [selectedWidgets, setSelectedWidgets] = useState({});
  const [currentTab, setCurrentTab] = useState(0);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    // Initialize selectedWidgets with the current state of categories and widgets
    const initialSelectedWidgets = categories.reduce((acc, category) => {
      acc[category.id] = category.widgets.reduce((widgetAcc, widget) => {
        widgetAcc[widget.id] = true; // Assume all widgets are initially selected
        return widgetAcc;
      }, {});
      return acc;
    }, {});
    setSelectedWidgets(initialSelectedWidgets);
  }, [categories]);

  const handleCheckboxChange = (categoryId, widgetId) => {
    setSelectedWidgets((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [widgetId]: !prev[categoryId]?.[widgetId],
      },
    }));
  };

  const handleConfirm = () => {
    updateCategoryWidgets(selectedWidgets);
    onClose();
  };

  const handleCancel = () => {
    setSelectedWidgets({});
    onClose();
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName);
      setNewCategoryName('');
      setCurrentTab(categories.length); // Switch to the new category tab
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleCancel}
    >
      <Box sx={{ width: '50vw', padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          Manage Categories
        </Typography>

        <Tabs value={currentTab} onChange={handleTabChange} sx={{ marginBottom: 3 }}>
          {categories.map((category, index) => (
            <Tab key={category.id} label={category.name} />
          ))}
          <Tab label="Add Category" />
        </Tabs>

        {currentTab < categories.length ? (
          categories[currentTab].widgets.map((widget) => (
            <FormControlLabel
              key={widget.id}
              control={
                <Checkbox
                  checked={selectedWidgets[categories[currentTab].id]?.[widget.id] || false}
                  onChange={() =>
                    handleCheckboxChange(categories[currentTab].id, widget.id)
                  }
                />
              }
              label={widget.name}
              sx={{ display: 'block', marginLeft: 0 }}
            />
          ))
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="New Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddCategory}>
              Add Category
            </Button>
          </Box>
        )}

        {
          currentTab < categories.length && categories[currentTab].widgets.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
              <Button onClick={handleCancel} sx={{ marginRight: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleConfirm}>
                Confirm
              </Button>
            </Box>
          )
        }
        
      </Box>
    </Drawer>
  );
};

export default CategoryModal;
