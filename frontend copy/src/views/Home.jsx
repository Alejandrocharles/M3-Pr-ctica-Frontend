import React from 'react';
import { Box, Grid, Container } from '@mui/material';
import WelcomeCard from '../components/dashboard/WelcomeCard';
import StatsCard from '../components/dashboard/StatsCard';

export default function Home() {
    return (
        <Box sx={{ flexGrow: 1, p: 3, height: '80vh', backgroundColor: '#f5f5f5' }}>
            <Container>
                <WelcomeCard />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <StatsCard title="Courses" value="6" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatsCard title="Assignments" value="12" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatsCard title="Average" value="89%" />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
