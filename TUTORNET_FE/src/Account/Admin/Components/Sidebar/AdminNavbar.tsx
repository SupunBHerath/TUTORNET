import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Dashboard from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PaymentIcon from '@mui/icons-material/Payment';
import Badge from '@mui/material/Badge';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import UserManage from '../../Pages/UserManage';
import ADashboard from '../../Pages/ADashboard';
import PaymentManage from '../../Pages/PaymentManage';
import { Color, Font } from '../../../../Components/CSS/CSS';
import AdsManagePage from '../../Pages/AdsManage';
import Notification from '../../Pages/Notification';

// Define your custom font

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function AdminNavbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeComponent, setActiveComponent] = React.useState('dashboard');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dashboard = () => {
    setActiveComponent('dashboard');
  };

  const user = () => {
    setActiveComponent('userManage');
  };

  const payment = () => {
    setActiveComponent('payment');
  };

  const AdsManage = () => {
    setActiveComponent('adsManage');
  };
  const notification = () => {
    setActiveComponent('notification');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: Color.PrimaryColor }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >

            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" >

          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader >
          <Typography className='mx-5 w-100'
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'block', sm: 'block' } }}
            style={{ fontFamily: Font.PrimaryFont }}  >
            TUTOR<span style={{ color: Color.SecondaryColor }}>NET</span>
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{ width: '100%', maxWidth: 230, bgcolor: 'background.paper', fontFamily: Font.PrimaryFont }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">

            </ListSubheader>
          }
        >
          <br />
          <ListItemButton className='active' onClick={dashboard}>
            <ListItemIcon>
              <Dashboard sx={activeComponent === 'dashboard' ? { color: Color.SecondaryColor } : {}} />
            </ListItemIcon>
            <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Dashboard</span>} sx={activeComponent === 'dashboard' ? { color: Color.SecondaryColor } : {}} />

          </ListItemButton>
          <br />
          <br />
          <ListItemButton onClick={user}>
            <ListItemIcon>
              <ManageAccountsIcon sx={activeComponent === 'userManage' ? { color: Color.SecondaryColor } : {}} />
            </ListItemIcon>
            <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Users</span>} sx={activeComponent === 'userManage' ? { color: Color.SecondaryColor } : {}} />

          </ListItemButton>
          <br />
          <br />
          <ListItemButton onClick={payment}>
            <ListItemIcon>
              <Badge badgeContent={1} color="success">
                <PaymentIcon sx={activeComponent === 'payment' ? { color: Color.SecondaryColor } : {}} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Payment</span>} sx={activeComponent === 'payment' ? { color: Color.SecondaryColor } : {}} />
          </ListItemButton>
          <br />
          <br />
          <ListItemButton onClick={AdsManage}>
            <ListItemIcon>
              <AddBoxIcon sx={activeComponent === 'adsManage' ? { color: Color.SecondaryColor } : {}} />
            </ListItemIcon>
            <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>ADS Manage</span>} sx={activeComponent === 'adsManage' ? { color: Color.SecondaryColor } : {}} />
          </ListItemButton>
          <br />
          <br />
          <ListItemButton onClick={notification}>
            <ListItemIcon>
              <AddAlertIcon sx={activeComponent === 'notification' ? { color: Color.SecondaryColor } : {}} />

            </ListItemIcon>
            <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Notification</span>} sx={activeComponent === 'notification' ? { color: Color.SecondaryColor } : {}} />

          </ListItemButton>
          <br />
          <br />
          <Link to='/'>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{ fontFamily: Font.PrimaryFont }}>Logout</span>} />
            </ListItemButton>
          </Link>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {activeComponent === 'dashboard' && <ADashboard />}
        {activeComponent === 'userManage' && <UserManage />}
        {activeComponent === 'payment' && <PaymentManage />}
        {activeComponent === 'adsManage' && <AdsManagePage />}
        {activeComponent === 'notification' && <Notification />}
      </Box>
    </Box>
  );
}
