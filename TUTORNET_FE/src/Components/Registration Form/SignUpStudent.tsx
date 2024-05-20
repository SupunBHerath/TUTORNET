import React, { useState } from 'react';
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
}

const SignUpStudent: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const navigate = useNavigate();
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
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Implement form validation and API call logic here
    // ...

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Signup successful!');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
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
            <label htmlFor="subject">stream:</label>
            <select id="Stream" name="stream">
              <option value="">Select Stream</option>
              <option value="Sinhala">Sinhala</option>
              <option value="English">English </option>
          <option value="Tamil">Tamil </option>
         
        </select>
      </div>
          
          <div className="form-group">
        <label htmlFor="subject">Subject:</label>
        <select id="subject" name="subject">
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
        <select id="district" name="district">
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
