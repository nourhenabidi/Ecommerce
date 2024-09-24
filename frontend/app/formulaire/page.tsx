"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../navBar/page";
import Footer from "../footer/page";

interface Form {
  fullName: string;
  phoneNumber: string;
  position: string;
  email: string;
  userEmail: string;
}

interface CartP {
  cartId: number; // Assuming cartId comes from a parent component
}

const Formulaire: React.FC<CartP> = ({ cartId }) => {
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const newForm: Form = {
    fullName,
    phoneNumber,
    position,
    email: userEmail,
    userEmail,
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
    try {
      // Send form data along with the cartId to the backend
      const response = await axios.post(
        `http://localhost:5000/api/forms/submit/${cartId}`,
        newForm
      );
      console.log("Server response:", response.data);

      notifySuccess();

      const { userCart } = response.data;
      console.log("Cart data:", userCart);

      toast.success("Cart data retrieved successfully!");
      
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
    <div className="body">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <img
            src="https://i.pinimg.com/736x/4c/0b/be/4c0bbe67066d0c6d9426664e7659dde7.jpg"
            className="object-cover absolute h-screen w-screen -z-10 top-0 left-0"
          />
        </div>
        <div className="max-w-md w-full p-6 bg-white shadow-lg">
          <h1 className="text-2xl font-semibold text-center text-black mt-8 mb-6">
            Fill Your Information
          </h1>
          <form>
            <div className="mb-4">
              <label className="block mb-2 text-sm text-black">Full Name</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-black"
                required
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm text-black">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-black"
                required
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm text-black">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-black"
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm text-black">Position</label>
              <input
                type="text"
                className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-black"
                required
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>

            <ToastContainer />
            <button
              type="button"
              className="w-32 bg-orange-950 text-white py-2 mx-auto block mb-2"
              onClick={createForm}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Formulaire;
