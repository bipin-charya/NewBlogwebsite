import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

function UpdateBlog() {
    
    const [title, setTitle]= useState('')
    const [content, setContent] = useState('')

    const {blog_id}= useParams()

    const handleUpdate = async (e)=>{
        await axios.put(`/api/blog/update/${blog_id}`, { title, content })
                .then((response)=>{
                    toast.success("blog updated successfully")
                    console.log(response.data)
                })
                .catch((error)=>{
                    toast.error("failed to update blog")
                    console.error(error)
                })

    }

    // useEffect(()=>{
        
    // },[id])
  
    return (
    <div className="container mx-auto p-4">
    <ToastContainer />
    <h1 className="text-2xl mb-4">Post a blog</h1>
    <form onSubmit={handleUpdate}>
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
            Update
        </button>
    </form>
    </div>    
    
  )
}

export default UpdateBlog