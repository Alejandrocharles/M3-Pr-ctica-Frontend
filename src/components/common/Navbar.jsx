import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static" sx={{ width: '100%' }}>
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    Student Portal
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mr: 4 }}>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/contact">Contact</Button>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton color="inherit" size="small">
                        <AccountCircleIcon />
                    </IconButton>
                    <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {user?.username || user?.email}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout} size="small">
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
