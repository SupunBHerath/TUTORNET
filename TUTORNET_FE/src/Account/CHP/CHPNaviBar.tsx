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
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import './CHP.css'
import SideShow from './SideShow';
import  {ColorCode} from '../../Components/Color/ColorCode'
import { Link, useNavigate } from 'react-router-dom';





interface Props {

  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

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
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
    

      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const navigate = useNavigate();

  const registerBtnClick = () => {
    navigate('/register');
  };

  return (

    <Box sx={{ display: 'flex' }} className="CHPNaviBar "  >
      <CssBaseline />
      <AppBar component="nav" className="CHPNaviBar "style={{ backgroundColor: ColorCode.PrimaryColor }} >
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
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
            className='logo'
          >
            TUTOR<span style={{ color: ColorCode.SecondaryColor}}>NET</span>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }} className="NaviBarLink" >
            <Link to="/"> Home</Link>
            <Link to="about"> About</Link>
            <Link to="register"> Contact</Link>
            <button className='btn  mx-2 '  style={{backgroundColor:ColorCode.SecondaryColor,color:'white'} } onClick={registerBtnClick}>Register</button>
            <button className='btn ' style={{color:ColorCode.SecondaryColor,borderStyle:'solid' ,borderColor:'white'}}> Login</button>

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
      <Box component="main" sx={{ p: 3 }} className=' w-100 '>
        <Toolbar />
        <Typography >
        {/* <SideShow /> */}

        </Typography>
      </Box>
    </Box>
  );
}
