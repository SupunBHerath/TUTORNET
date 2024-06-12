import * as React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Color, Font } from '../../../../Components/CSS/CSS';
import Register from '../../../../Components/Modal/Register';
import LoginModal from '../../../../Components/Modal/LoginModal';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'About us', path: '/about' },
  { name: 'Ads', path: '/Ads' },
];



function LNavi_Bar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 
  return (
    <AppBar position="static" style={{ backgroundColor: Color.PrimaryColor }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            style={{ fontFamily: Font.PrimaryFont, textAlign: "center" }}  >
            TUTOR<span style={{ color: Color.SecondaryColor }}>NET</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" style={{ fontFamily: Font.PrimaryFont }}>
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>{page.name}</Link>
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem>
              <Link to='/login' style={{ textDecoration: 'none', color:Color.SecondaryColor }}>Login</Link>

              </MenuItem>
            
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TUTORNET
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={page.path}
                style={{ fontFamily: Font.PrimaryFont, textAlign: "center" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }} className="d-flex gap-4">
          <Register />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <LoginModal/>
          </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default LNavi_Bar;
