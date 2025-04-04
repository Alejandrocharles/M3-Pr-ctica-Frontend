import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function StatsCard({ title, value }) {
    return (
        <Card sx={{ height: 200, width: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'    }}>
            <CardContent>
                <Typography color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h4">
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
} 