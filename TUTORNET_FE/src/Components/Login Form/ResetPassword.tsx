import React, { useState } from 'react';
import { useNavigate,  useLocation } from 'react-router-dom';
import './ResetPassword.css';
import axios from 'axios';

const ResetPassword: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');


    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (newPassword.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        setErrorMessage('');

        try {
            await axios.post('http://localhost:5000/api/reset-password', {token, newPassword });
            navigate('/successfullPasswordChange');
        } catch (error) {
            console.error('Error during reset password:', error);
            setErrorMessage('Failed to reset password.');
            navigate('/unsuccessfullPasswordChange');
        }
    };


    return (
        <div className="reset-password-container">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="new-password">New Password:</label>
                <input
                    type="password"
                    id="new-password"
                    name="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
