import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import api from '../../services/api';

const AddPlayerForm: React.FC = () => {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/players', { name, tag });
      alert('Player added successfully!');
      setName('');
      setTag('');
    } catch (error) {
      console.error('Error adding player:', error);
      alert('Failed to add player.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        sx={{ mr: 2 }}
      />
      <TextField
        label="Tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        required
        sx={{ mr: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Player
      </Button>
    </form>
  );
};

export default AddPlayerForm;