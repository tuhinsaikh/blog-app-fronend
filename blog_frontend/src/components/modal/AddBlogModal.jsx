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
import { addBlobImage, createBlogPost, deleteBlobImage } from '../../apis/blog/blogApi';
import { useAuth } from '../../src/context/AuthContext';

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
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  // borderRadius:'22px 22px 22px 22px',
  padding:"10px 5px 20px 5px",
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


export default function AddBlogModal( {open, handleCloseModal, onBlogAdded}) {  
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [hover, setHover] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const { currentUser } = useAuth();
  const handleClose = () => handleCloseModal();
  const handleTitleChange = (text) => setBlogTitle(text);
  const Iconstyle = {
    width:'30px',
    height:'30px',
    color: 'darkblue',
    cursor: 'pointer',
    "color": hover ? 'red' : 'darkblue',
  };

  const onDrop = React.useCallback(acceptedFiles => {
    setFiles(
        acceptedFiles.map(file => ({
            name: file.name,
            preview: URL.createObjectURL(file)
        }))
    );
    uploadToBackend(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const uploadToBackend = async (file) => {
    try {
      setUploading(true);
      const response = await addBlobImage(file);
      
      if(response.ok){
        const uploadedFileUrl = await response.text();
        setFileUrl(uploadedFileUrl)
        console.error("uploadedFileUrl:", uploadedFileUrl);
      }
    } catch (error) {
      console.error("Error fetching DB types:", error);
    }finally{
      setUploading(false);
    }
  };
  const removeImage = async() => {
    try {
      const response = await deleteBlobImage(fileUrl);
      if(response.ok){
        setFileUrl("");
        setFiles([]);
      }
    } catch (error) {
      console.error("Error fetching DB types:", error);
    }
    
  };

  const thumbs = files.map((file) => {
    
    if (!file.preview) return null; 
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
      }, 100); 
    }
    return () => {
      if (quill) {
        quill = null;
      }
      clearTimeout(timeout);
    };
  }, [open]);

  const handleSubmit = async () => {
    if (!blogTitle || !blogBody) {
        alert("Please fill in all fields");
        return;
    }
    if(fileUrl==""){
      alert("Please upload image");
      return;
    }
    const blogData = { title: blogTitle, body: blogBody, name: "Tuhin", imgUrl: fileUrl, postTime: new Date().toISOString() };
    const result = await createBlogPost(blogData);
    console.log("result:",result);
    if (result!="") {
        alert("Blog created successfully");
        handleClose();
        onBlogAdded();
    } else {
        alert("Error creating blog");
    }
    setUploading(false);
};
  
    
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
                <Grid size={12}>
                <Item>
                <section className="container container-img">
                    {!uploading && !files.length>=1 && <div style={{
                                                              cursor: "pointer",
                                                              fontSize: "small"}}  
                        {...getRootProps({ className: "dropzone" })}>
                        <input className='drag-and-drop' {...getInputProps()} />
                        <h2 className='font-display-image'>Blog display picture</h2>
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>}
                    {uploading && <h3>Uploading...</h3>}
                    {!uploading && <aside style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
                        {files.map(file => (
                            <div key={file.name} style={{ position: "relative", display: "inline-block" }}>
                                <img src={file.preview} alt={file.name} width={100} />
                                <button 
                                    onClick={removeImage} 
                                    style={{
                                        position: "absolute",
                                        top: -5,
                                        right: -5,
                                        background: "white",
                                        color: "white",
                                        border: "1px solid red",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        width: 20,
                                        height: 20,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    ❌
                                </button>
                                <p>{file.name}</p>
                            </div>
                        ))}
                    </aside>}
                   
                </section>
                </Item>
                </Grid>
                <div className='submit-button' onClick={handleSubmit}><button>Submit</button></div>
                
            </Grid>
            </Box>}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
