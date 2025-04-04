import React, { useState, useEffect } from 'react';
import { 
  Box, TextField, Button, Typography, 
  Paper, Grid, Alert 
} from '@mui/material';
import { User } from '../../models/User';

export default function UserForm({ onUserAdded, editUser = null, onCancel = null }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const isEditMode = !!editUser;

  useEffect(() => {
    if (editUser) {
      setFormData({
        username: editUser.username || '',
        email: editUser.email || '',
        password: ''
      });
    }
  }, [editUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isEditMode) {
        await User.update(editUser._id, {
          username: formData.username,
          email: formData.email,
          ...(formData.password ? { password: formData.password } : {})
        });
        setSuccess('User updated successfully!');
      } else {
        await User.register(
          formData.username,
          formData.email,
          formData.password
        );
        setSuccess('User created successfully!');
        setFormData({
          username: '',
          email: '',
          password: ''
        });
      }
      
      if (onUserAdded) {
        onUserAdded();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {isEditMode ? 'Edit User' : 'Add New User'}
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required={!isEditMode}
              name="password"
              label={isEditMode ? "New Password (leave blank to keep current)" : "Password"}
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update User' : 'Create User')}
            </Button>
            
            {isEditMode && onCancel && (
              <Button
                variant="outlined"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
} 