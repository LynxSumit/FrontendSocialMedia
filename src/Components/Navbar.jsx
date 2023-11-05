/* eslint-disable react/prop-types */
import { useNavigate , Link } from 'react-router-dom'
import {IoMdAdd , IoMdSearch} from "react-icons/io"
const Navbar = ({searchTerm , setSearchTerm, user}) => {
  const navigate = useNavigate()
  
  return (
    <div className='flex gap-2 md:gap-3 bg-transparent  w-full mt-5 pb-7'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-lighter  border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className='ml-1 text-white'/>
        <input type='text'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='search'
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className='p-2 w-full bg-transparent text-white outline-none'
        />
      </div>
      
        <div className='flex gap-3'>
        {
          user &&
        <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
          <img src={user?.image} alt='user-img' className='w-14 h-12 rounded-lg'/>
        </Link>
        }
        <Link to="/create-pin" className=' text-black bg-slate-300 text-lg rounded-lg w-12 h12 md:w-14 md:h12 flex justify-center items-center'>
          <IoMdAdd/>
        </Link>
      </div>
      
    </div>
  )
}

export default Navbar
