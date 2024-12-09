import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import AddBlogModal from '../modal/AddBlogModal';

export default function AddActionButtons() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = (open) => {
    setOpen(false);
  }
  return (
    <Box sx={{
      position: 'fixed',
      bottom: 16,        
      right: 16,         
      zIndex: 1000,      
    }}>
      {console.log("open",open)};
      {open && <AddBlogModal open = {open} handleCloseModal = {handleClose} />}
      <Fab onClick={handleOpen} size="large" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
}
