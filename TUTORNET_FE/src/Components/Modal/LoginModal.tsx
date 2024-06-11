import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Color, Font } from '../CSS/CSS';
import LoginForm from '../Login Form/LoginForm';

const LoginModal: React.FC = () => {
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
      <Button
        onClick={handleOpen}
        style={{ color: Color.SecondaryColor, borderColor: Color.SecondaryColor }}
        variant='outlined'
      >
        <span style={{ fontFamily: Font.PrimaryFont }}>Login</span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <LoginForm />
        </Box>
      </Modal>
    </div>
  );
}

export default LoginModal;
