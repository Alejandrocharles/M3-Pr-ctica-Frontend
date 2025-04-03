import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../models/User';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/login/LoginForm';
import LoginHeader from '../components/login/LoginHeader';
import ImageBox from '../components/login/ImageBox';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const handleChange = (event) => {
        const { id, value } = event.target;
        setError('');
        setFormData(prev => ({
            ...prev,
            [id.split('-')[0]]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const user = await User.authenticate(formData.email, formData.password);
            login(user);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <Box sx={{ py: 8, px: 4}}>
                <LoginHeader error={error} />
                <LoginForm
                    formData={formData}
                    loading={loading}
                    error={error}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                />
            </Box>
            <ImageBox 
                src="https://rdlparquitectos.com//media/3339/biblioteca-tec.jpg"
                alt="The house from the offer."
            />
        </Box>
    );
}