import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Color, Font } from '../CSS/CSS';
import teacherForm from './Register'
import { IconButton } from '@mui/material';
import RegisterForm from '../Registration Form/RegistrationForm';
import student from '../../../public/Icon/student.png'



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'max-content',
  bgcolor: 'background.paper',
  border: '4px solid #f6921e',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

export default function RegisterFormStudent(prop: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <img src={student} alt="" style={{ width: '100px', height: 'auto' }} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <RegisterForm />
        </Box>
      </Modal>
    </div>
  );
}
