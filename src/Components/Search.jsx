import {useState , useEffect} from 'react'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { client } from '../client'
import { FeedQuery , searchQuery } from '../utils/data'

const Search = ({searchTerm}) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);
useEffect(() => {
  if(searchTerm){
    setLoading(true)
    const query = searchQuery(searchTerm.toLowerCase());
    client.fetch(query).then((res)=>{
      setPins(res)
      setLoading(false)
    })

  }else{
    client.fetch(FeedQuery).then((res)=>{
      setPins(res)
      setLoading(false)
    })
  }

  
  
}, [searchTerm]);
  return (
    <div>
  {loading && <Spinner message="Searching for pins"/>}
  {pins?.length !== 0  && <MasonryLayout pins={pins}/>}
  {pins?.length === 0  && searchTerm !== '' && !loading && (
    <div className='mt-10 text-center text-xl'> No Pins Found!</div>
  )}
    </div>
  )
}

export default Search
