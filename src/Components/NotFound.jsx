import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex h-full items-center justify-center flex-col'>
      <span className='text-lg text-gray-800  px-5 py-4 rounded-xl'>Pin Not Found  <span className='text-3xl py-2'>😞</span></span>
      <Link to={'/create-pin'} className='bg-red-500 p-3 text-white text-lg rounded-sm  '>Create Pins</Link>
    </div>
  )
}

export default NotFound
