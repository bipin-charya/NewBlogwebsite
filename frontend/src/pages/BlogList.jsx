

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        axios.get('/api/blog/')
        .then((response)=>{
            setBlogs(response.data)
            setLoading(false)
        })
        .catch((error)=>{
                setError(error);
                setLoading(false);
            }
        )
    }, []);

    // useEffect(() => {
    //     axios.get('/api/blog/')
    //         .then((response)=>{
    //             // Log the response data for debugging
    //             console.log('API response:', response.data);
    //             // Check if response data is an array
    //             if (Array.isArray(response.data)) {
    //                 setBlogs(response.data);
    //             } else {
    //                 throw new Error("API response is not an array");
    //             }
    //             setLoading(false);
    //         })    
    //         .catch ((error)=>{
    //             setError(error);
    //             setLoading(false);
    //         })
    // }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Blog Posts</h1>
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-200 px-4 py-2">Title</th>
                        <th className="border border-gray-200 px-4 py-2">Content</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((b) => (
                        <tr key={b._id}>
                            <td className="border border-gray-200 px-4 py-2">{b.title}</td>
                            <td className="border border-gray-200 px-4 py-2">{b.content}</td>
                        </tr>
                    ))}

                    <tr>
                    <td>khatra khalko</td>
                    <td>fsdfs  sfdsd Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut sit repellat sapiente, voluptate laudantium exercitationem atque, ducimus iusto illum dolore dolorum ipsam rem excepturi reiciendis doloremque soluta saepe voluptatum. Saepe.</td>
                    </tr> 

                </tbody>
            </table>
        </div>
    );
}

export default BlogList;
