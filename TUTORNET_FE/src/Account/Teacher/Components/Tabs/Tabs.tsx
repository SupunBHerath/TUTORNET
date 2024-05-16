import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Post from '../../../../Components/Post/Post';
import PostPage from '../Post/Postpage';

export default function ColorTabs() {
    const [value, setValue] = React.useState('Post'); // Set default value to 'Post'

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
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
            </Tabs>
            {/* Render content based on selected tab */}
            {value === 'Post' && <PostPage />}
            {value === 'About' && <Post />}
            {value === 'Results' && <Post />}
            {value === 'Time Tables' && <Post />}
        </Box>
    );
}
