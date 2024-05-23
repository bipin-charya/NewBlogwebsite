import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

function Comments() {
  
  const [comments,setComments] = useState([])
  const [desc, setDesc] = useState('')
   
  useEffect(()=>{

  },[{desc}])

  const handleComment= async (e)=>{
    e.preventDefault()
    await axios.post(`/api/comment/:id`,{ 
      email:{_id},
      comment:comments,
      blogId:{_id}})
      .then(res=>{
        setComments(res.data)
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  return (
    <div>
      <h1 className="block text-md text-gray-700 font-bold mb-15">
        comments
      </h1>
      <form onSubmit={handleComment}>
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
      {
            comments?.map((comment)=>(
              <div className='block text-gray-700 text-sm font-bold mb-2'>
                {comment.desc}
              </div>
            ))
          }
    </div>
  )
}

export default Comments