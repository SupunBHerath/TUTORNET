import React from 'react';
import './UnsuccessFullRegistere.css'; // Assuming CSS module import
import success from '../images/Success.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTimes } from '@fortawesome/free-solid-svg-icons';

interface PasswordChangeSuccessProps {} // No props for this component

const PasswordChangeSuccess: React.FC<PasswordChangeSuccessProps> = () => {
  const handleClose = () => {
    window.location.href = '/signin';
  };

  return (
    <div className="container">
      <div className="close-icon-container" onClick={handleClose}>
        <FontAwesomeIcon icon={faTimes} className="close-icon" />
      </div>
      <div className="image-container">
        <img src={success} alt="success image" />
      </div>
      <div className="message-container">
        <h1>Password Change Successfully</h1>
      </div>
      <div className="button-container">
        <a href="/" className="button back-to-home">
          <FontAwesomeIcon icon={faHome} /> Back to Home
        </a>
      </div>
    </div>
  );
};

export default PasswordChangeSuccess;
