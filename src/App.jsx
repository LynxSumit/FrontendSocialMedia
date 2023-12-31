import {
Routes , Route , useNavigate
} from "react-router-dom"
import Home from "./Container/Home"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Login from "./Components/Login"
import './App.css'
import { Toaster } from "react-hot-toast"

function App() {
  let navigate= useNavigate()
let User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();


  return (
    <GoogleOAuthProvider clientId="712244245266-fmk04ngf034bbsp65fu152ip157juagk.apps.googleusercontent.com">
    <Routes>
      <Route path="login" element={<Login/>}/>
      <Route path="/*" element={<Home/>}/>
    </Routes>
    <Toaster/>
    </GoogleOAuthProvider>
  )
}

export default App
