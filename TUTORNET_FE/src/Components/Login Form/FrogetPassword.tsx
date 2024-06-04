import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FrogetPassword.css'; // Assuming CSS module import

import FrogetImage from '../images/FrogetPassword.jpeg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



const FrogetPassword: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(true);
  
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit =async  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
    } else {
      setErrorMessage('');

      try {
        const response = await fetch('http://localhost:5000/api/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
          setSuccessMessage('Password reset email sent. Please check your inbox.');
        } else {
            setErrorMessage(data.message || 'An error occurred');
        }
    } catch (error) {
        console.error('Error during forgot password:', error);
        setErrorMessage('Internal server error.');
    }
};

  }
  const handleCloseForm = () => {
    setIsFormOpen(false);
    navigate('/');
  };

  return (
    <div className={`forgot-password-container ${!isFormOpen && 'hidden'}`}>
      <div className="image-containerF">
        <img src={FrogetImage} alt="forget-image" />

        <div className="form-containerf">
          <Link to="/" style={{ color: 'black' }}>
            BackToHome
          </Link>
          <h1>Forgot Password?</h1>
          <p>
            Enter your email address and we'll send you instructions on how to
            reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button type="submit" className="frogetf-btn">
              Submit
            </button>
          </form>
          <button type="button" className="frogetf-close-icon-btn" onClick={handleCloseForm}>
            <FontAwesomeIcon icon={faTimes} className="frogetf-close-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrogetPassword;
