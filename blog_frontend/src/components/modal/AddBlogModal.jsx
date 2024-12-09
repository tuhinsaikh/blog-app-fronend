import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import CloseIcon from '@mui/icons-material/Close';
import { borderRadius, height, padding, width } from '@mui/system';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import {useDropzone} from 'react-dropzone';

/*
{
  "title": "string",
  "body": "string",
  "name": "string",
  "imgUrl": "string"
  
}


*/

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:'22px 22px 22px 22px',
  padding:0,
};



  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));


export default function AddBlogModal( {open, handleCloseModal}) {  
  const [files, setFiles] = useState([]);
  const [hover, setHover] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  console.log("blogTitle",blogTitle);
  console.log('Content:', blogBody);
  const handleClose = () => handleCloseModal();
  const handleTitleChange = (text) => setBlogTitle(text);
  const Iconstyle = {
    width:'30px',
    height:'30px',
    color: 'darkblue',
    cursor: 'pointer',
    color: hover ? 'red' : 'darkblue',
    transition: 'color 0.3s',
  };

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map((file) => {
    
    if (!file.preview) return null; // Skip rendering if preview is invalid
    console.log("file",file);
    return (
      <div
        style={{
          margin: '10px',
          border: '1px solid #ccc',
          padding: '5px',
          borderRadius: '8px',
          display: 'inline-block',
        }}
        key={file.name}
      >
        <div>
          <img
            src={file.preview}
            alt={file.name}
            style={{
              display: 'block',
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </div>
      </div>
    );
  });
  

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);  

  useEffect(() => {
    let quill;
    let timeout;
    if (open) {
      // Delay initialization to ensure DOM is ready
      timeout = setTimeout(() => {
        const editorElement = document.querySelector('#editor');
        if (editorElement) {
          quill = new Quill(editorElement, {
            theme: 'snow',
            modules: {
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
              ],
            },
          });
  
          quill.on('text-change', () => {
            setBlogBody(quill.root.innerHTML);
          });
        }
      }, 100); // Delay of 100ms to ensure DOM is loaded
    }
    return () => {
      if (quill) {
        quill = null;
      }
      clearTimeout(timeout);
    };
  }, [open]);
  
    
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade 
            in={open} 
            timeout={{ enter: 700, exit: 1000 }}
            easing={{ enter: 'cubic-bezier(0.4, 0, 0.2, 1)', exit: 'linear' }}
        >
          <Box sx={style}>
            <div className='add-modal-header'>
            <h1 className='add-modal-header-font'>Add Blog</h1>
            <CloseIcon 
              className='add-modal-header-icon' 
              onClick={handleClose} 
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              sx={Iconstyle}/>
            </div>
           {open && <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={12}>
                <Item>
                  <TextField className='title-textField' label='Write Blog Title Here' id="text" type="text" required onChange={(e)=>handleTitleChange(e.target.value)} /> 
                </Item>
                <Item>
                  <div id="editor" style={{ height: '200px' }} />
                </Item>
                </Grid>
                <Grid size={6}>
                <Item>
                <section className="container">
                    <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <aside style={thumbs}>
                        {thumbs}
                    </aside>
                </section>
                </Item>
                </Grid>
            </Grid>
            </Box>}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
