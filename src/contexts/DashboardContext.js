// src/contexts/DashboardContext.js
import React, { useState, createContext, useContext } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 1, name: 'Widget 1', description: 'Description 1' },
        { id: 2, name: 'Widget 2', description: 'Description 2' },
        { id: 3, name: 'Widget 3', description: 'Description 3' },
      ],
    },
  ]);

  const addWidget = (categoryId, widget) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, { id: Date.now(), ...widget }] }
          : category
      )
    );
  };

  const removeWidget = (categoryId, widgetId) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter((widget) => widget.id !== widgetId),
            }
          : category
      )
    );
  };

  const addCategory = (name) => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { id: Date.now(), name, widgets: [] },
    ]);
  };

  const updateCategoryWidgets = (updatedWidgets) => {
    const updatedCategories = categories.map((category) => {
      if (updatedWidgets[category.id]) {
        return {
          ...category,
          widgets: category.widgets.filter(widget => updatedWidgets[category.id][widget.id])
        };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  return (
    <DashboardContext.Provider value={{ categories, addWidget, removeWidget, addCategory,updateCategoryWidgets }}>
      {children}
    </DashboardContext.Provider>
  );
};
