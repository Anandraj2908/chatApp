import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { userAuth } from '../utils/AuthContext'

const Signup = () => {

  const {handleUserSignup} = userAuth();

  const [credentials, setCredentials] = useState({
    name:'',
    email:'',
    password1:'',
    password2:''
    
  })
  const handleInputChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setCredentials({...credentials,[name]:value})
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded shadow-md max-w-md w-full m-5">
      <h1 className='text-center text-4xl'>Nirvan Chat</h1>
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={(e)=>{handleUserSignup(e,credentials)}}  method="POST">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border rounded-md py-2 px-3 text-gray-200 bg-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              value={credentials.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border rounded-md py-2 px-3 text-gray-200 bg-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password1" className="block text-gray-300 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password1"
              name="password1"
              minLength={8}
              required
              className="w-full border rounded-md py-2 px-3 text-gray-200 bg-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={credentials.password1}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password2" className="block text-gray-300 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="password2"
              name="password2"
              required
              minLength={8}
              className="w-full border rounded-md py-2 px-3 text-gray-200 bg-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={credentials.password2}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300"
          >
            Sign Up
          </button>
          <div className='my-5'>Already have an account? <Link to={"/login"} className='text-sky-400'>Login</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Signup