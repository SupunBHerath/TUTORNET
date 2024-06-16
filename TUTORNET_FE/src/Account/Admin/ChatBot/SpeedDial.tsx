import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ChatIcon from '@mui/icons-material/Chat';
import logo from '../../../../public/logo/Tutor logo.png';
import { Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Chatbot from './Chatbot';


const actions = [
    { icon: <ChatIcon />, name: 'ChatBot' },
];

export default function BasicSpeedDial() {
    const [open, setOpen] = useState(false); // State to manage dialog visibility

    const handleClick = () => {
        setOpen(true); // Open the dialog when clicking the SpeedDialAction
    };

    const handleClose = () => {
        setOpen(false); 
    };

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                   bottom:80,
                    right:'80px',
                    zIndex: 1000,
                }}
            >
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    icon={<ChatIcon />}
                    direction="left"
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={<Avatar src={logo}></Avatar>}
                            tooltipTitle={action.name}
                            onClick={() => handleClick()}
                        />
                    ))}
                </SpeedDial>


            </Box>

            <Dialog
                open={open}
                fullWidth
                maxWidth="xs"
                >
                <DialogContent style={{ width: 'max-container', padding: '0', border: "4px solid #f6921e" }} >

                    <DialogContent className='p-0' >
                    <Chatbot handleClose={handleClose} />
                    </DialogContent>
                </DialogContent>
            </Dialog>
        </>
    );
}
