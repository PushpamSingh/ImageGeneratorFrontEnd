import { Cross, Lock, MailsIcon, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "../BackendService/Auth.service";
import toast from "react-hot-toast";
import { useAuthState } from "../Zustand/useAuthState";
import { useGetUser } from "../Hooks/UsegetUser";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const queryClient = useQueryClient();
  const { authState, setAuthState } = useAuthState();
  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { mutate: loginMutation, isPending ,error} = useMutation({
    mutationFn: async () => {
      const response = await AuthService.loginUser(logindata);
      if (response) {
        return response.data;
      } else {
        return response;
      }
    },
    onSuccess: () => {
      toast.success("Login Successfuly", { style: { fontSize: "16px" } });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setAuthState("");
    },
  });
  const { authUser } = useGetUser();
  const isAuthUser = Boolean(authUser);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    loginMutation();
  };
  const navigateSignUp = (e) => {
    if (isAuthUser) {
      navigate("/");
      setAuthState("");
    } else {
      e.preventDefault();
      setAuthState("Signup");
      // console.log("AuthState: in login",authState);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center z-10 backdrop-blur-sm bg-black/30">
      <form
        className="badge-ghost p-6 flex flex-col justify-between gap-6 md:w-[400px] md:h-[400px] relative"
        onSubmit={(e) => handleLogin(e)}
      >
        <div
          className="absolute rotate-45 right-0 top-0 px-4 py-4 cursor-pointer hover:scale-105 transition-all duration-300"
          onClick={() => setAuthState("")}
        >
          <PlusIcon className="border-1 rounded-full" />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <p>Welcome back! Please sign in to continue</p>
        </div>
        {
          error && <p className="text-center text-red-700">{error?.message}</p>
        }
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="input input-accent rounded-full">
            <MailsIcon className="text-base-content/90" />
            <input
              type="text"
              name="email"
              placeholder="Email Id"
              required
              autoComplete="on"
              className="p-2"
              value={logindata.email}
              onChange={(e) =>
                setLoginData({ ...logindata, email: e.target.value })
              }
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
              value={logindata.password}
              onChange={(e) =>
                setLoginData({ ...logindata, password: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* <a href="" className="text-xs text-info">
            Forgot Password?
          </a> */}
          <button
            className="btn btn-info w-full"
            disabled={isPending}
            type="submit"
          >
            {isPending ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
              </>
            ) : (
              "Login"
            )}
          </button>
          <p className="text-xs text-center">
            Don’t have an account?{" "}
            <a
              className="text-primary underline cursor-pointer"
              onClick={(e) => navigateSignUp(e)}
            >
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
