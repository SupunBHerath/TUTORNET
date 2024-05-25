import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RegisteredForm from './RegisteredForm';
import CloseIcon from '@mui/icons-material/Close';


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

export default function AddUser() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                variant="contained"
                style={{ marginBottom: '10px' }}
                onClick={handleOpen}
                startIcon={<AddCircleIcon />}>
                Add
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>

                    <Box sx={style}>
                        <Button
                            style={{ float: 'right', marginTop:"-30px",marginRight:'-30px',color:"red" }}
                            onClick={handleClose}
                            startIcon={<CloseIcon />}>
                                
                        </Button>
                        <RegisteredForm />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
