import React, { useState } from 'react';
import axios from 'axios';
import './QuestionForm.css';
import { useNavigate } from 'react-router-dom';

interface QuestionFormProps {
  onSubmitSuccess: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmitSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/questions', { email, question });
      setEmail('');
      setQuestion('');
      alert('Your question is submitted.');
      onSubmitSuccess();
      navigate('/deletequestion');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Failed to submit your question. Please try again.');
      } else {
        setError('Failed to submit your question. Please try again.');
      }
    }
  };

  return (
    <div className="question-form">
      <h2>Ask a Question</h2>
      {error && <p className="error">{error}</p>}
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
          <label htmlFor="question">Question:</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuestionForm;
