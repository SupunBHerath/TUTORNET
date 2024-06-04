import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, Menu, MenuItem, Modal } from '@mui/material';
import { Add, MoreVert } from '@mui/icons-material';

interface Post {
    id: number;
    description: string;
    photo: string;
}

const PostWallPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [isAddingPost, setIsAddingPost] = useState(false);
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

    const handleAddPost = () => {
        if (posts.length >= 6) {
            alert('You cannot add more than 6 posts. Please delete one or edit an existing post.');
            return;
        }
        setIsAddingPost(true);
    };

    const handleCancelPost = () => {
        setDescription('');
        setPhoto(null);
        setIsAddingPost(false);
        setEditingPostId(null);
    };

    const handleSubmitPost = () => {
        if (description.trim() === '' && !photo && editingPostId === null) {
            alert('Please enter a description or upload a photo.');
            return;
        }

        const photoURL = photo ? URL.createObjectURL(photo) : '';

        if (editingPostId !== null) {
            const updatedPosts = posts.map(post => {
                if (post.id === editingPostId) {
                    return { ...post, description: description || post.description, photo: photo ? photoURL : post.photo };
                }
                return post;
            });
            setPosts(updatedPosts);
            setDescription('');
            setPhoto(null);
            setEditingPostId(null);
        } else {
            const newPost: Post = { id: Date.now(), description, photo: photoURL };
            setPosts([newPost, ...posts]);  // Prepend new post to the posts array
            setDescription('');
            setPhoto(null);
        }
        setIsAddingPost(false);
    };

    const handleEditPost = (postId: number) => {
        const postToEdit = posts.find(post => post.id === postId);
        if (postToEdit) {
            setDescription(postToEdit.description);
            setEditingPostId(postId);
            setIsAddingPost(true);
        }
        setAnchorEl(null);
    };

    const handleDeletePost = (postId: number) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
        setAnchorEl(null);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, postId: number) => {
        setAnchorEl(event.currentTarget);
        setSelectedPostId(postId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ padding: '20px', position: 'relative' }}>
            <Typography variant="h4" gutterBottom>TIME TABLE</Typography>
            <Button 
                variant="contained" 
                startIcon={<Add />} 
                onClick={handleAddPost} 
                sx={{ position: 'absolute', top: 0, right: 0, marginTop: '10px', marginRight: '10px' }}
            >
                Add
            </Button>
            <Modal
                open={isAddingPost}
                onClose={handleCancelPost}
                aria-labelledby="add-post-modal-title"
                aria-describedby="add-post-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="add-post-modal-title" variant="h6" component="h2">
                        Add New Post
                    </Typography>
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: '10px', marginTop: '10px' }}
                    />
                    <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <Button variant="outlined" onClick={handleCancelPost}>Cancel</Button>
                        <Button variant="contained" onClick={handleSubmitPost}>Submit</Button>
                    </Box>
                </Box>
            </Modal>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {posts.map((post, _index) => (
                    <Box 
                        key={post.id} 
                        sx={{ 
                            backgroundColor: '#ffffff', 
                            padding: '10px', 
                            borderRadius: '5px', 
                            width: 'calc(33.333% - 20px)', 
                            boxSizing: 'border-box',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                            border: '1px solid #e0e0e0', 
                            transition: 'transform 0.2s', 
                            '&:hover': { 
                                transform: 'scale(1.02)',
                            },
                            position: 'relative'
                        }}
                    >
                        <Box sx={{ position: 'absolute', top: '5px', right: '5px' }}>
                            <IconButton onClick={(e) => handleMenuOpen(e, post.id)}>
                                <MoreVert />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl) && selectedPostId === post.id}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={() => handleEditPost(post.id)}>Edit</MenuItem>
                                <MenuItem onClick={() => handleDeletePost(post.id)}>Delete</MenuItem>
                            </Menu>
                        </Box>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                marginTop: '5px', 
                                fontSize: '0.8rem', 
                                wordWrap: 'break-word' 
                            }}
                        >
                            {post.description}
                        </Typography>
                        <img 
                            src={post.photo} 
                            alt="Post" 
                            style={{ 
                                maxWidth: '100%', 
                                height: 'auto', 
                                borderRadius: '5px',
                                marginTop: '10px'
                            }} 
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default PostWallPage;
