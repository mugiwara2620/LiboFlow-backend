import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPag() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                setError('Please enter both email and password.');
                return;
            }

            const response = await axios.post('http://localhost:8081/api/v1/auth/signin', { email, password });

            // Store JWT
            localStorage.setItem('token', response.data.jwt);

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Invalid email or password.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default LoginPag;
