import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ViewPost from './Post';
import About from './About';
import Result from './Result';
import Table from './Table';
import Feedback from './FeedBack';





export default function MainTab() {
    const [value, setValue] = React.useState('Post'); // Set default value to 'Post'

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <br />
            <hr />
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab value="Post" label="Post" />
           
                <Tab value="About" label="About" />
                <Tab value="Results" label="Results" />
                <Tab value="Time Tables" label="Time Tables" />
                <Tab value="FeedBack" label="FeedBack" />
            </Tabs>
            {/* Render content based on selected tab */}
            {value === 'Post' && <ViewPost />}
            {value === 'About' && <About/>}
            {value === 'Results' && <Result/>}
            {value === 'Time Tables' && <Table/>}
            {value === 'FeedBack' && <Feedback/>}
            
        </Box>
    );
}
