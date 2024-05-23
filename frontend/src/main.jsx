import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import CreateBlog from "./components/CreateBlog.jsx"
import Layout from './Layout.jsx'
import BlogList from "./pages/BlogList.jsx"
import Contactus from "./components/ContactUs.jsx"
import Comments from "./components/Comments.jsx"
import BlogDetails from "./components/BlogDetails.jsx"
import Author from "./components/Author.jsx"

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<BlogList/>}/>
      <Route path='/post' element={<CreateBlog/>} />
      <Route path='/contact-us' element={<Contactus/>} />
      <Route path='/blog-details/:id' element={<BlogDetails/>} />
      <Route path='/author' element={<Author/>} />
      <Route path='/commentpost' element={<Comments/>} />
      {/* <Route 
      loader={}
      path='' 
      element={} /> */}

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
