// src/components/WidgetCard.js
import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const WidgetCard = ({ name, description, onDelete }) => {
  return (
    <Card sx={{ height: '150px',minWidth: 275,position: 'relative' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <IconButton onClick={onDelete} sx={{ position: 'absolute', top: 0, right: 0 }}>
        <CloseIcon />
      </IconButton>
    </Card>
  );
};

export default WidgetCard;
