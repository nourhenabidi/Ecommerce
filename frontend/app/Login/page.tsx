"use client";
import React ,{ useState,useRef,useEffect, KeyboardEvent }  from 'react';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { IoCloseSharp } from "react-icons/io5";


type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Login = ({ isOpen, onClose }: Props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" })

  // Function to parse JWT
  const parseJWT = (token: string) => {
    const base64Url = token.split('.')[1]; // Get the payload part
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert Base64Url to Base64
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
        e.preventDefault()
        const loginPromise = axios.post(`http://localhost:5000/api/up/login`, userData)
        toast.promise(
            loginPromise,
            {
                loading: 'Logging in...',
                success: 'Logged in successfully!',
                error: 'Login failed. Please try again.',
            }
        );
        const res = await loginPromise
        sessionStorage.setItem("token", res.data.token)
        const parsedData = parseJWT(res.data.token);
        console.log(parsedData);
        sessionStorage.setItem("P", res.data.user.password)
        console.log(res.data)
    } catch (error) {
        console.log(error);

    }
}
const signUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  try {
      e.preventDefault()
      const signUpPromise = axios.post(`http://localhost:5000/api/up/signup`, userData)
      toast.promise(
          signUpPromise,
          {
              loading: 'Signing up...',
              success: 'Signed up successfully!',
              error: 'Sign up failed. Please try again.',
          }
      )
      const res = await signUpPromise
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem("P", res.data.user.password)
  }
  catch (err) {
      console.log(err);
  }
}

const gatherData = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.name, e.target.value)

  setUserData({ ...userData, [e.target.name]: e.target.value })
}
console.log(userData);
const emailInput = useRef<HTMLInputElement>(null)
useEffect(() => {
  if (emailInput.current && isOpen) {
      setTimeout(() => {
          if (emailInput.current) {
              emailInput.current.focus();
              console.log("Input field is focused:", emailInput.current);

          }
      }, 300);
  } else {
      console.log("Input field is not available yet.");
  }
}, [isOpen, isSignUp]);

const handleKeyboardEvent = (e: KeyboardEvent<HTMLDivElement>) => {
  if (e.key === 'Escape') {
      onClose();
  }
};

const toggleSignUp = () => {
  setIsSignUp(prev => !prev);
};

if (!isOpen) return null;

  return (
    <div className='body'>
    <div
    id="login-popup"
    tabIndex={-1}
    onKeyDown={handleKeyboardEvent}
    className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
>
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white shadow animate-slide-up">
            <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={onClose}
            >
                <IoCloseSharp /> {/* Assuming CloseIcon renders the SVG */}
                <span className="sr-only">Close popup</span>
            </button>

            <div className="p-5">
                {/* <h3 className="text-2xl mb-0.5 font-medium">{isSignUp ? 'Sign Up' : 'Login'}</h3>
                <p className="mb-4 text-sm font-normal text-balck" >
                    {isSignUp ? 'Please sign up to continue.' : 'Please log in to continue.'}
                </p> */}

                <div className="text-center">
                    <p className="mb-3 text-2xl font-semibold leading-5 text-black">
                        {isSignUp ? 'Create an account' : 'Login to your account'}
                    </p>
                    <p className="mt-2 text-sm leading-4 text-orange-950">
                        {isSignUp ? 'Fill in the details to create an account.' : 'You must be logged in to perform this action.'}
                    </p>
                </div>

                <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                    <div className="h-px w-full bg-slate-200"></div>
                    <span>OR</span>
                    <div className="h-px w-full bg-slate-200"></div>
                </div>

                <form className="w-full">

                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                        ref={emailInput}
                        onChange={e => gatherData(e)}
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        className="block w-full  border border-black px-3 py-2 shadow-sm outline-none placeholder:text-gray-400"
                        placeholder="Email Address"
                    />
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        onChange={e => gatherData(e)}
                        type="password"
                        name="password"
                        autoComplete={isSignUp ? "new-password" : "current-password"}
                        required
                        className="mt-2 block w-full  border border-black px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 "
                        placeholder="Password"
                    />
                    {!isSignUp && (
                        <p className="mb-3 mt-2 text-sm text-gray-500">
                            <a href="/forgot-password" className="text-orange-950 hover:text-blue-600">Reset your password?</a>
                        </p>
                    )}
                    <button onClick={(e) => { isSignUp ? signUp(e) : login(e) }}
                        type="submit"
                        className="mt-6 inline-flex w-full items-center justify-center  bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                    >
                        {isSignUp ? 'Sign Up' : 'Continue'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-600">
                    {isSignUp ? (
                        <>
                            Already have an account?
                            <button onClick={toggleSignUp} className="font-medium text-orange-950 ml-1">Sign in</button>
                        </>
                    ) : (
                        <>
                            Don't have an account?
                            <button onClick={toggleSignUp} className="font-medium text-orange-950 ml-1">Sign up</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
</div>
</div>
  );
};

export default Login;