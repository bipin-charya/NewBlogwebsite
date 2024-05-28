import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

function Comments() {
  
  const [comments,setComments] = useState([])
  const [desc, setDesc] = useState('')
  
  const {id} = useParams()
  const nav = useNavigate()

  // useEffect(()=>{
  //   axios.get(`/api/comment`)
  //     .then((res)=>{
  //       setComments(res.data)
  //       console.log(res.data);
  //     })
  //     .catch((err)=>{
  //       console.error(err);
  //       toast.error(err)
  //     })
  // },[id])

  const {data} = useQuery({
    queryKey: ['comment'],
    queryFn: async ()=>{
      await axios.get(`/api/comment`)
            .then((res)=>{
                setComments(res.data)
                console.log(res.data);
              })
            .catch((err)=>{
                console.error(err);
                toast.error(err)
              })
    }
  })

  // const handleSubmit = async (e)=>{
  //   e.preventDefault()
  //   await axios.post(`/api/comment/commentpost`,{ 
  //     email:id,
  //     comment:desc,
  //     blogId:id
  //     })
  //     .then(res=>{
  //       toast.success("commented successfully")
  //       setDesc("")
  //       nav(`/blog-details/${id}`)
  //       console.log(desc)
  //     })
  //     .catch((error)=>{
  //       console.log(error)
  //       toast.error(error)
  //     })
  // }

  const mutatePostComment = useMutation({
    mutationFn: async ()=>{
      e.preventDefault()
      await axios.post(`/api/comment/commentpost`,{ 
      email:id,
      name:id,
      comment:desc,
      blogId:id
      })
      .then(res=>{
        toast.success("commented successfully")
        setDesc("")
        nav(`/blog-details/${id}`)
        console.log(res.data)
      })
      .catch((error)=>{
        console.log(error)
        toast.error(error)
      })    
    }
  })


  // const handleDelete = async(e)=>{
  //   await axios.delete(`/api/comment/${id}`)
  //               .then((res)=>{
  //                 console.log("deleted success",res.data);

  //               })
  //               .catch((err)=>{
  //                 console.error(err);
  //               })
  // } 


  const mutateDeleteComment = useMutation({
    mutationFn: async ({commentId})=>{
      await axios.delete(`/api/comment/${commentId}`)
                .then((res)=>{
                  console.log("deleted success",res.data);

                })
                .catch((err)=>{
                  console.error(err);
                })
    }
  })

  // const handleEdit = async(e)=>{
  //   await axios.put(`/api/comment/${id}`)
  //               .then((res)=>)
  //               .catch
  // }

    const mutateEditComment = useMutation({
      mutationFn: async({comment,commentId})=>{
                    await axios.put(`/api/comment/${commentId}`)
                                .then((res)=>{
                                  console.log(res.data)
                                  nav(`/blog-details/${id}`)
                                })
                                .catch((err)=>{
                                  console.error(err);
                                })
      }
    })

  return (
    <div>
      
      <h1 className="block text-md text-gray-700 font-bold mt-15">
        comments
      </h1>
       
          {
            comments?.map((c)=>(
              <>
              <div className='mt-5'> 
              <div key={c._id} className='block text-gray-700 text-sm font-bold mb-2'>
                <span className="text-gray-700 text-base">{c.comment}</span>
                <button
                  type="submit"
                  // onClick={handleDelete(c._id)}
                  onClick={()=> mutateDeleteComment.mutate({id:c._id})}
                  className="ml-20 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  onClick={()=> mutateEditComment.mutate(c._id)}
                  className="ml-20 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  edit
                </button>
              </div>
              </div>
              </>
            ))
          }
          
          
            <form onSubmit={()=> mutatePostComment.mutate()}>    
              <div >
                <textarea 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name='desc'
                placeholder="Enter comments..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                />
                </div>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  comment
                </button>
        
            </form> 
    </div>
  )
}

export default Comments