import React, { useRef, useState } from "react";
import {
  ImageIcon,
  LogOutIcon,
  Star,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const Headers = () => {
   const navigate = useNavigate();
  const [isUser, setUser] = useState(false);
 
  return (
    <nav
      className="flex justify-between items-center p-4 bg-base-100 shadow-md"
    >
      <div
        className="flex flex-start items-center gap-1.5 cursor-default logoCont"
        onClick={() => navigate("/")}
      >
        <ImageIcon className="size-6 text-info logo" />
        <span className="logo text-xl sm:text-2xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
          ImagiFy
        </span>
      </div>

      <div>
        {!isUser ? (
          <div className="flex items-center gap-4">
            <button
              className="text-secondary transition-all duration-700 hover:bg-gray-100 px-2 py-1 sm:px-4 sm:py-2 rounded-full cursor-pointer"
              onClick={() => navigate("/buy")}
            >
              Pricing
            </button>
            <button
              className="text-secondry btn btn-neutral px-4 py-1 sm:px-8 sm:py-2 rounded-full cursor-pointer"
              onClick={() => setUser(true)}
            >
              LogIn
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button
              className="btn btn-soft btn-primary group"
              onClick={() => navigate("/buy")}
            >
              <span className="bg-base-200 rounded-full p-1">
                <Star className="size-5 text-primary" />
              </span>
              <span className="">Credit Left: 50</span>
            </button>
            <p className="hidden md:block text-balance font-bold text-xs ">
              Hii, Pushpam
            </p>
            <div className="group relative transition-all duration-200">
              <User className="size-6 sm:size-8 cursor-pointer border-1 border-gray-400 rounded-full p-1 bg-base-100" />
              <button className="sm:hidden group-hover:block absolute top-8 right-0 btn btn-soft transition-all duration-200">
                <span className="flex gap-2 items-center">
                  <span>LogOut</span>
                  <LogOutIcon className="size-4" />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Headers;
