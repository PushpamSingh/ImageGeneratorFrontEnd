import { ImageIcon, StepBack } from "lucide-react";
import React, { useState } from "react";
import { plans } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../Zustand/useAuthState";
import { useGetUser } from "../Hooks/UsegetUser";

const Pricing = () => {
  const navigate = useNavigate();
  const {authUser}=useGetUser();
  const isAuthUser=Boolean(authUser)
  const {authState,setAuthState}=useAuthState()
  const [isUser, setUser] = useState(false);
  const handleGetstarted=(e)=>{
    e.preventDefault();
   if(isAuthUser){
    setAuthState("")
    navigate("/")
    setAuthState("")
   }else{
     navigate("/")
    setAuthState("Login")
   }
  }
  return (
    <>
      <button className="btn btn-info" onClick={() => navigate(-1)}>
        <StepBack className="size-5" />
        Go back
      </button>
      <div className="w-full h-full flex justify-center items-center p-4 flex-col gap-4 mt-14 sm:mt-10">
        <h1 className="badge badge-outline px-4 text-base-content/70">
          OUR PLANS
        </h1>
        <h1 className="text-2xl font-semibold sm:text-4xl">Choose The Plan</h1>

        <div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="w-64 flex flex-col justify-center bg-base-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <ImageIcon className="size-9 mb-4 text-info" />
                <h3 className="text-xl font-semibold">{plan.id}</h3>
                <p className="text-base-content/70 mt-2">{plan.desc}</p>
                <p className="mt-4">
                  <span className="text-2xl">${plan.price}</span>
                  <span className="text-base-content/50">/{plan.credits}credits</span>
                </p>
                {!isUser ? (
                  <button className="btn btn-neutral py-3 px-6 mt-4 w-full" onClick={(e) => handleGetstarted(e)}>
                    Get Started
                  </button>
                ) : (
                  <button className="btn btn-neutral py-3 px-6 mt-4 w-full">
                    Purchase
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
