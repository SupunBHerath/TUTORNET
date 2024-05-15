import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Color, Font } from '../CSS/CSS';
import { IconButton } from '@mui/material';
import teacher from '../../../public/Icon/teacher.png'
import student from '../../../public/Icon/student.png'
import { useNavigate } from 'react-router-dom';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '4px solid #f6921e',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

export default function Register() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const teacherPath = () => {
    handleClose();
    navigate('/reg/teacher');
  };
  const studentPath = () => {
    handleClose();
    navigate('/reg/student');
  };

  return (
    <div>
      <Button onClick={handleOpen} style={{ backgroundColor: Color.SecondaryColor, color: 'white' }}><span style={{ fontFamily: Font.PrimaryFont }}>Register</span></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2" className='text-center ' style={{ fontFamily: Font.PrimaryFont }}>
            Who are you ?
          </Typography>
          <Typography id="modal-modal-description " className='text-center d-flex justify-content-evenly  ' sx={{ mt: 2 }}>
            <div className="icon">
              <IconButton onClick={teacherPath}>
                <img src={teacher} alt="" style={{ width: '100px', height: 'auto' }} />
              </IconButton>

            </div>
            <div className="icon">
              <IconButton onClick={studentPath}>
                <img src={student} alt="" style={{ width: '100px', height: 'auto' }} />
              </IconButton>
            </div>

          </Typography>
        </Box>
      </Modal>
    </div>
  );
}