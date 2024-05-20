import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.min.css'
import './CHP.css'
import  {Color} from '../../Components/CSS/CSS'
import { Link, useNavigate } from 'react-router-dom';
import Register from '../../Components/Modal/Register';
import LoginForm from '../../Components/Modal/LoginModal';






interface Props {

  window?: () => Window;
}

const drawerWidth = 240;


export default function CHPNaviBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }} className="CHPNaviBar">
      <Typography variant="h6" sx={{ my: 2 }}>
        TUTORNET
      </Typography>
      <Divider />
      <List className='justify-content-center '>
       
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const navigate = useNavigate();

  const registerBtnClick = () => {
    navigate('/register');
  };
  const loginBtn = () => {
    navigate('/login');
  };

  return (

    <Box sx={{ display: 'flex' }} className="CHPNaviBar  "  >
      <CssBaseline />
      <AppBar component="nav" className="CHPNaviBar  "style={{ backgroundColor: Color.PrimaryColor }} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{  display: { xs: 'block', sm: 'block' } }}
            className='logo'
          >
            TUTOR<span style={{ color: Color.SecondaryColor}}>NET</span>
           
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1}} className="NaviBarLink  " >
            <Link to="/"> Home</Link>
            <Link to="/landing"> Landing</Link>
            <Link to="/student"> Sudent</Link>
            <Link to="/admin"> Admin</Link>

          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' ,} }} className="NaviBarLink d-flex " >
            <div className="btn">
            <LoginForm/>
            </div>
            <div className="btn">
            <Register/>
         
            </div>
           
            {/* <button className='btn ' style={{color:Color.SecondaryColor,borderStyle:'solid' ,borderColor:'white'}} onClick={loginBtn}> Login</button> */}

          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 0 }} className=' w-100 '>
        <Toolbar />
        <Typography >
     

        </Typography>
      </Box>
    </Box>
  );
}
