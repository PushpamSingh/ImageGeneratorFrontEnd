import { ImageIcon, StepBack } from "lucide-react";
import React, { useState } from "react";
import { plans } from "../assets/assets";
import { data, useNavigate } from "react-router-dom";
import { useAuthState } from "../Zustand/useAuthState";
import { useGetUser } from "../Hooks/UsegetUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"
import ImageService from "../BackendService/Image.service";

const Pricing = () => {
  const [planId,setPlanid]=useState({
    planId:""
  })
  const {authUser}=useGetUser();
  const {authState,setAuthState}=useAuthState()
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const isAuthUser=Boolean(authUser)
  const isUser=Boolean(authUser)
  const navigate = useNavigate();

  const queryClient=useQueryClient()
  const {mutateAsync:PaymentMutation}=useMutation({
    mutationFn:async()=>{
      const response=await ImageService.PaymentRazorpay(planId);
      return response || null
    },
    onSuccess:()=>{    
      queryClient.invalidateQueries({queryKey:['authUser']})
    }
  })

  const {mutateAsync:verifyRazorpayMutation}=useMutation({
    mutationFn:async(Verifyresponse)=>{
      const response=await ImageService.veriFyRazorpay(Verifyresponse);
      return response || null
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['authUser']})
      toast.success("Credits Added",{style:{fontSize:'16px'}})
      navigate("/")
    }
  })
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
  const initPayment=(order)=>{
    try {
      const options={
        key: import.meta.env.VITE_RAZORPAY_API_KEY,
        amount:order.amount,
        currency:order.currency,
        name:'Credits Payment',
        description:'Credits Payment',
        order_id:order.id,
        receipt:order.receipt,
        handler:async(response)=>{
          verifyRazorpayMutation(response)
        }
      }
      const rzp=new window.Razorpay(options)
      rzp.open()
    } catch (error) {
     toast.error(error.message,{style:{fontSize:'16px'}})
    }
  }
  const Payment=async(planId)=>{
    try {
      if(!authUser){
        setAuthState('Login')
      }      
      setAuthState("")
      setLoadingPlanId(planId)
      setPlanid({...planId,planId:planId});
     const response = await PaymentMutation()
    //  console.log("paymentData: ",response);
      
      if(response?.success){
        initPayment(response.data)
        // console.log("PalnIdl ",planId);
      }
      setLoadingPlanId(null)

    } catch (error) {
      setLoadingPlanId(null)
      toast.error(error.message,{style:{fontSize:'16px'}})
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
                  <span className="text-2xl">₹{plan.price}</span>
                  <span className="text-base-content/50">/{plan.credits}credits</span>
                </p>
                {!isUser ? (
                  <button className="btn btn-neutral py-3 px-6 mt-4 w-full" onClick={(e) => handleGetstarted(e)}>
                    Get Started
                  </button>
                ) : (
                  <button onClick={(e)=>{Payment(plan.id)}} className="btn btn-neutral py-3 px-6 mt-4 w-full">
                    {
                      loadingPlanId === plan.id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ):(
                        "Purchase"
                      )
      
                    }
                  
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
