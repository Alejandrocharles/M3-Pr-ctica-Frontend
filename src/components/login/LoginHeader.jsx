import React from 'react';
import { Typography, Alert } from '@mui/material';

export default function LoginHeader({ error }) {
    return (
        <>
            <Typography variant="h3">Welcome back!</Typography>
            <br />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Typography variant="body1">Please enter your email and password</Typography>
            <br />
        </>
    );
} 