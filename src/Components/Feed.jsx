import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../client'
import MasonryLayout from "./MasonryLayout"
import {searchQuery , FeedQuery} from "../utils/data"
import Spinner from "./Spinner"
import NotFound from "./NotFound.jsx"
const Feed = () => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);
  const {categoryId} = useParams()
  useEffect(() => {
    setLoading(true)
    if(categoryId){
      const query = searchQuery(categoryId)
      client.fetch(query)
      .then((data)=> {
        setPins(data)
        setLoading(false);
      })
    }else{
      client.fetch(FeedQuery).then((data) => {
        setPins(data)
        setLoading(false)
      })
    }
    
  }, [categoryId]);
  
  if(loading){
    
    return <Spinner message="Loading"/>}
  if( pins?.length  == 0 && !loading ) {
    
    console.log("Hello")
    return <NotFound/>}

  return (
    <div>
      {
        pins && <MasonryLayout  pins={pins}/>
      }
    </div>
  )
}

export default Feed
