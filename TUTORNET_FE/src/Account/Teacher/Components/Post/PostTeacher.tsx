import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import useCookie from '../../../../Hook/UserAuth';
import TimeDifference from '../../../../Components/TimeDifference/TimeDifference';
import { LinearProgress } from '@mui/material';
import { Font } from '../../../../Components/CSS/CSS';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface Post {
    id: number;
    _id:string;
    title: string;
    uploadedDay: string;
    description: string;
    image: string;
    username:string;
}

const PostTeacher: React.FC = () => {
    const { isValidToken, userData } = useCookie();
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [progress , setProgress] =React.useState(false);

    const [posts, setPosts] = React.useState<Post[]>([]);
    const [currentPost, setCurrentPost] = React.useState<Post | null>(null);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [imageFile, setImageFile] = React.useState<File | null>(null);

    React.useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`/post/${userData.userId}`);
                if (response.status === 200) {
                    const reversedData = response.data.reverse();
                    setPosts(reversedData);
                    
                }
            } catch (err) {
                console.log(err);
            }
        };

        getData();
    }, [userData.userId]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleMoreClick = (event: React.MouseEvent<HTMLElement>, post: Post) => {
        setCurrentPost(post);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleClose();
        setOpenEditDialog(true);
    };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
    };

    const handleSave = async () => {
        if (currentPost) {
            const formData = new FormData();
            formData.append('title', currentPost.title);
            formData.append('subheader', currentPost.uploadedDay);
            formData.append('content', currentPost.description);
            if (imageFile) {
                formData.append('image', imageFile);
            }

            try {
                const response = await axios.put(`/post/${currentPost.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    setPosts(posts.map(post => post.id === currentPost.id ? { ...currentPost, image: response.data.image } : post));
                    setOpenEditDialog(false);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (currentPost) {
            setCurrentPost({ ...currentPost, description: event.target.value });
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

   

    const handleDelete = () => {
        handleClose();
        setOpenDeleteDialog(true);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = async () => {
        if (currentPost) {
            try {
                setProgress(true)
                const response = await axios.delete(`/post/${currentPost._id}`);

                setTimeout(() => {
                    setPosts(posts.filter(post => post._id !== currentPost._id));
                    setOpenDeleteDialog(false);
                    setProgress(false)
                    setAnchorEl(null);  
                  }, 2000);
                if (response.status === 200) {
                  
                }
            } catch (err) {
                console.log(err);
                setProgress(false)

            }
        }
    };

    return (
        <div>
            {posts.map(post => (
                <Card key={post.id} sx={{ maxWidth: 345, marginBottom: 2,height:'auto' }}>
                    <CardHeader style={{fontStyle:Font.PrimaryFont}}
                        avatar={
                            <Avatar sx={{ }} aria-label="recipe">
                                  <img src={userData.profile} alt="0" style={{backgroundPositionX:'center', backgroundSize:'cover',width:'55px'}}/>
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings" onClick={(event) => handleMoreClick(event, post)}>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={post.username}
                        subheader={<TimeDifference time={post.uploadedDay}/>}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {post.description}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        height="auto"
                        image={post.image}
                        alt={post.title}
                    />
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>

            {currentPost && (
                <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
                    <DialogTitle>Edit Post</DialogTitle>
                    <DialogContent>
                  
                        <TextField
                            margin="dense"
                            label="Content"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            value={currentPost.description}
                            onChange={handleContentChange}
                        />
                        <Button
                            variant="contained"
                            component="label"
                            style={{ marginTop: '10px' }}
                        >
                            Upload Image
                            <input
                                type="file"
                                hidden
                                onChange={handleImageChange}
                            />
                        </Button>
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Image Preview"
                                style={{ marginTop: '10px', maxHeight: '200px' }}
                            />
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            <Dialog
                open={openDeleteDialog}
                onClose={handleDeleteDialogClose}
            >
                  {progress && (<LinearProgress  />)}
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this post?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PostTeacher;
