
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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


    // const handleBlogDetail = async (res)=>{
    //     router.route({res._id})
    // }

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
        // <div className="container mx-auto p-4">
        //     <h1 className="text-2xl mb-4">Blog Posts</h1>
        //     <table className="table-auto w-full border-collapse border border-gray-200">
        //         <thead>
        //             <tr>
        //                 <th className="border border-gray-200 px-4 py-2">Title</th>
        //                 <th className="border border-gray-200 px-4 py-2">Content</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {blogs.map((b) => (
        //                 <tr key={b._id}>
        //                     <td className="border border-gray-200 px-4 py-2">{b.title}</td>
        //                     <td className="border border-gray-200 px-4 py-2">{b.content}</td>
        //                 </tr>
        //             ))}

        //             <tr>
        //             <td>khatra khalko</td>
        //             <td>fsdfs  sfdsd Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut sit repellat sapiente, voluptate laudantium exercitationem atque, ducimus iusto illum dolore dolorum ipsam rem excepturi reiciendis doloremque soluta saepe voluptatum. Saepe.</td>
        //             </tr> 

        //         </tbody>
        //     </table>
        // </div>


        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Blog Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogs?.map((b) => (
                    <>
                    <div key={b._id} className="max-w-sm rounded overflow-hidden shadow-lg">
                        <Link to={`/blog-details/${b._id}`}>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{b.title}</div>
                            <p className="text-gray-700 text-base">{b.content}</p>
                            <p>By: {b.authorId}</p>
                        </div>
                        </Link>
                    </div>
                    </>
                ))}

                    {/* <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Kahtv asn</div>
                            <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ipsa a quo ullam quasi reprehenderit quidem fuga at? Dolores tempora neque natus eaque optio voluptas, minus dignissimos perspiciatis sapiente, maiores quibusdam molestiae aliquid nam, animi culpa. Maxime cupiditate impedit similique quibusdam corrupti nemo, dolor cum perspiciatis. Cupiditate nemo eos natus?</p>
                        </div>
                    <button className='"text-white bg-blue-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>
                        Edit
                    </button>

                    <button className='text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 ml-24 focus:outline-none'>
                        Delete
                    </button>

                    </div>

                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Kahtv asn</div>
                            <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ipsa a quo ullam quasi reprehenderit quidem fuga at? Dolores tempora neque natus eaque optio voluptas, minus dignissimos perspiciatis sapiente, maiores quibusdam molestiae aliquid nam, animi culpa. Maxime cupiditate impedit similique quibusdam corrupti nemo, dolor cum perspiciatis. Cupiditate nemo eos natus?</p>
                        </div>
                    </div>

                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Kahtv asn</div>
                            <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ipsa a quo ullam quasi reprehenderit quidem fuga at? Dolores tempora neque natus eaque optio voluptas, minus dignissimos perspiciatis sapiente, maiores quibusdam molestiae aliquid nam, animi culpa. Maxime cupiditate impedit similique quibusdam corrupti nemo, dolor cum perspiciatis. Cupiditate nemo eos natus?</p>
                        </div>
                    </div>

                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Kahtv asn</div>
                            <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ipsa a quo ullam quasi reprehenderit quidem fuga at? Dolores tempora neque natus eaque optio voluptas, minus dignissimos perspiciatis sapiente, maiores quibusdam molestiae aliquid nam, animi culpa. Maxime cupiditate impedit similique quibusdam corrupti nemo, dolor cum perspiciatis. Cupiditate nemo eos natus?</p>
                        </div>
                    </div> */}


            </div>
        </div>

    );
}

export default BlogList;
