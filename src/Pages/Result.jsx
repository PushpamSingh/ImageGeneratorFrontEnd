import React, { useState } from "react";
import { assets } from "./../assets/assets";
import { useNavigate } from "react-router-dom";
import { StepBack } from "lucide-react";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const[loadin,setLoading]= useState(false);
  const navigate = useNavigate();
  return (
    <>
      <button className="btn btn-info" onClick={()=> navigate(-1)}>
        <StepBack className="size-5" />
        Go back
        </button>
    <form className="w-full max-w-5xl px-4 mx-auto flex flex-col items-center justify-center overflow-x-hidden mt-10 sm:-mt-6" onSubmit={()=>alert('Image generated!')}>
      {/* Image Section */}
      <div className="relative rounded-lg shadow-lg w-full sm:w-[50%] max-w-full">
        <img src={image} alt="" className="w-full h-auto object-contain" />
        <span className={`absolute h-1 bg-info bottom-0 left-0 rounded-2xl ${loadin?"w-full transition-all duration-[10s]":"w-0"}` }/>
      </div>

      {/* Input Section */}
      {isImageLoaded ? (
        <div className="flex gap-2">
          <button className="btn btn-success py-3 px-6 rounded-full mt-4" onClick={() => setIsImageLoaded(false)}>
            <span className="text-base-content/70">Generate more images</span>
          </button>
          <a
            href={image}
            download
            className="btn btn-outline btn-info py-3 px-6 rounded-full mt-4"
          >
            <span>Download</span>
          </a>
        </div>
      ) : (
        <div className="w-full sm:w-[60%] flex items-center justify-between mt-4 border border-base-content/20 rounded-full px-2 overflow-hidden">
          <input
            type="text"
            name="input"
            placeholder="Describe what you want to generate"
            required
            className="px-4 py-3 outline-none flex-grow bg-transparent w-[70%]"
          />
          <button type="submit" className="btn btn-neutral py-3 px-6 rounded-full whitespace-nowrap" onClick={()=> setIsImageLoaded(true)}>
            <span>Generate</span>
          </button>
        </div>
      )}
    </form>
    </>
  );
};

export default Result;
