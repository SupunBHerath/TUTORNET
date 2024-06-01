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
import { red } from '@mui/material/colors';
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

const PostTeacher = () => {
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [posts, setPosts] = React.useState<any[]>([
        {
            id: 1,
            title: "Shrimp and Chorizo Paella",
            subheader: "September 14, 2016",
            content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
            image: "/static/images/cards/paella.jpg"
        },
        {
            id: 2,
            title: "Spicy Basil Chicken",
            subheader: "October 20, 2019",
            content: "This spicy basil chicken is easy to make and full of flavor. Serve it with steamed rice for a complete meal.",
            image: "/static/images/cards/chicken.jpg"
        },
        {
            id: 2,
            title: "Spicy Basil Chicken",
            subheader: "October 20, 2019",
            content: "This spicy basil chicken is easy to make and full of flavor. Serve it with steamed rice for a complete meal.",
            image: "/static/images/cards/chicken.jpg"
        },
        {
            id: 2,
            title: "Spicy Basil Chicken",
            subheader: "October 20, 2019",
            content: "This spicy basil chicken is easy to make and full of flavor. Serve it with steamed rice for a complete meal.",
            image: "/static/images/cards/chicken.jpg"
        }
    ]);
    const [currentPost, setCurrentPost] = React.useState<any>(null);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [imageFile, setImageFile] = React.useState<File | null>(null);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleMoreClick = (event: React.MouseEvent<HTMLElement>, post: any) => {
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

    const handleSave = () => {
        if (imageFile) {
            currentPost.image = imagePreview;
        }
        setPosts(posts.map(post => post.id === currentPost.id ? currentPost : post));
        setOpenEditDialog(false);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCurrentPost({ ...currentPost, content: event.target.value });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPost({ ...currentPost, title: event.target.value });
    };

    const handleSubheaderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPost({ ...currentPost, subheader: event.target.value });
    };

    const handleDelete = () => {
        handleClose();
        setOpenDeleteDialog(true);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = () => {
        setPosts(posts.filter(post => post.id !== currentPost.id));
        setOpenDeleteDialog(false);
    };

    return (
        <div>
            {posts.map(post => (
                <Card key={post.id} sx={{ maxWidth: 345, marginBottom: 2 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings" onClick={(event) => handleMoreClick(event, post)}>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={post.title}
                        subheader={post.subheader}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {post.content}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        height="194"
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
                            label="Title"
                            type="text"
                            fullWidth
                            value={currentPost.title}
                            onChange={handleTitleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Subheader"
                            type="text"
                            fullWidth
                            value={currentPost.subheader}
                            onChange={handleSubheaderChange}
                        />
                        <TextField
                            margin="dense"
                            label="Content"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            value={currentPost.content}
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
