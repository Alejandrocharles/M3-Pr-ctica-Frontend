import React from 'react';
import { Box } from '@mui/material';

export default function ImageBox({ src, alt }) {
    return (
        <Box
            component="img"
            sx={{
                height: '90vh',
                width: '50%',
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: 8
            }}
            alt={alt}
            src={src}
        />
    );
} 