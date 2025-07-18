import React, { useState } from "react";
import { assets } from "./../assets/assets";
import { useNavigate } from "react-router-dom";
import { StepBack } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetUser } from "../Hooks/UsegetUser";
import ImageService from "../BackendService/Image.service";
import toast from "react-hot-toast";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const[loading,setLoading]= useState(false);
  const [promptdata,setPrompt]=useState({
    prompt:""
  });
  const {authUser} = useGetUser()
  const navigate = useNavigate();

  const queryClient=useQueryClient();
  const {mutate:generateMutation,error}=useMutation({

    mutationFn:async()=>{
      setLoading(true)
      const response=await ImageService.generateImage(promptdata);
      console.log("response: ",response);
      return response ? response.data : null
    },
    onSuccess:(data)=>{
      queryClient.invalidateQueries({queryKey:['authUser']})
      setLoading(false)
      setImage(data.ImageUrl)
      setIsImageLoaded(true)
    },
    onError:(error)=>{
      toast.error(error.message,{style:{fontSize:'16px'}})
      setLoading(false)
    }
  })
  console.log("Prompt: ",promptdata.prompt);
  

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(authUser.creditBalance <= 0){
      navigate("/buy")
      toast.error("you don't have enough credits")
    }else{
      generateMutation()
    }
  }

  return (
    <>
      <button className="btn btn-info" onClick={()=> navigate(-1)}>
        <StepBack className="size-5" />
        Go back
        </button>
    <form className="w-full max-w-5xl px-4 mx-auto flex flex-col items-center justify-center overflow-x-hidden mt-10 sm:-mt-6" onSubmit={(e)=>handleSubmit(e)}>
      {/* Image Section */}
      <div className="relative rounded-lg shadow-lg w-full sm:w-[50%] max-w-full">
        <img src={image} alt="" className="w-full h-auto object-contain" />
        <span className={`absolute h-1 bg-info bottom-0 left-0 rounded-2xl ${loading?"w-full transition-all duration-[10s]":"w-0"}` }/>
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
            value={promptdata.prompt}
            onChange={(e)=>setPrompt({...promptdata,prompt:e.target.value})}
          />
          <button type="submit" className="btn btn-neutral py-3 px-6 rounded-full whitespace-nowrap" >
            <span>
              {
                loading ?(
                  "Generating...."
                ):(
                  "Generate"
                )
              }
            </span>
          </button>
        </div>
      )}
    </form>
    </>
  );
};

export default Result;
