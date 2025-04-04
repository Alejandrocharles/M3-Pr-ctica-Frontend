import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

export default function WelcomeCard() {
    const { user } = useAuth();

    return (
        <Card sx={{ mb: 3, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CardContent>
                <Typography variant="h5">
                    Welcome, {user?.firstName}!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Student Dashboard
                </Typography>
            </CardContent>
        </Card>
    );
} 