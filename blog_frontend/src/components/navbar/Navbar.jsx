import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../assets/write-blog-post-icon.webp';
import { Link } from 'react-router-dom';
import { deepOrange } from '@mui/material/colors';
import { useAuth } from '../../src/context/AuthContext';
import { logout } from '../../apis/user/user';

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    try {
      const parsed = typeof currentUser === 'string' ? JSON.parse(currentUser) : currentUser;
      console.log("Parsed currentUser:", parsed);
      
      if (parsed?.uniqueId) {
        setUserSession(parsed.uniqueId);
      }
    } catch (error) {
      console.error("Parsing error:", error);
    }
  }, [currentUser]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      const response = await logout(userSession);
      console.log("Logout Response:", response);

      if (response) {
        setAnchorElUser(null);
        navigate("/");
      } else {
        alert("Error while logging out");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div>
            <img className='nav-logo' src={Logo} alt="logo" />
          </div>
          <Link to={`/home`}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                marginLeft: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 1000,
                fontSize: 20,
                letterSpacing: '.2rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              Blog App
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: deepOrange[500] }} alt="User" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
