import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";
import Navbar from "../navbar/Navbar";
import BlogListPage from "../blog/BlogListPage";
import AddActionButtons from "../floatingButton/AddActionButtons";
import '../../App.css';

const Home = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);

    const handleBlogAdded = () => {
        setRefresh(prev => !prev);
    };

    useEffect(() => {
        if (!currentUser) {
            const storedUser = localStorage.getItem("userSession");
            if (!storedUser) {
                navigate("/");
            }
        }
    }, [currentUser, navigate]);

    console.log("currentUser:", currentUser);

    return (
        <>
            <div>
                <Navbar />
                <BlogListPage refresh={refresh}/>
                <AddActionButtons onBlogAdded={handleBlogAdded}/>
            </div>
        </>
    );
};

export default Home;
