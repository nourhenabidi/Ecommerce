"use client";
import React, { useState } from "react";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Form {
  fullName: string;
  phoneNumber: string;
  position: string;
  email: string;
  userEmail:string;
  
}

interface FormProps {
  onClose: () => void;
}

const Formulaire: React.FC<FormProps> = ({ onClose }) => {
  const [fullName, setFullName] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [position, setPosition] = useState<string>("")
  const [userEmail, setuserEmail] = useState<string>("")

  const newForm: Form = {
    fullName: fullName,
    phoneNumber: phoneNumber,
    position: position,
    email: userEmail,
    userEmail:userEmail
};
  const notifySuccess = () => {
    toast.success("Form submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const createForm = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data", newForm);
    try {
   
      const response = await axios.post("http://localhost:5000/api/forms/submit", newForm);
      console.log("Server response:", response.data);
      notifySuccess();
      
      // Assuming you have the user's ID available, either from the form or localStorage
      const userId = sessionStorage.getItem("user"); 
  
      if (userId) {
        // Fetch the user's cart after the form submission
        const cartResponse = await axios.get(`http://localhost:5000/api/cart/carts/${userId}`);
        console.log("User's Cart Data:", cartResponse.data);
  
        // Optionally, you can handle the cart data here (e.g., display it, store it in state, etc.)
        toast.success("Cart data retrieved successfully!");
      } else {
        toast.error("User ID is missing. Unable to fetch cart.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error:", error.response?.data);
        toast.error(`Error: ${error.response?.data.error || "Something went wrong"}`);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };
  
  
  
  return (
    <div className="relative z-10">
      <ToastContainer />
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose}></div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex items-start justify-between px-4 py-6">
                  <h2 className="text-3xl font-bold">Fill your Info</h2>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <IoCloseSharp size={24} />
                  </button>
                </div>
                <form className="px-4">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="email"
                      name="userEmail"
                      onChange={(e)=>setuserEmail(e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Email Address
                    </label>
                  </div>

                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="fullName"
                      onChange={(e)=>setFullName(e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Full Name
                    </label>
                  </div>

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="tel"
                        name="phoneNumber"
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Phone Number
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="position"
                        onChange={(e)=>setPosition(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Position
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  onClick={createForm}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulaire;
