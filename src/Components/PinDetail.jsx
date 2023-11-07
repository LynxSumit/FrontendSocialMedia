/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { MdDownloadForOffline, MdLink } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";
import { IoMdLink } from "react-icons/io";
import toast from "react-hot-toast";

const PinDetail = ({ user }) => {
  const navigate = useNavigate()
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();
  const fetchPinDetail = useCallback(() => {
    let query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(query).then((data) => {
        
        setPinDetail(data[0]);
        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((res) => {
            setPins(res);
          }).catch(err  => toast.error(err.message))
        }
      }).catch(err => toast.error(err.message));
    }
  } , [pinId]);

  const addComment = useCallback(() => {
    if(!user){
      navigate("/login");
    }
    if(comment){ setAddingComment(true)
    client
    .patch(pinId)
    .setIfMissing({comments : []}) 
    .insert('after' , 'comments[-1]' , [{
      comment,
      _key : uuid(),
      postedBy : {
        _type : 'postedBy',
        _ref: user._id,
      }
    }])
    .commit()
    .then(()=> {
      fetchPinDetail()
      setComment('')
      setAddingComment(false)
      setTimeout(() => {
// window.location.reload()
      }, 2000);
    })
    }

  } , [user, comment, navigate, pinId, fetchPinDetail])
  useEffect(() => {
    fetchPinDetail();
  }, [pinId, fetchPinDetail , comment , addComment]);
  if (!pinDetail) return <Spinner message="Loading pin..." />;
  return (
   <>
     <div
      className="flex md:flex:row flex-col m-auto  bg-lighter rounded-md"
      style={{ maxWidth: "1500px"}}
    >
      <div className="flex justify-center items-center md:items-start flex-initial border-l-4 border-r-4 border-gray-400">
        <img
          src={pinDetail?.image && urlFor(pinDetail.image).url()}
          className=" rounded-t-lg rounded-b-sm my-5 mx-auto h-2/3 w-2/3 md:h-1/3 md:w-1/3  shadow-lg"
          alt="user-post"
        />
      </div>
      <div className="w-full p-5 flex-1  xl:min-w-620">
        <div className="flex items-center justify-between ">
          <div className="flex gap-2 items-center">
            <a
              className="bg-white w-9 h-9 rounded-full flex justify-center text-dark items-center opacity-75 hover:opacity-100 hover:shadow-md outline-none text-xl"
              download
              onClick={(e) => e.stopPropagation()}
              href={`${pinDetail.image.asset.url}?dl=`}
            >
              <MdDownloadForOffline />
            </a>
          </div>
          <a href={pinDetail.destination} className="text-xl bg-gray-100 rounded-sm px-5 opacity-75 text-black hover:opacity-100 py-1 drop-shadow-md" target="blank" rel="norefer">
          <IoMdLink/>
          </a>
        </div>
        <div>
          <h1 className="text-4xl text-white font-bold break-words mt-3">
            {pinDetail.title}
          </h1>
          <p className="mt-3 text-gray-300">{pinDetail.about}</p>
        </div>
        <Link
          to={`/user-profile/${pinDetail?.postedBy?._id}`}
          className="flex gap-2 mt-5 items-center border-b-2 border-[bg] py-2 w-fit rounded-md"
        >
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={pinDetail.postedBy?.image}
            alt="logo-profile"
          />
          <p className="font-semibold text-white ">
            {" "}
            {pinDetail.postedBy?.userName}
          </p>
        </Link>
        <h2 className="mt-5 text-2xl text-gray-200">Comments</h2>
        <div className="max-h-370 overflow-y-auto ">
        
         
          {pinDetail?.comments?.map((comment, i) => (
            <div className="flex gap-2 mt-5 items-center bg-lightest overflow-hidden rounded-full px-3 py-1 w-full"  key={i}>
              <img
                src={comment?.postedBy?.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="flex flex-col">
            
                <Link  to={`/user-profile/${comment?.postedBy?._id}`}  className="font-bold text-gray-800 capitalize" >{comment.postedBy?.userName}</Link>
                <p className="text-gray-200">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center flex-wrap mt-6 gap-3">
          <Link
            to={'/'}
           
          >
         
            <img
              className="w-10 h-10 rounded-full cursor-pointer"
              src={user?.image ? user.image : "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"}
              alt="logo-profile"
            />
          </Link>
          <input className="flex-1 border-gray-100  outline-none border-2 p-2 rounded-2xl focus:border-gray-300" type="text" placeholder="Add a comment.." value={comment} onChange={(e) => setComment(e.target.value)} />
          <button onClick={addComment} type="button" className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none">
            {addingComment ? 'Posting a comment...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
    
    {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
   </>
  );
};

export default PinDetail;
