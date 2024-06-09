import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ForgotPasswordAndOtpForm: React.FC = () => {
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

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handleSubmitForgotPassword = () => {
    if (!email) {
      setEmailError(true);
      return;
    }
    console.log('Submit forgot password request for email:', email);
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

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

  const handleSubmitOtp = () => {
    const enteredOtp = otp.join('');
    console.log('Submitted OTP:', enteredOtp);
    setVerify(true);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(false);
  };

  const handleSubmitNewPassword = () => {
    if (!password) {
      setPasswordError(true);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }
    console.log('New password:', password);
  };

  if (submitted && !verify) {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
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
        <Button onClick={handleSubmitOtp}  fullWidth variant="contained" sx={{ mt: 3 }}>
          Verify
        </Button>
      </form>
    );
  }

  if (verify) {
    return (
      <form  onSubmit={(e) => e.preventDefault()}>
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
        <Button onClick={handleSubmitNewPassword} fullWidth variant="contained" sx={{ mt: 3 }}>
          Reset Password
        </Button>
        
      </form>
    );
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
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
      <Button onClick={handleSubmitForgotPassword} fullWidth variant="contained" sx={{ mt: 3 }}>
        Submit
      </Button>
    </form>
  );
};

export default ForgotPasswordAndOtpForm;
