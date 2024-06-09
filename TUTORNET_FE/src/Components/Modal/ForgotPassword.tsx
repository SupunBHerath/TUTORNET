import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import { Color, Font } from '../CSS/CSS';
import ForgotPasswordAndOtpForm from '../ForgotPasswordForm/ForgotPasswordForm';

const ForgotPassword: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isSmallScreen ? '90%' : 'auto',
    maxWidth: 500,
    bgcolor: 'background.paper',
    border: '4px solid #f6921e',
    boxShadow: 45,
    borderRadius: 3,
    p: 4,
  };

  return (
    <div>
      <Link to="#" onClick={handleOpen} style={{ color: Color.SecondaryColor, textDecoration: 'none' }}>
        <span style={{ fontFamily: Font.PrimaryFont }}>Forgot Password</span>
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <ForgotPasswordAndOtpForm />
        </Box>
      </Modal>
    </div>
  );
}

export default ForgotPassword;
