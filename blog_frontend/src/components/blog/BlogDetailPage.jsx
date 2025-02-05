import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../../apis/blog/blogApi";
import jsonConfig from "../../../config.json";
import { Container, Card, CardContent, Typography, CardMedia, Divider, Box, Avatar, Paper } from "@mui/material";
import Navbar from "../navbar/Navbar";
import '../../App.css';
import CommentSection from "../comment/CommentSection";
import { deepOrange, deepPurple } from '@mui/material/colors';

const BlogDetailPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const BASE_URL = jsonConfig.apiurl;

    useEffect(() => {
        const fetchBlog = async () => {
            const data = await getBlogById(id);
            console.log("data-blog:", data);
            setBlog(data);
        };
        fetchBlog();
    }, [id]);

    if (!blog) return <Typography align="center">Loading...</Typography>;

    return (
        <>
        <Navbar />
        <div className='header-name'>
            <h1>Blog Details</h1>
        </div>
        <Container sx={{ marginTop: 4 }}>
            <Card sx={{ boxShadow: 3, borderRadius: 3, padding: 2 }}>
                {blog.imgUrl && (
                    <CardMedia
                        component="img"
                        height="300"
                        image={`${BASE_URL + blog.imgUrl}`}
                        alt={blog.title}
                        sx={{ objectFit: "cover", borderRadius: 2 }}
                    />
                )}
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {blog.title}
                    </Typography>
                    <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
                        <Avatar sx={{ marginRight: 1 , bgcolor: deepPurple[500]}}>{blog.name.charAt(0)}</Avatar>
                        <Typography variant="subtitle1" color="textSecondary">
                            By <strong>{blog.name}</strong>
                        </Typography>
                    </Box>
                    <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{ __html: blog.body }}
                        sx={{ marginBottom: 2 }}
                    />
                    <Divider sx={{ marginBottom: 2 }} />
                    <CommentSection comment={blog?.comments} blogId={blog?.blogId}/>
                </CardContent>
            </Card>
        </Container>
        </>
    );
};

export default BlogDetailPage;