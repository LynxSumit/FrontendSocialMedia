import { useState , useRef , useEffect } from "react"
import {HiLogin, HiMenu} from "react-icons/hi"
import {AiFillCloseCircle} from "react-icons/ai"
import {Link , Route ,Routes} from "react-router-dom"
import {Sidebar , UserProfile } from "../Components"
import { client } from "../client"
import logo from "../assets/logo.png"
import Pins from "./Pins"
import { Userquery } from "../utils/data"
import { UserInfo } from "../utils/userInfo"
import { IoMdLogIn } from "react-icons/io"
const Home = () => {
  const scrollRef = useRef(null);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
const userInfo = UserInfo()
useEffect(()=>{
 const query = Userquery(userInfo?.sub)
 client.fetch(query).then((data) => {
  
  setUser(data[0])
  
 })
}, [userInfo?.sub])


useEffect(() => {
  scrollRef.current.scrollTo(0,0)
}, []);
  return (
    <div  className="flex bg overscroll-hidden md:flex-row flex-col h-screen transition-height  duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
      <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">

        <HiMenu fontSize={40} className="cursor-pointer text-gray-200" onClick={() => setToggleSidebar(true)}/>
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 "/>
        </Link>
     { user &&    <Link to={`/user-profile/${user?._id}`}>
          <img src={user?.image} alt="logo" className=" w-14 md:w-25  rounded-full" />
        </Link>}
     { !user &&    <Link to={`/login`} className="  flex items-center px-2 text-gray-200 flex-col">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
</svg>
<span className="   font-semibold ">Login</span>
        </Link>
        }


      </div>
      {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle fontSize={30} className="cursor-pointer text-white" onClick={()=> setToggleSidebar(false)}/>
          </div>
          <Sidebar  user={user && user} closeToggle={setToggleSidebar}/>
        </div>
      )}
      </div>
      <div className="pb-2 flex-1 h-full overflow-y-scroll " ref={scrollRef}> 
      <Routes>
      <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
      </Routes>
       </div>
    </div>
  )
}

export default Home
