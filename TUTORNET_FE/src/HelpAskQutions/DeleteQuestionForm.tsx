import React, { useState } from 'react';
import axios from 'axios';
import './DeleteQuestionForm.css';
import { useNavigate } from 'react-router-dom';

const DeleteQuestionForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/questions/delete', { email, password });
      setMessage(response.data.message);
      alert('Your question is deleted.');
      navigate('/');
    }  catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setMessage(err.response.data.message || 'Failed to delete your question. Please try again.');
        alert('Failed to delete your question. Please try again.');
        navigate('/deletequestion');
      } else {
        alert('Failed to delete your question. Please try again.');
        setMessage('Failed to delete your question. Please try again.');
        navigate('/deletequestion');
      }
    }
  };

  return (
    <div className="delete-question-form">
      <h2>Delete Your Question</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete</button>
        <button type="button" onClick={() => (window.location.href = '/')}>Not Now</button>
      </form>
    </div>
  );
};

export default DeleteQuestionForm;
