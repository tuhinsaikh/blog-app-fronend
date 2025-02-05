import React, { useState } from 'react';
import { getAllBlogPost } from '../../apis/blog/blogApi';
import { useEffect } from 'react';
import jsonConfig from "../../../config.json";
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';


export default function BlogListPage({ refresh }) {

    const [blogs, setBlogs] = useState([]);
    const BASE_URL = jsonConfig.apiurl;
    const getAllBlog = async () => {
        try {
            const data = await getAllBlogPost(); 

            const blogObjects = data.map(blog => ({
                id: blog.blogId,          // Unique ID
                title: blog.title,        // Blog Title
                body: blog.body,          // Blog Content
                author: blog.name,        
                imgUrl: blog.imgUrl,      
                postTime: new Date(blog.postTime).toLocaleString(), // Format Date
                comments: blog.comments || [], 
            }));
            setBlogs(blogObjects); 
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        getAllBlog();
    }, [refresh]);
    

  return (
    <>
    <div className='header-name'>
        <h1>Blog Lists</h1>
    </div>
    <div className="container">
        {
          blogs?.map(blog =>
            <div className="card">
                <figure className="card__thumb">
                    <div className='card__img'>
                        <img src={`${BASE_URL+blog?.imgUrl}`} alt="Picture" className="card__image" />
                    </div>
                    <figcaption className="card__caption">
                        <h2 className="card__title">{blog?.title}</h2>
                        <p className="card__snippet" dangerouslySetInnerHTML={{ __html: blog?.body }} />
                        <Link to={`/blog/${blog?.id}`} className="card__button">Read more</Link>
                    </figcaption>
                </figure>
            </div>
          )  
        }
       
        <div className="card">
            <figure className="card__thumb">
                <div className='card__img'>
                    <img src="https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg" alt="Picture" className="card__image" />
                </div>
                <figcaption className="card__caption">
                    <h2 className="card__title">Here's What Your Cat Actually Thinks Of You</h2>
                    <p className="card__snippet">In ac sem bibendum, posuere leo et, accumsan dolor. Sed lacinia aliquet tellus. Aliquam pellentesque vel diam sit amet euismod. Donec et sem et mi placerat malesuada. Nullam at pharetra elit. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas fringilla at justo sit amet tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                    <a href="" className="card__button">Read more</a>
                </figcaption>
            </figure>
        </div>
        <div className="card">
            <figure className="card__thumb">
                <div className='card__img'>
                    <img src="data:image/jpeg;base64,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" alt="Picture" className="card__image" />
                </div>
                <figcaption className="card__caption">
                    <h2 className="card__title">Here's What Your Cat Actually Thinks Of You</h2>
                    <p className="card__snippet">In ac sem bibendum, posuere leo et, accumsan dolor. Sed lacinia aliquet tellus. Aliquam pellentesque vel diam sit amet euismod. Donec et sem et mi placerat malesuada. Nullam at pharetra elit. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas fringilla at justo sit amet tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                    <a href="" className="card__button">Read more</a>
                </figcaption>
            </figure>
        </div>
        <div className="card">
            <figure className="card__thumb">
                <div className='card__img'>
                    <img src="https://img.freepik.com/free-photo/african-lion-portrait-warm-light_475641-46.jpg" alt="Picture" className="card__image" />
                </div>
                <figcaption className="card__caption">
                    <h2 className="card__title">Here's What Your Cat Actually Thinks Of You</h2>
                    <p className="card__snippet">In ac sem bibendum, posuere leo et, accumsan dolor. Sed lacinia aliquet tellus. Aliquam pellentesque vel diam sit amet euismod. Donec et sem et mi placerat malesuada. Nullam at pharetra elit. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas fringilla at justo sit amet tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                    <a href="" className="card__button">Read more</a>
                </figcaption>
            </figure>
        </div>
    </div>
    </>
  )
}
