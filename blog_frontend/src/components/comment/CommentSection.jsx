import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Paper, Avatar } from "@mui/material";
import { getCommentsByBlogId, addComment } from "../../apis/comment/commentApi";

const CommentSection = ({ blogId, comment }) => {
    console.log("blogId",blogId,"comment",comment)
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [author, setAuthor] = useState("Guest");

    const fetchComments = async () => {
        const data = await getCommentsByBlogId(blogId);
        setComments(data);
    };

    // useEffect(() => {
    //     fetchComments();
    // }, []);

    useEffect(() => {
        setComments(comment);
    }, [])
    
    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        const commentData = {
            name: author,
            commentBody: newComment,
            postTime: new Date().toISOString()
        };

        const result = await addComment(blogId, commentData);
        if (result) {
            setComments([...comments, commentData]);
            setNewComment("");
        }
    };

    return (
        <Box>
            <Typography variant="h6">Comments</Typography>
            {comments!=null && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <Paper key={index} elevation={2} sx={{ padding: 2, marginY: 1, display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ marginRight: 2 }}>{comment.name.charAt(0)}</Avatar>
                        <Box>
                            <Typography variant="subtitle2"><strong>{comment.name}</strong></Typography>
                            <Typography variant="body2">{comment.commentBody}</Typography>
                        </Box>
                    </Paper>
                ))
            ) : (
                <Typography variant="body2" color="textSecondary">No comments yet.</Typography>
            )}
            <Box mt={2} display="flex" flexDirection="column">
                <TextField label="Your Name" value={author} onChange={(e) => setAuthor(e.target.value)} sx={{ marginBottom: 1 }} />
                <TextField label="Write a comment..." multiline rows={2} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <Button onClick={handleAddComment} variant="contained" color="primary" sx={{ marginTop: 1 }}>Post Comment</Button>
            </Box>
        </Box>
    );
};

export default CommentSection;
