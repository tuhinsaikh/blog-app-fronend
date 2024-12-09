import React from 'react';
import Navbar from '../navbar/Navbar';
import BlogListPage from '../blog/BlogListPage';
import FloatingActionButtons from '../floatingButton/AddActionButtons';
import AddActionButtons from '../floatingButton/AddActionButtons';

const Home = () => {
  return (
    <>
    <div>
        <Navbar />
        <BlogListPage />
        <AddActionButtons />
    </div>
    </>
  )
}

export default Home;