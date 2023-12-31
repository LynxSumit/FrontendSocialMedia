/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import Spinner from "../Components/Spinner";
import { categories } from "../utils/data";
import toast from "react-hot-toast";

const CreatePin = ({user}) => {

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);
  const navigate = useNavigate();
  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
  
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/svg+xml" ||
      type === "image/jpeg" ||
      type === "image/gif"
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((doc) => {
          setImageAsset(doc);
          setLoading(false);
          console.log(1)
        })
        .catch((err) => {
          toast.error(err.message)
          console.log(err.message);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if(!user){
      toast.error("Please login to access this page");
      navigate("/login")
      return;
    }
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => {
        toast.success("Pin Created Successfully.")
        navigate('/');
      }).catch(err => toast.error(err.message));
    } else {
      setFields(true);

      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
  };
 
  
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:4/5">
      {fields && (
      
        <p className="text-red-600 text-xl transition-all duration-150 ease-in">
          Please fill all the fields
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-lighter lg:p-5 p-3 lg:w4/5 w-full ">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex flex-col justify-center items-center border-2 px-2 border-dashed border-gray-300 w-full h-420 ">
            {loading && <Spinner message="Uploading"/>}
            {wrongImageType && <p>Wrong Image...</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="flex flex-col justify-center items-center ">
                    <p className="font-bold text-2xl cursor-pointer">
                      <AiOutlineCloudUpload className="text-gray-400"/>
                    </p>
                    <p className="text-lg text-slate-300">Click to upload</p>
                  </div>
                  <p className="mt-32 px-5 text-gray-400">
                    Use high-quality JPG, SVG, PNG, GIF less than 20mb
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full ">
              
                <img
                  src={imageAsset?.url}
                  alt="uploaded-img"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  onClick={() => setImageAsset(null)}
                  className="absolute bottom-3 right-3 rounded-full bg-white p-3 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                >
                 
                  {<MdDelete />}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-6 lg:p-5 mt-5 w-full ">
          <input
            type="text"
            placeholder="Add your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border-none shadow-md  outline-none  border-slate-300  p-2 rounded-2xl bg-lightest text-white placeholder:text-gray-100 "
          />
           
          {user && (
            <div className="flex gap-2 items-center my-2 rounded-lg">
              <img
                src={user.image}
                alt="user-img"
                className="w-10 h-10 rounded-full"
              />
              <p className="font-bold text-gray-200">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            placeholder="What is your pin about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="flex-1 border-none shadow-md  outline-none  border-slate-300  p-2 rounded-2xl bg-lightest text-white placeholder:text-gray-100 "
          />
          <input
            type="text"
            placeholder="Add a destination link"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-1 border-none shadow-md  outline-none  border-slate-300  p-2 rounded-2xl bg-lightest text-white placeholder:text-gray-100 "
          />
          <div className="flex flex-col ">
            <div>
              {" "}
              <p className="mb-2 font-semibold text-lg text-gray-200 sm:text-xl">
                Choose pin category
              </p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 d-md-none bg-lighter  text-white border-slate-300 rounded-md p-2 cursor-pointer
          "
              >
                <option value="other" disabled className=" ">
                  Select Category
                </option>
                {categories.map((category, index) => (
                  <option
                    key={index}
                    value={category.name}
                    className="text-base border-0 outline-none capitalize text-gray-700 py-2"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
            <button className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none" type="button" onClick={savePin}>
                          Save pin
            </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
