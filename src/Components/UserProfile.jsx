import { googleLogout } from "@react-oauth/google"
import {useState , useEffect} from "react"
import {client } from "../client"
import {AiOutlineLogout} from "react-icons/ai"
import { useParams, useNavigate } from "react-router-dom"
import {userCreatedPinsQuery , userQuery , userSavedPinsQuery} from "../utils/data"
import MasonryLayout from "./MasonryLayout"
import Spinner from "./Spinner"
import toast from "react-hot-toast"

const UserProfile = () => {
  const activeBtnStyles = "bg-red-500  text-gray-100 font-bold p-2 rounded-full w-20 outline-none transition-all duration-180 ease-linear shadow-lg"
  const notActiveBtnStyles = "bg-primary text-gray-400 mr-4 font-bold p-2 rounded-full w-20 outline-none transition-all duration-180 ease-linear shadow-lg"
  const RandomImg = 'https://source.unsplash.com/1600x900/?nature,technology,animals,gaming'
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const [isloggedInUser, setIsloggedInUser] = useState(false);
  const navigate = useNavigate()
  const {userId} = useParams()
  let loggedInUser = JSON.parse(localStorage.getItem('user'));
 
  // if(userId != )
  const logoutfunc = () => {
    localStorage.clear()
    googleLogout()
    navigate("/login")
    
  }

  useEffect(() => {
    
    
  const query = userQuery(userId)
  client.fetch(query)
  .then((res)=>{
setUser(res[0])
  })
   
  }, [userId]);
  useEffect(() => {
   
    if(loggedInUser && loggedInUser.sub == userId){
  setIsloggedInUser(true)
}
    if(text === 'Created'){
      const createPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createPinsQuery).then((res)=>{
        setPins(res)
      })
    }else if(text=== 'Saved' && isloggedInUser == true){
      const savePinsQuery = userSavedPinsQuery(userId);
      client.fetch(savePinsQuery).then((res)=>{
    
        setPins(res)
      })

    }
  }, [text, userId, isloggedInUser, loggedInUser]);
  if(!user) return <Spinner message="Loading profile"/>
  return (
    <div className="relative pb-2 h-full  justify-center items-center">
    <div className="flex flex-col pb-5">
      <div className="relative flex flex-col mb-7">
        <div className="flex flex-col justify-center items-center ">
          <img src={RandomImg} className="w-full h-370 2xl:h-510 shadow-lg object-cover" alt="random photo"/>
          <img 
          src={user?.image}
          className="rounded-full w-20 h-20 -mt-10  shadow-xl object-cover"/>
          <h1 className="font-bold text-3xl mt-3 text-center text-white ">{user.userName}</h1>
          <div className="absolute top-0 z-1 right-0">
          {
            userId === user._id && (

            isloggedInUser === true &&   <button className="bg-white p-2 m-5 rounded-full cursor-pointer outline-none shadow-lg" onClick={logoutfunc}>
              <AiOutlineLogout   fontSize={30} color="red"/>
             
          
           

              </button>
            )
          }

        
          </div>
        </div>
        <div className="text-center mb-7 mt-4" >
          <button type="button" onClick={(e) => {setText(e.target.textContent) ;setActiveBtn('created')}} className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}>Created</button>
         {(isloggedInUser == true )&&  <button type="button" onClick={(e) => {setText(e.target.textContent) ;setActiveBtn('saved')}} className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}>Saved</button> }
        </div>
        <div className="px-2 ">
          <MasonryLayout pins={pins}/>
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default UserProfile
