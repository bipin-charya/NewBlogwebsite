// import React, { useEffect } from 'react'
// import axios from 'axios'

// function Blogs() {
  
//   useEffect(()=>{
//     axios
//       .get(`/api/blogs`)
//       .then()
//   },[])


//   return (
//     <div>Blogs</div>
//   )
// }

// export default Blogs'

// src/components/CreateBlog.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateBlog() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/blog/post', { title, content})
        .then(response=>{
            toast.success('Blog post created successfully!')
            navigate('/') // Redirect to the blog listing page
            console.log('Blog created:', response.data)
            
        }) 
        .catch(error=>{
            toast.error('Failed to create blog post');
            console.error(error);
        })
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <h1 className="text-2xl mb-4">Post a blog</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Enter blog title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter blog content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Create
                </button>
            </form>
        </div>
    );
}

export default CreateBlog;
