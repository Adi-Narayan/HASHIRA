import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            console.log(response);
            if (response.data.success) {
              setToken(response.data.token)
            }
            else {
              toast.error(response.data.message)
            }
        }
        catch (error) {
          console.log(error);
          toast.error(error.message)
        }
    }

  return (

    <div className='relative min-h-screen flex items-center justify-center w-full bg-gray-100'>

      {/* Watermark Logo */}
      <img
        src={assets.logo}
        alt="Watermark"
        className='absolute opacity-50 w-320 h-320 object-contain z-0'
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />

      {/* Login Form */}
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full z-10'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} 
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type="email"
              placeholder='Email'
              required
            />
          </div>

          <div className='mb-3'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type="password"
              placeholder='Password'
              required
            />
          </div>

          <button
            className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black'
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
