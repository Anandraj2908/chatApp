import React ,{useEffect, useState} from 'react'
import { userAuth } from '../utils/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
  const {user, handleUserLogin} = userAuth()
  const navigate = useNavigate();
  const [credentials, setCredentials] =  useState({
    email:'',
    password:''
  })

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  }
  ,[])

  const handleInputChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setCredentials({...credentials,[name]:value})
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white ">
      <div className="bg-gray-800 p-8 rounded shadow-md max-w-md w-full m-5">
        <h1 className='text-center text-4xl'>Nirvan Chat</h1>
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={(e)=>{handleUserLogin(e,credentials)}} method="POST">
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
            <label htmlFor="password" className="block text-gray-300 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={8}
              className="w-full border rounded-md py-2 px-3 text-gray-200 bg-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300"
          >
            Login
          </button>
          <div className='my-5'>New? <Link to={"/signup"} className='text-sky-400'>Sign Up</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Login