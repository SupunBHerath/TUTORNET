import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

interface FormErrors {
  email: string;
  comment: string;
}

const ContactUsForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    comment: ''
});

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = {
      email: '',
      comment: '',
    };

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    // Comment validation
    if (!comment) {
      newErrors.comment = 'Comment is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (validateForm()) {
      // Submit form data
      console.log('Form submitted:', { email, comment });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='  w-75'  >
      <Typography variant="h5" gutterBottom>
       
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
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
      <Button type="submit" variant="outlined" color="primary" className='w-100 p-2 mt-4'>
        Submit
      </Button>
    </form>
  );
};

export default ContactUsForm;
