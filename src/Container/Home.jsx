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
    <div className="flex bg   flex-col w-auto h-screen transition-height duration-75 ease-out">
    <div className="hidden md:flex h-screen flex-initial">
      <Sidebar user={user && user} />
    </div>
    <div className="flex md:hidn flex-row">
      <div className="p-2 w-full md:h-20 flex flex-row justify-between  mx-8 items-center shadow-md">
        <HiMenu fontSize={40} className="cursor-pointer text-white" onClick={() => setToggleSidebar(true)} />
        <Link to="/">
          <img src={logo} alt="logo" className="w-28" />
        </Link>
        {
          user &&
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="user-pic" className="w-9 h-9 md:w-14 md:h-14 rounded-full " />
        </Link>
        }
      </div>
      {toggleSidebar && (
      <div className="fixed  md:w-1/4 w-full    bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
        <div className="absolute w-full flex justify-end items-center  p-2 mt-4 ">
          <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
        </div>
        <Sidebar closeToggle={setToggleSidebar} user={user && user} />
      </div>
      )}
    </div>
    <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
      <Routes>
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="/*" element={<Pins user={user && user} />} />
      </Routes>
    </div>
  </div>
  )
}

export default Home
