"use client";
import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSignUpSuccess: () => void;
};

const Signup = ({ isOpen, onClose, onSignUpSuccess  }: Props) => {
  if (!isOpen) return null;
  const router = useRouter();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const emailInput = useRef<HTMLInputElement>(null);

  const signUp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/up/signup", userData);
  
      // Save token to session storage
      sessionStorage.setItem("token", res.data.token);
  
      if (typeof res.data.user === 'string') {
        sessionStorage.setItem("user", res.data.user);
      } else {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
      }
  
      onSignUpSuccess();
      onClose();
    } catch (err) {
    
     err? toast.error("Email already exists. Please use a different email."):""
  
    }
  };
  

  useEffect(() => {
    if (emailInput.current && isOpen) {
      setTimeout(() => {
        if (emailInput.current) {
          emailInput.current.focus();
        }
      }, 300);
    }
  }, [isOpen]);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const gatherData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="body">
    <ToastContainer />
      <div
        id="login-popup"
        tabIndex={-1}
        onKeyDown={handleKeyboardEvent}
        className="bg-black/50 overflow-y-auto  overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white shadow animate-slide-up">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={onClose}
            >
              <IoCloseSharp />
              <span className="sr-only">Close popup</span>
            </button>
            <div className="p-5">
              <div className="text-center">
                <p className="mb-3 text-2xl font-semibold leading-5 text-black">
                  Create an account
                </p>
                <p className="mt-2 text-sm leading-4 text-orange-950">
                  Fill in the details to create an account.
                </p>
              </div>
              <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                    <div className="h-px w-full bg-slate-200"></div>
                    <span>OR</span>
                    <div className="h-px w-full bg-slate-200"></div>
                </div>
              <form className="w-full">
                <input
                  ref={emailInput}
                  onChange={gatherData}
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="block w-full border border-black px-3 py-2 shadow-sm outline-none placeholder:text-gray-400"
                  placeholder="Email Address"
                />
                <input
                  onChange={gatherData}
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  required
                  className="mt-2 block w-full border border-black px-3 py-2 shadow-sm outline-none placeholder:text-gray-400"
                  placeholder="Password"
                />
                <button
                  onClick={signUp}
                  type="button"
                  className="mt-6 inline-flex w-full items-center justify-center bg-orange-950 p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                >
                  Register
                </button>
              </form>
              <div className="mt-6 text-center text-sm text-slate-600">
                <>
                  Already have an account?
                  <button onClick={onClose} className="font-medium text-orange-950 ml-1">
                    Login
                  </button>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;