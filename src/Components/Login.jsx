import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { client } from "../client";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();

  
  const googleHandler = (res) => {
    const decode = jwtDecode(res.credential);
    
    localStorage.setItem("user", JSON.stringify(decode));
    const { sub, picture, name } = decode;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };
    client.createIfNotExists(doc).then(() => {
     
      navigate("/", { replace: true });
    });
  };
  return (
    <div className="flex   justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={googleHandler}
              onError={() => {
                toast.error("Login Failed")
                // console.log("Login Failed");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
