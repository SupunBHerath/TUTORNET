import React, { useState, useEffect, useRef } from 'react';
import { Container, TextField, IconButton, List, ListItem, ListItemText, Paper, Box, CircularProgress, AppBar, Toolbar, Typography, Avatar, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import axios from 'axios';
import logo from '../../../../public/logo/Tutor logo.png';
import { Color, Font } from '../../../Components/CSS/CSS';
import { CloseRounded } from '@mui/icons-material';
import useCookie from '../../../Hook/UserAuth';
interface Message {
    id: number;
    role: 'user' | 'bot';
    content: string;
    avatar: string;
    type: 'text' | 'code';
}

interface Keyword {
    keyword: string;
    defaultMessage: string;
}
interface ChatbotProps {
    handleClose: () => void; 
}

const Chatbot: React.FC<ChatbotProps> = ({handleClose}) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            role: 'bot',
            content: 'Hello! How can I assist you today?',
            avatar: logo,
            type: 'text'
        },
        
    ]);
    const [input, setInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {userData}=useCookie();
    console.log(userData);
    
    const userAvatarUrl = `${userData.profile}`;
    const botAvatarUrl = `${logo}`;

    const keywords: Keyword[] = [
        { keyword: 'How to Contact ', defaultMessage: 'You can email us at <span style="color: #f6921e;">supunbherath@gmail.com</span> <br> or call us at <br> <span style="color: #f6921e;">078 250 33 87</span>.' },
        { keyword: 'How To Search Teacher', defaultMessage: 'To search for a teacher, <br> go to the search page, enter the teacher\'s name, location, or class type. You can then view their profile and contact details.' },
        {
            keyword: 'How To Publish Ads',
            defaultMessage: 'If you\'re a teacher, you can publish ads by following these steps: <br><br>' +
                '1. Go to the ads page.<br>' +
                '2. Read the description carefully.<br>' +
                '3. Click on the \'Publish Ads\' button.<br>' +
                '4. Fill in the details as required.<br>' +
                '5. Submit your request.<br><br>' +
                '<span style="color: #FF5733;">Please note that our admin team will review your request.</span><br>' +
                'Once your ad is published, we will send you an email confirmation. Thank you!'
        },
    ];



    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const handleSend = async (messageContent?: string) => {
        const content = messageContent || input;
        if (content.trim() === '') return;

        const newMessage: Message = { id: messages.length + 1, role: 'user', content, avatar: userAvatarUrl, type: 'text' };
        setMessages([...messages, newMessage]);
        setLoading(true);

        const keyword = keywords.find(k => k.keyword.toLowerCase() === content.toLowerCase());
        if (keyword) {
            const botMessage: Message = { id: messages.length + 2, role: 'bot', content: keyword.defaultMessage, avatar: botAvatarUrl, type: 'text' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setInput('');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/chat', { prompt: content }); // API call
            const formattedContent = response.data.text.replace(/\n/g, '<br>'); // Replace \n with <br> for line breaks
            const botMessage: Message = { id: messages.length + 2, role: 'bot', content: formattedContent, avatar: botAvatarUrl, type: 'text' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error fetching response from the API:', error);
        }

        setInput('');
        setLoading(false);
    };

    const copyMessage = (content: string) => {
        const strippedContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
        navigator.clipboard.writeText(strippedContent);
    };

    const renderMessageContent = (message: Message, index: number) => {
        switch (message.type) {
            case 'text':
                return (
                    <ListItemText primary={<div style={{ fontFamily: 'sans-serif' }} dangerouslySetInnerHTML={{ __html: message.content }} />} style={{ color: '#fff' }} />
                );
            case 'code':
                return (
                    <ListItemText primary={message.content} style={{ color: Color.SecondaryColor, fontFamily: Font.PrimaryFont }} />
                );
            default:
                return null;
        }
    };

   

    return (
        <Container maxWidth="sm" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '80vh', backgroundColor: '#1E1E1E' }} className='shadow-lg'>
            <AppBar position="static" style={{ backgroundColor: Color.PrimaryColor }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1, color: Color.SecondaryColor, fontFamily: Font.PrimaryFont }} className='text-center' >
                       TUTORNET Chatbot
                    </Typography>
                    <div className=" text-danger  ">
                        <IconButton onClick={handleClose} style={{color:'red'}} >
                            <CloseRounded />
                        </IconButton>

                    </div>

                </Toolbar>
            </AppBar>
            <Paper
                elevation={0}
                style={{
                    flex: 1,
                    padding: '1em',
                    marginTop: '1em',
                    marginBottom: '1em',
                    overflowY: 'auto',
                    borderRadius: '8px',
                    backgroundColor: '#252526',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
            
                <List style={{ flexGrow: 1 }}>
                    {messages.map((msg, index) => (
                        <ListItem
                            key={msg.id}
                            style={{
                                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: '40px',
                                alignItems: 'flex-start',
                            }}
                        >
                            {msg.role === 'bot' && (
                                <Avatar src={msg.avatar} style={{ marginRight: '10px' }} />
                            )}
                            <Paper
                                style={{
                                    position: 'relative',
                                    padding: '10px',
                                    backgroundColor: msg.role === 'user' ? '#0B8140' : '#444444',
                                    borderRadius: '20px',
                                    maxWidth: '80%',
                                    wordWrap: 'break-word',
                                }}
                            >
                                {renderMessageContent(msg, index)}
                                {msg.role === 'bot' && (
                                    <IconButton
                                        aria-label="copy"
                                        style={{
                                            position: 'absolute',
                                            top: '95%',
                                            right: '-20px',
                                            color: Color.SecondaryColor,
                                        }}
                                        onClick={() => copyMessage(msg.content)}
                                    >
                                        <FileCopyIcon />
                                    </IconButton>
                                )}
                            </Paper>
                            {msg.role === 'user' && (
                                <Avatar src={msg.avatar} style={{ marginLeft: '10px' }} />
                            )}
                        </ListItem>
                    ))}
                    <div ref={messagesEndRef} />
                </List>
            </Paper>
            <Box
                alignItems="center"
                flexDirection="column"
                style={{
                    padding: '10px',
                    borderTop: '1px solid #333',
                    backgroundColor: '#252526',
                }}
            >
                <Box
                    display="flex"
                    flexWrap="nowrap"


                    style={{
                        marginBottom: '10px',
                        overflowX: 'auto',

                    }}
                >
                    
                    {keywords.map((keywordObj, index) => (
                        <Button
                            key={index}
                            variant="contained"
                            style={{
                                margin: '5px',
                                backgroundColor: Color.PrimaryColor,
                                color: Color.SecondaryColor,
                                fontFamily: Font.PrimaryFont,
                                minWidth: '197px',
                            }}
                            onClick={() => handleSend(keywordObj.keyword)}
                        >
                            {keywordObj.keyword}
                        </Button>
                    ))}
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    style={{
                        width: '100%',
                    }}
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleSend();
                        }}
                        style={{ marginRight: '8px', backgroundColor: '#333', borderRadius: '4px' }}
                        InputProps={{ style: { color: '#fff' } }}
                    />
                    <IconButton
                        color="primary"
                        onClick={() => handleSend()}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} style={{ color: '#007ACC' }} /> : <SendIcon style={{ color: '#007ACC' }} />}
                    </IconButton>
                </Box>
            </Box>
        </Container>
    );
};

export default Chatbot;
