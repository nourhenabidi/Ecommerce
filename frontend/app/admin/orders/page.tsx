"use client"
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import Sidebar from "../sideBar/page";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

interface Order {
    CartID: number;
    productName: string;
    CartImage: string[] | null;  // Allow null for CartImage
    productPrice: number;
    Quantity: number;
  }

const Orders: React.FC = () => {
    const [data, setData] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
  
    let userId: number | undefined; 
    const user = sessionStorage.getItem("user");
    if (user) {
        userId = JSON.parse(user).id;
    }
  
    const fetchCartUser = async () => {
        if (!userId) return;
      
        try {
          console.log("Fetching cart for userId:", userId);
          const response = await axios.get(`http://localhost:5000/api/cart/carts/${userId}`);
          console.log("API Response:", response.data);
          setData(response.data);
        } catch (error) {
          console.error("Error fetching cart data:", error);
          setError('Error fetching cart data');
          toast.error("Failed to fetch cart data"); // Notify user about the error
        } finally {
          setLoading(false);
        }
      };
  
    const notify = () => {
      toast.success("Client removed successfully", {
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
  
    const deletee = async (id: number) => {
        console.log("Deleting item with ID:", id);  // Debugging delete action
        try {
          const response = await axios.delete(`http://localhost:5000/api/cart/${id}`); // Ensure this endpoint matches your delete route
          if (response.status === 200) {
            notify(); // Show success notification
            setData((prevData) => prevData?.filter(item => item.CartID !== id) || null); // Update state to remove deleted item
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          toast.error("Failed to delete item");
        }
      };

  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 p-4 ml-[350px]">
          <Typography variant="h1" fontWeight="bold" style={{ color: 'black' }} className="items-center">
            List Orders
          </Typography>
          <ToastContainer />
          <div className="companies-container">
            <div className="com-box">
              <div className="absolute -ml-[60px] mt-10 overflow-x-auto shadow-md sm:rounded-lg w-[1100px]">
                <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Id</th>
                      <th scope="col" className="px-6 py-3 hover:bg-gray-200 cursor-pointer">Product Name</th>
                      <th scope="col" className="px-6 py-3 hover:bg-gray-200 cursor-pointer">Price (DT)</th>
                      <th scope="col" className="px-6 py-3 hover:bg-gray-200 cursor-pointer">Quantity</th>
                      <th scope="col" className="px-6 py-3 hover:bg-gray-200 cursor-pointer">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data ? (
                      data.map((item, i) => (
                        <tr key={item.CartID}>
                          <th scope="col" className="px-6 py-3">{item.CartID}</th>
                          <td className="px-6 py-4">{item.productName}</td>
                          <td className="px-6 py-4">{item.productPrice}</td>
                          <td className="px-6 py-4">{item.Quantity}</td>
                          <td className="flex items-center px-6 py-4">
                            <button onClick={() => deletee(item.CartID)}>
                              <RestoreFromTrashIcon style={{ color: 'red' }} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center">
                          {loading ? "Loading..." : error ? error : "No cart data available"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
