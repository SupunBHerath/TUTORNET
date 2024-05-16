import React, { useState } from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

interface Post {
    id: number;
    description: string;
    photo: string;
}

const PostWallPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [description, setDescription] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [isAddingPost, setIsAddingPost] = useState(false);
    const [editingPostId, setEditingPostId] = useState<number | null>(null);

    const handleAddPost = () => {
        setIsAddingPost(true);
    };

    const handleSubmitPost = () => {
        if (description.trim() === '' || photoUrl.trim() === '') {
            alert('Please enter description and photo URL.');
            return;
        }

        if (editingPostId !== null) {
            const updatedPosts = posts.map(post => {
                if (post.id === editingPostId) {
                    return { ...post, description, photo: photoUrl };
                }
                return post;
            });
            setPosts(updatedPosts);
            setDescription('');
            setPhotoUrl('');
            setEditingPostId(null);
        } else {
            const newPost: Post = { id: Date.now(), description, photo: photoUrl };
            setPosts([...posts, newPost]);
            setDescription('');
            setPhotoUrl('');
        }
        setIsAddingPost(false);
    };

    const handleEditPost = (postId: number) => {
        const postToEdit = posts.find(post => post.id === postId);
        if (postToEdit) {
            setDescription(postToEdit.description);
            setPhotoUrl(postToEdit.photo);
            setEditingPostId(postId);
            setIsAddingPost(true);
        }
    };

    const handleDeletePost = (postId: number) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>TIME TABLE</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <Button variant="contained" startIcon={<Add />} onClick={handleAddPost}>Add</Button>
            </Box>
            {isAddingPost && (
                <Box sx={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: '10px' }}
                    />
                    <TextField
                        label="Photo URL"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: '10px' }}
                    />
                    <Button variant="contained" onClick={handleSubmitPost}>Submit</Button>
                </Box>
            )}
            {posts.map((post, index) => (
                <Box key={post.id} sx={{ backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '5px', marginBottom: '10px', position: 'relative' }}>
                    <img src={post.photo} alt="Post" style={{ maxWidth: '100%', height: 'auto' }} />
                    <Typography variant="body2" sx={{ marginTop: '5px', fontSize: '0.8rem' }}>{post.description}</Typography>
                    <Box sx={{ position: 'absolute', top: '5px', right: '5px' }}>
                        <Button variant="outlined" onClick={() => handleEditPost(post.id)} startIcon={<Edit fontSize="small" />}>Edit</Button>
                        <Button variant="outlined" onClick={() => handleDeletePost(post.id)} startIcon={<Delete fontSize="small" />}>Delete</Button>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default PostWallPage;
