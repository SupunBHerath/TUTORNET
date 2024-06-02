import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FrogetPassword.css';
import FrogetImage from './FrogetPassword.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface ForgotPasswordProps {} 

const FrogetPassword: React.FC<ForgotPasswordProps> = () => {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
    } else {
      setErrorMessage('');
     
    }
  };

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
