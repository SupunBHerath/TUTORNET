import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';
import { Rating } from '@mui/lab';
import axios from 'axios';

interface FormErrors {
  name: string;
  comment: string;
  rating: string;
}

const ContactUsForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null); // Rating state
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    comment: '',
    rating: '',
  });
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = {
      name: '',
      comment: '',
      rating: '',
    };

    // Name validation
    if (!name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Comment validation
    if (!comment) {
      newErrors.comment = 'Comment is required';
      valid = false;
    }

    // Rating validation
    if (!rating) {
      newErrors.rating = 'Rating is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        // Simulate API call with setTimeout (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));
        const response = await axios.post('/webfeedback', { name, comment, rating });
        if (response.status === 200) {
          setName('');
          setComment('');
          setRating(null);
          setErrors({
            name: '',
            comment: '',
            rating: '',
          });
        }
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-75'>
      <TextField
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        margin="normal"
        color="primary"
      />
      <TextField
        label="Comment"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        error={!!errors.comment}
        helperText={errors.comment}
        fullWidth
        margin="normal"
        color="primary"
      />
      <Typography variant="subtitle1" gutterBottom>
        Rating
      </Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
          setErrors({ ...errors, rating: '' });
        }}
        precision={1}
        emptyIcon={<Typography variant="body2">-</Typography>}
      />
      {errors.rating && (
        <Typography variant="body2" color="error">
          {errors.rating}
        </Typography>
      )}
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        className='w-100 p-2 mt-4'
        disabled={loading} // Disable button when loading
      >
        {loading ? <CircularProgress size={24} color="primary" /> : 'Submit'}
      </Button>
    </form>
  );
};

export default ContactUsForm;
