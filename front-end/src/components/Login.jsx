import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error on type
    };

    const validateForm = () => {
        // Basic username validation (can be stricter if needed)
        if (formData.username.trim().length < 3) {
            setError('Username must be at least 3 characters.');
            return false;
        }
        // Password validation
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await login(formData);
            console.log('Login successful:', response.data);
            alert('Login Successful!');
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>
                {error && <div className="error-message"><p>{error}</p></div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        Sign In
                    </button>
                </form>
                <p className="auth-footer">
                    Don't have an account? <Link to="/register" className="auth-link">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
