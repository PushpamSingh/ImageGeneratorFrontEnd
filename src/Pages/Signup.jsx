import { Lock, MailsIcon, PlusIcon, User2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthState } from "../Zustand/useAuthState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "../BackendService/Auth.service";
import toast from "react-hot-toast";
import { useGetUser } from "../Hooks/UsegetUser";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { authState, setAuthState } = useAuthState();
  const [signupData, setSignupData] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  const queryClient = useQueryClient();
  const { mutate: signUpMutation, isPending ,error} = useMutation({
    mutationFn: async () => {
      const response = await AuthService.createUser(signupData);
      return response ? response?.data : null;
    },
    onSuccess: () => {
      toast.success("User created!", { style: { fontSize: "16px" } });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setAuthState("");
    },
  });
  const { authUser } = useGetUser();
  const isAuthUser = Boolean(authUser);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    signUpMutation();
   
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  const navigateLogin = (e) => {
    e.preventDefault();
    if (isAuthUser) {
      navigate("/");
      setAuthState("");
    } else {
      setAuthState("Login");
      // console.log("AuthState: in signup",authState);
    }
  };
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center z-10 backdrop-blur-sm bg-black/30">
      <form
        className="badge-ghost p-6 flex flex-col justify-between gap-6 md:w-[400px] md:h-[400px] relative"
        onSubmit={(e) => handleSignup(e)}
      >
        <div className="absolute rotate-45 right-0 top-0 px-4 py-4 cursor-pointer hover:scale-105 transition-all duration-300">
          <PlusIcon
            className="border-1 rounded-full"
            onClick={() => setAuthState("")}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <h1 className="text-2xl font-bold">SignUp</h1>
          <p>Get Started! Please sign Up to continue</p>
        </div>
        {error && <p className="text-center text-red-700">{error?.message}</p>}
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
              value={signupData.fullName}
              onChange={(e)=>setSignupData({...signupData,fullName:e.target.value})}
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
              value={signupData.email}
              onChange={(e)=>setSignupData({...signupData,email:e.target.value})}
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
              value={signupData.password}
              onChange={(e)=>setSignupData({...signupData,password:e.target.value})}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button className="btn btn-info w-full" type="submit">
            {isPending ? (
              <>
                <span className="loadind loading-spinner loading-xs text-white"></span>
              </>
            ) : (
              "SignUp"
            )}
          </button>
          <p className="text-xs text-center">
            Already have an account?{" "}
            <a
              href=""
              className="text-primary underline"
              onClick={(e) => {
                navigateLogin(e);
              }}
            >
              LogIn
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
