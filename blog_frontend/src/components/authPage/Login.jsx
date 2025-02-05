import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";
import { login } from "../../apis/user/user";

const Login = ({ type, setType }) => {
    const [formData, setFormData] = useState({ mobileNo: "", password: "" });
    const [error, setError] = useState("");
    const { currentUser, loginUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(formData);
            console.log("data: ",data);
            if (data) {
                loginUser(data);
                navigate("/home");
            } else {
                setError("Invalid credentials, please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Server error, please try again later.");
        }
    };

    return (
        <>
        <div>
            <center>
                <h1 style={{color:"blue"}}>Welcome to Blog App</h1>
            </center>
        </div>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Container component={Paper} elevation={3} sx={{ padding: 4, maxWidth: 400, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    {type === "register" ? "Register" : "Login"}
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth 
                        label="Mobile Number" 
                        name="mobileNo"  
                        value={formData.mobileNo} 
                        onChange={handleChange} 
                        margin="normal"
                    />
                    <TextField 
                        fullWidth 
                        label="Password" 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                        {type === "register" ? "Register" : "Login"}
                    </Button>
                </form>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    {type === "register" ? "Already have an account?" : "Don't have an account?"} 
                    <Button onClick={() => setType(type === "register" ? "login" : "register")} sx={{ textTransform: "none" }}>
                        {type === "register" ? "Login" : "Register"}
                    </Button>
                </Typography>
            </Container>
        </div>
        </>
    );
};

export default Login;
