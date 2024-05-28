// import { useMutation, useQuery } from '@tanstack/react-query'
// import React, { useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'

// function Author() {
//   const [authors,setAuthors] = useState([])
//   const [author,setAuthor]= useState({name:'',email:''})
//   const {id} = useParams()
//   const nav = useNavigate()

//   const {data} = useQuery({
//     queryKey:['author',id],
//     queryFn:()=>{
//       axios.get(`/api/author`)
//       .then((res)=>{
//         setAuthors(res.data)
//         console.log(res.data);
//       })
//       .catch((err)=>{
//         console.error(err);
//       })
//   }
// })

// const mutateCreateAuthor = useMutation({
//   mutationFn: async (e)=>{
//     e.preventDefault()
//     await axios.post(`/api/author/`,{ 
//     })
//     .then(res=>{
//       // nav(`/author/${id}`)
//       console.log(res.data)
//     })
//     .catch((error)=>{
//       console.log(error)
//     })    
//   }
// })

// const mutateDeleteAuthor = useMutation({
//   mutationFn: async ({authorId})=>{
//     await axios.delete(`/api/author/${authorId}`)
//               .then((res)=>{
//                 console.log("deleted success",res.data);
//                 setAuthors(author.filter((a)=>a._id !== authorId))
//               })
//               .catch((err)=>{
//                 console.error(err);
//               })
//   }
// })

// const mutateEditAuthor = useMutation({
//   mutationFn: async({authorId,name,email})=>{
//                 await axios.put(`/api/author/${authorId}`,{...author})
//                             .then((res)=>{
//                               console.log(res.data)
//                               nav(`/author/${id}`)
//                             })
//                             .catch((err)=>{
//                               console.error(err);
//                             })
//   }
// })
//   return (
//     <>
//     <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
//       <h1>Authors</h1>
//     {
//       author?.map((a)=>(
//         <div key={a._id} className='mt-5'>
//           {/* <span className="text-gray-700 text-base">{a.name}</span> */}
//           <tr>
//            <td className="border border-gray-200 px-4 py-2">{a.name}</td>
//            <td className="border border-gray-200 px-4 py-2">{a.email}</td>
//           </tr>
//           <button
//           className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
//           onClick={()=>mutateDeleteAuthor.mutate({id:a._id})}
//           >
//           deleteAuthor
//           </button>
//           <button
//           className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
//           onClick={()=>mutateEditAuthor.mutate({id:a._id, name:a.name, email:a.email})}
//           >
//             editAuthor
//           </button>
//         </div>
//       ))
//     }
    
//     {/* <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
//     <p className="text-white text-ls">{author.email}</p> */}
//     <form onSubmit={()=>mutateCreateAuthor.mutate()}>
//       <label 
//         className='block text-gray-700 text-sm font-bold mb-2' 
//         htmlFor="name">
//           username
//       </label>
//       <input 
//       type="text"
//       placeholder="enter name"
//       value={author.name}
//       onChange={(e) => setAuthors({...author,name:e.target.value})}
//       required
//       />
//       <label 
//         className='block text-gray-700 text-sm font-bold mb-2' 
//         htmlFor="email">
//           email
//       </label>
//       <input 
//       type="text"
//       placeholder="Enter your email"
//       value={author.email}
//       onChange={(e) => setAuthors({...author,email:e.target.value})}
//       required
//       />
//       <button
//         className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
//         type="submit"
//       >
//         CReateAuthor
//       </button>
//     </form>
//   </div>  
//   </>
//   )
// }

// export default Author







import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Author() {
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState({ name: '', email: '' });
  const { id } = useParams();
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['author', id],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/author`);
        setAuthors(res.data);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    },
    refetchOnMount: 'always',
  });

  const mutateCreateAuthor = useMutation({
    mutationFn: async (newAuthor) => {
      try {
        const res = await axios.post(`/api/author/`, newAuthor);
        setAuthors([...authors, res.data]);
        return res.data;
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('author');
    },
  });

  const mutateDeleteAuthor = useMutation({
    mutationFn: async ({ authorId }) => {
      try {
        await axios.delete(`/api/author/${authorId}`);
        setAuthors(authors.filter((a) => a._id !== authorId));
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('author');
    },
  });

  const mutateEditAuthor = useMutation({
    mutationFn: async ({ authorId, name, email }) => {
      try {
        const res = await axios.put(`/api/author/${authorId}`, { name, email });
        setAuthors(authors.map((a) => (a._id === authorId ? res.data : a)));
        nav(`/author/${authorId}`);
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('author');
    },
  });

  const handleCreateAuthor = (e) => {
    e.preventDefault();
    mutateCreateAuthor.mutate(author);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching authors</p>;

  return (
    <>
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <h1>Authors</h1>
      <div>
        {authors?.map((a) => (
          <div key={a._id} className="mt-5">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-base">{a.name}</span>
              <span className="text-gray-700 text-base">{a.email}</span>
            </div>
            <button
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => mutateDeleteAuthor.mutate({ authorId: a._id })}
            >
              deleteAuthor
            </button>
            <button
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => mutateEditAuthor.mutate({ authorId: a._id, name: a.name, email: a.email })}
            >
              editAuthor
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleCreateAuthor}>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          username
        </label>
        <input
          type="text"
          placeholder="enter name"
          value={author.name}
          onChange={(e) => setAuthor({ ...author, name: e.target.value })}
          required
          className="border border-gray-300 mt-1 block w-full bg-gray-100 text-gray-900 rounded-sm h-[40px] shadow-sm"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={author.email}
          onChange={(e) => setAuthor({ ...author, email: e.target.value })}
          required
          className="border border-gray-300 mt-1 block w-full bg-gray-100 text-gray-900 rounded-sm h-[40px] shadow-sm"
        />
        <button
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          CreateAuthor
        </button>
      </form>
    </div>
    
    </>
  );
}

export default Author;
