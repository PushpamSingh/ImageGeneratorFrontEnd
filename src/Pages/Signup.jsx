import { Lock, MailsIcon, PlusIcon, User2Icon } from "lucide-react";
import  { useEffect } from "react";

const SignUp = () => {
  
    useEffect(() => {
      document.body.style.overflow = "hidden"; 
      return () => {
        document.body.style.overflow = "unset";
      };
    }, []);  
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center z-10 backdrop-blur-sm bg-black/30">
      
      <form className="badge-ghost p-6 flex flex-col justify-between gap-6 md:w-[400px] md:h-[400px] relative">
          <div className="absolute rotate-45 right-0 top-0 px-4 py-4 cursor-pointer hover:scale-105 transition-all duration-300">
            <PlusIcon className="border-1 rounded-full"/>
          </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <h1 className="text-2xl font-bold">SignUp</h1>
          <p>Get Started! Please sign Up to continue</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-4">
            <div className="input input-accent rounded-full">
            <User2Icon className="text-base-content/90" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              autoComplete="on"
              className="p-2"
            />
          </div>
          <div className="input input-accent rounded-full">
            <MailsIcon className="text-base-content/90" />
            <input
              type="text"
              name="email"
              placeholder="Email Id"
              required
              autoComplete="on"
              className="p-2"
            />
          </div>
          <div className="input input-accent rounded-full">
            <Lock className="text-base-content/90" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              autoComplete="on"
              className="p-2"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button className="btn btn-info w-full">SignUp</button>
          <p className="text-xs text-center">Already have an account? <a href="" className="text-primary underline">LogIn</a></p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
