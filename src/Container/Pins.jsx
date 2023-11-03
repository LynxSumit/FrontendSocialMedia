import React from 'react'
import { useState } from 'react'
import {Routes,  Route} from "react-router-dom"
import {Navbar , PinDetail , CreatePin , Search , Feed} from "../Components"
const Pins = ({user}) => {
  
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className='px-2 md:px-5 ' >
    <div className='bg-gray-50 '>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user}/>
    </div>
    <div className='h-full'>
      <Routes>
      
           <Route path="/" exact element={<Feed />} />
          <Route path="/category/:categoryId" exact element={<Feed/>} />
          <Route exact path="/pin-detail/:pinId" element={<PinDetail user={user && user} />} />
          <Route exact path="/create-pin" element={<CreatePin user={user && user} />} />
          <Route exact path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
      </Routes>
    </div>
      
    </div>
  )
}

export default Pins
