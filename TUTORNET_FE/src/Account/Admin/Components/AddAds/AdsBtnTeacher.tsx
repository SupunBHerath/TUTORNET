import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddAdsFormTeacher from './AddAdsFormTeacher';


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
    p: 2,
};

export default function AdsBtnTeacher() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div className="rightBtn justify-content-end  d-flex  w-100  ">
            <Button
                variant="outlined"
                style={{ marginBottom: '10px' }}
                onClick={handleOpen}
                className=''
                startIcon={<AddCircleIcon />}>
              Publish Your  ADS
            </Button>
            </div>
           
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
                       
                        <AddAdsFormTeacher/>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
