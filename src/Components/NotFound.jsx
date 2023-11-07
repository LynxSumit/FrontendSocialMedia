import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex h-screen items-center justify-center flex-col'>
      <span className='text-lg   px-5 py-4 rounded-xl flex justify-center items-center font-bold text-gray-200 '>No Pins Found  <span className='text-3xl py-2'>😞</span></span>
      <Link to={'/create-pin'} className='bg-red-500 p-3 text-white text-lg rounded-sm  '>Create Pins</Link>
    </div>
  )
}

export default NotFound
