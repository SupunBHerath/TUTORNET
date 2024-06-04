import React, { useState } from 'react';
import axios from 'axios';
import './SignUpT$S.css'; // Assuming CSS module import
import SignUpStudentImage from '../images/SignUpStudent.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface SignUpStudentFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobileNumber: string;
  subject: string;
  stream: string;
  district: string;
  terms: boolean;
  role: string;
}

const SignUpStudent: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(true);
 
  const [formData, setFormData] = useState<SignUpStudentFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    subject: '',
    stream: '',
    district: '',
    terms: false,
    role: 'student',
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    if (type === 'checkbox') {
      const { checked } = event.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const validateEmail = (email: string) => {
    const re = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
  const validateMobileNumber = (number: string) => {
    const re = /^\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return re.test(number);
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword, mobileNumber, subject, stream, district, terms } = formData;

    if (!name || !email || !password || !confirmPassword || !mobileNumber || !subject || !stream || !district) {
      return 'Please fill in all required fields.';
    }
    if (!validateEmail(email)) {
      return 'Please enter a valid email address.';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    if (!validateMobileNumber(mobileNumber)) {
      return 'Please enter a valid mobile number.';
    }
    if (!terms) {
      return 'You must agree to the terms and conditions.';
    }
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const error = validateForm();
    if (error) {
      setError(error);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup-student', formData);
      if (response.status === 201) {
        setSuccessMessage('Signup successful! Redirecting to sign in page...');
        setTimeout(() => navigate('/successfullRegistere'), 3000);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred during signup. Please try again.');
      }
      navigate('/unsuccessfullRegistere', {
        state: { errorMessage: error.response.data.message || 'An unexpected error occurred during signup. Please try again.' },
      });
    }
  };

    

  const handleCloseForm = () => {
    setIsFormOpen(false);
    navigate('/');
  };

  return (
    <div className={`containers ${!isFormOpen && 'hidden'}`}>
      <div className="form-wrapper">
        <img src={SignUpStudentImage} alt="Sign up student" className="form-image" />

        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="kevin fenando"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="**********"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="**********"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tel">MobileNumber:</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              placeholder="077 xxxx xxx"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="stream">stream:</label>
            <select id="stream" name="stream" value={formData.stream} onChange={handleChange} required>
              <option value="">Select Stream</option>
              <option value="Sinhala">Sinhala</option>
              <option value="English">English </option>
          <option value="Tamil">Tamil </option>
         
        </select>
      </div>
          
          <div className="form-group">
        <label htmlFor="subject">Subject:</label>
        <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required>
          <option value="">Select Subject</option>
          <option value="Mathematics">Mathematics(e.g,Physics,Chemistry,Pure Mathematics,Combine Mathematics)</option>
          <option value="science">Science (e.g., Physics, Chemistry, Biology)</option>
          <option value="Technology">Technology (e.g., SFT, ICT, ET)</option>
          <option value="ART">ART (e.g., Sinhala, Political Science, Geography)</option>
          <option value="Commerce">Commerce (e.g., Accounting, BussnessStudy, Economics)</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="District">District:</label>
        <select id="district" name="district" value={formData.district} onChange={handleChange} required>
          <option value="">Select District</option>
          <option value="Galle">Galle</option>
          <option value="Hambanthota">Hambanthota </option>
          <option value="Mathara">Mathara </option>
          <option value="Colombo">Colombo </option>
          <option value="Gamphaha">Gamphaha </option>
          <option value="Kaluthara">Kaluthara</option>

        </select>
      </div>
       
        <div className="form-group-checkbox">
         <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms" style={{ color: '#004aad' }}>I agree to the terms and conditions</label>
             <Link to="/forgetPassword" className="forgot-password-link" style={{ color: '#f6921e' }}>Terms&Con</Link>
             </div>
             {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
        <button  type="submit" className="signupbutton">Register</button>
        <p style={{ color: '#004aad' }}>Already have an account?  <Link to="/signin" style={{ color: '#f6921e' }}>SignIn</Link></p>
      </form>
      <button type="button" className="signup-close-icon-btn" onClick={handleCloseForm}>
            <FontAwesomeIcon icon={faTimes} className="signin-close-icon" />
          </button>
      </div>
      
    </div>
  );
};

export default SignUpStudent;
