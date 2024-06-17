import React, { useState, useEffect, useRef } from 'react';
import { Container, TextField, IconButton, List, ListItem, ListItemText, Paper, Box, CircularProgress, AppBar, Toolbar, Typography, Avatar, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import axios from 'axios';
import logo from '../../../../public/logo/Tutor logo.png';
import { Color, Font } from '../../../Components/CSS/CSS';
import { CloseRounded } from '@mui/icons-material';
import useCookie from '../../../Hook/UserAuth';
import { useNavigate } from 'react-router-dom';

interface UserData {
    _id: string;
    name: string;
    subject: string;
    rating: number;
}

interface Message {
    id: number;
    role: 'user' | 'model';
    content: string;
    avatar: string;
    type: 'text' | 'code';
}

interface Keyword {
    keyword: string;
    defaultMessage: string;
}



const ChatbotPage: React.FC = () => {
    const nav = useNavigate()
    const [teacher, setTeacher] = useState(0)
    const [student, setStudent] = useState(0)
    const [teacherData, setTeacherData] = useState<UserData[]>([])
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            role: 'model',
            content: `Hello! How can I assist you today? `,
            avatar: logo,
            type: 'text'
        },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentResponse = await axios.get('/student/all');
                setStudent(studentResponse.data.length);
                const teacherResponse = await axios.get('/teacher/all');
                const teachers = teacherResponse.data;
                setTeacher(teachers.length);
                const teacherRatings = await Promise.all(
                    teachers.map(async (teacher: UserData) => {
                        const ratingResponse = await axios.get(`feedback/rating/${teacher._id}`);
                        return { ...teacher, rating: ratingResponse.data.userTotalRatings };
                    })
                );
                teacherRatings.sort((a, b) => b.rating - a.rating);
                setTeacherData(teacherRatings.slice(0, 2));
                console.log(teacherData);


            } catch (err) {
                console.error(err);
                console.log(err);

            }
        };

        fetchData();
    }, [messages.length >= 0 && messages.length < 2]);

    const [input, setInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { userData } = useCookie();
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

    const defaultName = "Amith Pussalla ";


    const defaultHistory: Message[] = [
        {
            id: 100,
            role: 'user',
            content: `As the project owner and builder, my name is Supun B Herath, and I'm a passionate full-stack developer. 
                      I thrive on building innovative and engaging web applications. You can find my work on GitHub under the username "supunbherath." 
                      I'm always eager to connect with fellow developers and contribute to open-source projects. 
                      If you'd like to reach out, my email is supunbherath@gmail.com, and you can also reach me at 0782503387. 
                      Regarding this chatbot builder, it's a project I've been working on to help people create and deploy their own chatbots. 
                      I'm excited to see how people use it to build powerful and helpful AI experiences.`,
            avatar: botAvatarUrl,
            type: 'text',
        },
        {
            id: 102,
            role: 'user',
            content: `This teacher is popular on our website. His name is ${teacherData[0]?.name || defaultName}. 
                      Amith Pussalla  is renowned in Sri Lanka as a distinguished physics teacher and the owner of SASIP Institute and IUHS camps. 
                      His reputation as the best teacher in Sri Lanka underscores his exceptional teaching abilities and leadership in education. 
                      His influence extends across various educational platforms, making a significant impact on students and the learning community as a whole 
                      Our website currently features ${teacher} teachers and ${student} students. Please note that these numbers may vary. 
                      TutorNet is a platform developed by students from Nalanda IUHS Campus—Supun, Akila, Sandaru, Avinash, and Yasiru—to connect students with a diverse range of teachers. 
                      It serves as a hub where teachers can showcase their expertise, and students can discover suitable educators across various subjects and specialties. 
                      The platform aims to enhance learning experiences by facilitating direct connections and promoting educational opportunities. 
                      If you need more details, feel free to contact Supun. `,
            avatar: botAvatarUrl,
            type: 'text',
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
            const botMessage: Message = { id: messages.length + 2, role: 'model', content: keyword.defaultMessage, avatar: botAvatarUrl, type: 'text' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);

            setInput('');
            setLoading(false);
            return;
        }

        try {
            const latestHistory = messages.slice(-5);
            const combinedHistory = [...defaultHistory, ...latestHistory];
            const history = combinedHistory.map(msg => ({ role: msg.role, parts: [{ text: msg.content }] }));
            console.log(history);


            const response = await axios.post('/chat', { prompt: content, history });

            const formattedContent = response.data.text.replace(/\n/g, '<br>');
            const botMessage: Message = { id: messages.length + 2, role: 'model', content: formattedContent, avatar: botAvatarUrl, type: 'text' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error fetching response from the API:', error);
        }

        setInput('');
        setLoading(false);
    };

    const copyMessage = (content: string) => {
        const strippedContent = content.replace(/<[^>]*>/g, '');
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
        <Container  style={{ marginTop:'100px', padding: '10px', display: 'flex', flexDirection: 'column', height: '80vh', backgroundColor: '#1E1E1E' }} className='shadow-lg rounded-3'>
            <AppBar position="static" style={{ backgroundColor: Color.PrimaryColor }}>
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
                            {msg.role === 'model' && (
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
                                {msg.role === 'model' && (
                                    <IconButton
                                        aria-label="copy"
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '-40px',
                                            color: 'white',
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

export default ChatbotPage;

