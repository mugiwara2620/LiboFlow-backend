import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPag() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [role, setRole] = useState('ROLE_CUSTOMER');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            if (!fullName || !email || !password || !confirmPassword || !mobile) {
                setError('Fill all fields.');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }

            let ro = null;

            if(role == "ROLE_ADMIN"){
                ro = "admin"
            }else{
                ro = "user"
            }
            const response = await axios.post(`http://localhost:8081/api/v1/auth/${ro}/signup`, {
                "firstName" : fullName, "email": email, "password" : password, "role" : role
            });

//             localStorage.setItem('token', response.data.jwt);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Signup failed.');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <input placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="ROLE_USER">User</option>
                <option value="ROLE_ADMIN">Admin</option>
            </select>
            <button onClick={handleSignup}>Sign Up</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default SignupPag;
