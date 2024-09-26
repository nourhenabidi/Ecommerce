"use client";
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import Sidebar from "../sideBar/page";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';


interface Form {
  id: number;
  fullName: string;
  phoneNumber: string;
  userEmail: string;
  position: string;
  sold: boolean;
  createdAt:number;
  user_id:number;
}

interface CartItem {
  CartID: number; 
  ProductID: number;
  productName: string;
  productPrice: number;
  Quantity:number;
  CartImage:string[];
 
}

const Orders: React.FC = () => {
  const [data, setData] = useState<Form[] | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [carts, setCarts] = useState<CartItem[]>([])


  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forms/getForms');
        const sortedForms = response.data.sort(
          (a: Form, b: Form) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setData(sortedForms);
      } catch (error) {
        console.log('Error fetching data',error);
      } 
    };
    fetchData();
  }, [refresh]);

  const fetchCartUser = async (id: number) => {
    if (!id) return;
  
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/carts/${id}`);
      console.log("API Response:", response.data); // Check the structure here
  
      // Store the cart data for this user in the `carts` state
      setCarts(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      toast.error("Failed to fetch cart data");
    }
  };

  const notify = (message: string) => {
    toast.success(message, {
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

  const toggleSoldStatus = async (id: number, currentStatus: boolean) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/forms/${id}/sold`, {
        sold: !currentStatus,
      });

      if (res.status === 200) {
        setRefresh(!refresh);
        notify(`Order ${!currentStatus ? "marked as Sold" : "marked as Not Sold"}`);
      }
    } catch (error) {
      console.error('Error updating sold status:', error);
      toast.error('Error updating sold status');
    }
  };

  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />
        
        <div className="flex-1 p-4 ml-[350px]">

          <Typography variant="h1" fontWeight="bold" style={{ color: 'black' }} className="items-center">
            Orders
          </Typography>
          <ToastContainer />

          <div className="companies-container">
            <div className="com-box">
              <div className="absolute -ml-[60px] mt-10 overflow-x-auto shadow-md sm:rounded-lg w-[1400px]">
                <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Id</th>
                      <th scope="col" className="px-6 py-3">Full Name</th>
                      <th scope="col" className="px-6 py-3">Email</th>
                      <th scope="col" className="px-6 py-3">Phone Number</th>
                      <th scope="col" className="px-6 py-3">Position</th>
                      <th scope="col" className="px-6 py-3">Orders</th>
                      <th scope="col" className="px-6 py-3">Date</th>
                      <th scope="col" className="px-6 py-3">Sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.map((e) => (
                      <tr key={e.id}>
                        <td className="px-6 py-3">{e.id}</td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                          {e.fullName}
                        </td>
                        <td className="px-6 py-4">{e.userEmail}</td>
                        <td className="px-6 py-4">{e.phoneNumber}</td>
                        <td className="px-6 py-4">{e.position}</td>
                     
                        <td className="px-6 py-4">
                          {carts.length ? (
                            <ul>
                              {carts.map((item) => (
                                <li key={item.ProductID}>
                                  {item.CartImage && item.CartImage.length > 0 ? (
                                    <img
                                      className="w-[40px] h-[40px]"
                                      src={item.CartImage[0]} 
                                      alt={item.productName}
                                    />
                                  ) : (
                                    <span>No Image Available</span>
                                  )}
                                  <div> Name: {item.productName}</div>
                                  <div> Price: {item.productPrice}</div>
                                  <div> Quantity: {item.Quantity}</div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <button
                              onClick={() => fetchCartUser(e.user_id)}
                              className="text-blue-500 underline"
                            >
                              Show Orders
                            </button>
                          )}
                           
                        </td>
                        <td className="px-6 py-4">{e.createdAt}</td>
                        <td className="flex items-center px-6 py-4">
                          <button
                            onClick={() => toggleSoldStatus(e.id, e.sold)}
                            className={`w-[150px] py-1.5 px-2 ring-1 ring-inset ${e.sold ? 'bg-green-500' : 'bg-red-500'} text-white`}
                          >
                            {e.sold ? 'Sold' : 'Not yet'}
                          </button>
                        </td>
                      </tr>
                    ))}
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
