

import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/authPage/Login";  
import Home from "./components/homepage/Home";
import './App.css'
import BlogDetailPage from "./components/blog/BlogDetailPage";

const App = () => {
    const [authType, setAuthType] = useState("login");

    return (
        <Routes>
            <Route path="/" element={<Login type={authType} setType={setAuthType} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
        </Routes>
    );
};

export default App;

