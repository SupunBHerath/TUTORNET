import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Alert, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordAndOtpForm: React.FC = (porp:any) => {
  const [loading, setLoading] = React.useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [verify, setVerify] = useState(false);
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null, null]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [massgen, setMassgen] = useState('')
  const [alert, setAlert] = useState(false)
  const [alert2, setAlert2] = useState(false)
  const [Id, setId] = useState('')
  const navigate = useNavigate();

  const generateOtp = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setAlert(false)

    setEmailError(false);
  };

  const handleSubmitForgotPassword = async () => {
    setAlert(false);
    setLoading(true);

    if (!email) {
      setEmailError(true);
      setLoading(false);

      setId('');
      return;
    }
    const id = generateOtp();
    setId(id);
    try {
      const res = await axios.post('/otp', { email, id });

      if (res.status === 200) {
        setTimeout(() => {
          setSubmitted(true);
          setLoading(false);

        }, 1000);
      } else if (res.status === 404) {
        setAlert(true)
      } else {
        setMassgen('Tryagin')
        setLoading(false);

      }
    } catch (err) {
      setMassgen('User not found');
      setAlert(true)
      setLoading(false);

    }
  };
  const chageEmail = async () => {
    setVerify(false);
    setSubmitted(false);
  return;

  }

  const handleChangeOtp = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDownOtp = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmitOtp = async () => {
    setLoading(true);
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 5) {
      setLoading(false);

      setAlert(true);
      setMassgen('Enter OTP Password');
      return;
    }

    try {
      const response = await axios.post('/otp/verifyOTP', { otp: enteredOtp, Id });
      if (response.status === 200) {
        setLoading(false);
        setAlert(false);
        setVerify(true);
      } else {
        setLoading(false);
        setAlert(true);
        setMassgen('Invalid OTP');
      }
    } catch (error) {
      setLoading(false);

      console.error('Error verifying OTP:', error);
      setAlert(true);
      setMassgen('Failed to verify OTP. Please try again.');
    }
  };


  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(false);
  };

  const handleSubmitNewPassword = async () => {
    setLoading(true);
    setAlert2(false);

    if (!password) {
      setLoading(false);
      setPasswordError(true);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setLoading(false);

      return;
    }
    try {
      const response = await axios.post('/otp/resetPassword', { email,password, Id });
      if (response.status === 200) {
        setLoading(false);
        setAlert(false);
        setAlert2(true);
        setMassgen('Password updated successfully.');
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 2000);

      } else {
        setAlert2(false);
        setLoading(false);
        setAlert(true);
        setMassgen('Failed to reset password. Please try again.');
      }
    } catch (e) {
      setAlert2(false);
      setAlert(true);
      setMassgen('Failed to reset password. Please try again.');
      setLoading(false);

    }
  };

  if (submitted && !verify) {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <IconButton onClick={chageEmail}>
          <MailIcon /> 
        </IconButton>
        {alert &&
          <Alert severity='error'>{massgen}</Alert>}
        <br />
        <h6 className='text-center text-danger'> [OTP is valid for 5 minutes ]</h6>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={el => (inputRefs.current[index] = el)}
              margin="normal"
              variant="outlined"
              type="text"
              size="small"
              style={{ margin: '0 5px', width: 40 }}
              autoFocus={index === 0}
              value={digit}
              onChange={(e) => handleChangeOtp(index, e.target.value)}
              onKeyDown={(e) => handleKeyDownOtp(index, e as React.KeyboardEvent<HTMLInputElement>)}
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center' }
              }}
            />
          ))}
        </div>

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmitOtp}
          loading={loading}
        >
          Verify
        </LoadingButton>



      </form>
    );
  }

  if (verify) {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        {alert &&
          <Alert severity='error'>{massgen}</Alert>}
        {alert2 &&
          <Alert severity='success'>{massgen}</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="New Password"
          type="password"
          error={passwordError}
          helperText={passwordError && 'Please enter a password'}
          onChange={handlePasswordChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          error={confirmPasswordError}
          helperText={confirmPasswordError && 'Passwords do not match'}
          onChange={handleConfirmPasswordChange}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmitNewPassword}
          loading={loading}
        >
          Reset Password
        </LoadingButton>
      </form>
    );
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {alert &&
        <Alert severity='error'>{massgen}</Alert>}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        error={emailError}
        helperText={emailError && 'Please enter a valid email address'}
        onChange={handleEmailChange}
      />
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmitForgotPassword}
        loading={loading}
      >
        Submit
      </LoadingButton>

    </form>
  );
};

export default ForgotPasswordAndOtpForm;
