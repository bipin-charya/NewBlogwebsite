import axios from 'axios'

import React, { useEffect, useState } from 'react'
import UpdateBlog from './UpdateBlog'
import { useParams } from 'react-router-dom'
import Comments from './Comments'
import { Link } from 'react-router-dom'

// export const blogStructure = {
//   title:"",
//   content:"",
//   view_count:0
// }

// function BlogDetails() {

//   const [blogg,setBlogg] = useState(blogStructure)
//   const [loading, setLoading] = useState(true) 

//   let {title, content, view_count } =blogg

//   const {blog_id} = useParams()

//   useEffect(()=>{

//     axios.get(`/api/blog/${blog_id}`)
//       .then((response)=>{
//         setBlogg(response.data)
//         setLoading(false)
//       })
//       // .then((response)=>{
//       //   setBlogg(response.data.blogg||blogStructure)
//       //   setLoading(false)
//       // })
//       .catch((error)=>{
//         console.error(error)
//         setLoading(true)
//       })
//   },[blog_id])

//   if(loading) (
//     <div> Loading ...</div>
//   )

//   if (!blogg) {
//     return <div className="text-center text-gray-500 text-lg">No blog data found</div>;
//   }

//   // if(error)(
//   //   <div>Error: {error.message}</div>
//   // )

  
//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      
//       <div className="mb-6">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">{blogg.title}</h1>
//         <div className="text-lg text-gray-700 leading-relaxed">{blogg.content}</div>
//       </div>
//       <Link to={`/update/${blog_id}`} className="inline-block px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
//         <button> UpdateBlog </button>
//       </Link>       
//       <Comments />
//     </div>
    
//   )
// }


// export default BlogDetails



// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import UpdateBlog from './UpdateBlog';
// import { useParams } from 'react-router-dom';
// import Comments from './Comments';
// import { Link } from 'react-router-dom';

export const blogStructure = {
  title: "",
  content: "",
  view_count: 0
};

function BlogDetails() {
  const [blogg, setBlogg] = useState(blogStructure);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { blog_id } = useParams();

  useEffect(() => {
    axios.get(`/api/blog/${blog_id}`)
      .then((response) => {
        console.log(response.data.blog)
        setBlogg(response.data.blog); // Correctly setting the blog data from the response
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setLoading(false);
      });
  }, [blog_id]);

  if (loading) {
    return <div className="text-center text-gray-500 text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg">Error: {error.message}</div>;
  }

  if (!blogg) {
    return <div className="text-center text-gray-500 text-lg">No blog data found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{blogg?.title}</h1>
        <div className="text-lg text-gray-700 leading-relaxed mb-4">{blogg?.content}</div>
        <div className="text-sm text-gray-500">Views: {blogg?.view_count}</div>
      </div>
      <Link to={`/update/${blog_id}`} className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
        Update Blog
      </Link>
      <Comments />
    </div>
  );
}

export default BlogDetails;
