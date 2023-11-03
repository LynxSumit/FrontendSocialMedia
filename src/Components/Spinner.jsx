import { PropagateLoader } from 'react-spinners'

const Spinner = ({message}) => {
  return (
    <div className='flex flex-col mt-35  justify-center items-center w-full h-full '>
    <PropagateLoader color="#d65e36"  cssOverride={{marginTop : '2rem'}} />
<p className='text-lg text-center py-7 px-3'>
    {`...${message}...`}
</p>
      
    </div>
  )
}

export default Spinner
