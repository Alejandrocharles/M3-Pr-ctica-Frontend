import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Divider } from '@mui/material';
import UserTable from '../components/users/UserTable';
import UserForm from '../components/users/UserForm';

export default function Contact() {
    const [tabValue, setTabValue] = useState(0);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleUserAdded = () => {
        // Trigger a refresh of the user table when a new user is added
        setRefreshTrigger(prev => prev + 1);
        // Switch to the user list tab
        setTabValue(0);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                User Management
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="User List" />
                <Tab label="Add User" />
            </Tabs>
            
            {tabValue === 0 && (
                <Box key={refreshTrigger}>
                    <UserTable />
                </Box>
            )}
            
            {tabValue === 1 && (
                <UserForm onUserAdded={handleUserAdded} />
            )}
        </Box>
    );
}