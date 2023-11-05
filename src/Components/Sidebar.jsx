/* eslint-disable react/prop-types */
// import React from 'react'
import {RiHomeFill} from "react-icons/ri"
// import {IoIosArrowForward} from "react-icons/io"
import logo from "../assets/logo.png"
import { Link, NavLink } from 'react-router-dom'
import {categories as Categories} from "../utils/data"
const Sidebar = ({user , closeToggle}) => {
 
    const handleCloseSidebar = () => {
        if(closeToggle)closeToggle(false)
    }
    const isNotActiveStyle = "flex items-center px-5 gap-3 text-gray-400 hover:text-white transition-all duration-200 ease-in-out capitalize"
    const isActiveStyle = "flex items-center px-5 gap-3 font-extrabold text-slate-200  border-r-2 border-black transition-all duration-200 ease-in-out capitalize"
  return (
    <div className='flex flex-col justify-between bg h-full overflow-y-scroll  min-w-210 '>
    
      <div className='flex flex-col'>
        <Link to="/" className='flex px-5 my-6 w-190 items-center'>
<img src={logo} alt='logo' className="w-full" onClick={handleCloseSidebar}/>
        </Link>
        <div className='flex flex-col gap-5 '>
        <NavLink onClick={handleCloseSidebar} to="/" className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle + "text-white"}>
<RiHomeFill/>
Home
        </NavLink>
        <h3 className='mt-2 px-5 text-gray-300 2xl:text-xl '>Discover Categories</h3>
        {Categories.slice(0 , Categories.length-1).map((category) => (
          <NavLink to={`category/${category.name}`} onClick={handleCloseSidebar}  key={category.name} className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}>
          <img src={category.image} className='h-8 w-8 rounded-full  shadow-sm'/>
{category.name}
          </NavLink>
        ))}
          </div>
      </div>
      {user && (
        <Link to={`/user-profile/${user._id}`} onClick={handleCloseSidebar} className='flex my-5 mb-3 gap-2 px-2 py-1 items-center bg-gray-400 text-white  shadow-2xl rounded-lg  mx-3 '>
          <img src={user.image} className='w-10 h-10 rounded-full' alt="user-profile"/>
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  )
}

export default Sidebar
