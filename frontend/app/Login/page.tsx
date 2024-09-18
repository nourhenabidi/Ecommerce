"use client";
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { IoCloseSharp } from "react-icons/io5";
import 'react-hot-toast';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: () => void; // Add this prop for navigation to sign-up
  onLoginSuccess: () => void;
};

const SignInModal = ({ isOpen, onClose, onSignUp, onLoginSuccess }: Props) => {
    if (!isOpen) return null;
    
    const [isSignUp, setIsSignUp] = useState(false);
    const [userData, setUserData] = useState({ email: "", password: "" });
    const emailInput = useRef<HTMLInputElement>(null);
    const router = useRouter(); // Add router for navigation

    // Function to parse JWT
    const parseJWT = (token: string) => {
        const base64Url = token.split('.')[1]; // Get the payload part
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert Base64Url to Base64
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };
    
    const ErrNotif = () => toast.error('Please check your information!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });


    const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            e.preventDefault();
            const loginPromise = axios.post(`http://localhost:5000/api/up/login`, userData);
            toast.promise(
                loginPromise,
                {
                    success: 'Logged in successfully!',
                    error: 'Login failed. Please try again.',
                }
            );
            const res = await loginPromise;
            sessionStorage.setItem("token", res.data.token);
            const parsedData = parseJWT(res.data.token);
            console.log(parsedData);
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
            console.log(res.data);

            // Handle role-based navigation
            const userRole = parsedData.user.role;
            if (userRole === 'admin') {
                router.push('/admin'); // Admin dashboard route
            } else {
                router.push(`/bodyhome?account=${res.data.user.id}`);
            }

            onClose();
            onLoginSuccess();
        } catch (error) {
            console.log(error);
            ErrNotif();
        }
    };

    useEffect(() => {
        // Check if the user is logged in or not
        const token = sessionStorage.getItem("token");
        if (token) {
            const parsedData = parseJWT(token);
            console.log("User data:", parsedData);
            // Optionally handle user data or redirect if needed
        }
    }, []);

    const gatherData = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name, e.target.value);
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

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

    return (
        <div className='body'>
            <div
                id={close ? "" : "login-popup"}
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
                            <div className="text-center">
                                <p className="mb-3 text-2xl font-semibold leading-5 text-black">
                                    Login to your account
                                </p>
                                <p className="mt-2 text-sm leading-4 text-orange-950">
                                    You must be logged in to perform this action.
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
                                    className="block w-full border border-black px-3 py-2 shadow-sm outline-none placeholder:text-gray-400"
                                    placeholder="Email Address"
                                />
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    onChange={e => gatherData(e)}
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    className="mt-2 block w-full border border-black px-3 py-2 shadow-sm outline-none placeholder:text-gray-400"
                                    placeholder="Password"
                                />
                                <button onClick={(e) => { login(e) }}
                                    type="button"
                                    className="mt-6 inline-flex w-full items-center justify-center bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                                >
                                    Continue
                                </button>
                            </form>

                            <div className="mt-6 text-center text-sm text-slate-600">
                                Don't have an account?
                                <button onClick={onSignUp} className="font-medium text-orange-950 ml-1">Sign up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignInModal;
