
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Logo from '../../../../../public/logo/Logo_t.png';
import Post from '../../../../Components/Post/Post';

interface PostType {
  id: number;
  pp: string;
  title: string;
  date: string;
  img: string;
  description: string;
}

const PostPage: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<{ img: File | null, description: string }>({ img: null, description: '' });
  const [preview, setPreview] = useState<string>('');

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleUpdatePost = (id: number) => {
    const updatedPosts = posts.map(post =>
      post.id === id
        ? { ...post, title: 'Updated Title', description: 'Updated Description' }
        : post
    );
    setPosts(updatedPosts);
  };

  const toggleMenu = (id: number) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  const handleAddPost = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPost(prev => ({ ...prev, img: file }));

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newPost.img) return;

    const date = new Date().toLocaleDateString();
    const newPostData = {
      id: posts.length + 1, // Incremental ID based on posts length
      pp: Logo,
      title: 'New Post',
      date,
      img: preview,
      description: newPost.description
    };

    setPosts([newPostData]); // Set only the new post, clearing previous posts
    setIsModalOpen(false);
    setNewPost({ img: null, description: '' });
    setPreview('');
  };


  return (
    <div style={{ position: 'relative', padding: '20px' }}>
      <button
        onClick={handleAddPost}
        style={{
          backgroundColor: '#004aad',
          color: 'white',
          borderRadius: '5px',
          padding: '10px',
          border: 'none',
          cursor: 'pointer',
          position: 'absolute',
          right: '20px',
          top: '20px' // Moved the button to the top
        }}
      >
        Add Post
      </button>
      {posts.map((post) => (
        <div key={post.id} style={{ position: 'relative', marginBottom: '20px' }}>
          <Post
            pp={post.pp}
            title={post.title}
            date={post.date}
            img={post.img}
            description={post.description}
          />
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <button onClick={() => toggleMenu(post.id)} style={{ backgroundColor: '#004aad', color: 'white' }}>⋮</button>
            {menuOpenId === post.id && (
              <div style={{ position: 'absolute', right: '0', background: 'white', border: '1px solid #ccc' }}>
                <button onClick={() => handleUpdatePost(post.id)}>Edit</button>
                <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              </div>
            )}
          </div>
        </div>
      ))}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '300px',
            textAlign: 'center'
          }}>
            <h2>Add New Post</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
              />
              {preview && (
                <img src={preview} alt="Preview" style={{ marginBottom: '10px', maxHeight: '150px', objectFit: 'cover' }} />
              )}
              <textarea
                name="description"
                placeholder="Description"
                value={newPost.description}
                onChange={handleInputChange}
                style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
              />
              <div>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ marginRight: '10px', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ backgroundColor: '#004aad', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
