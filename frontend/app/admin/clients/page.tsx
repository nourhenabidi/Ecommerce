"use client"
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import Sidebar from "../sideBar/page";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

interface User {
id:number;
email:string;
createdAt:number;
role:string;
  }

const Clients: React.FC = () => {
    const [data, setData] = useState<User[] | null>(null);


    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/getall');
        setData(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching product data', error);
      }
    };
  
    useEffect(() => {
      fetchUser(); 
    }, []);
  
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
        console.log("Deleting user with ID:", id);  // Debugging delete action
        try {
          const response = await axios.delete(`http://localhost:5000/api/users/delete/${id}`); // Ensure this endpoint matches your delete route
          if (response.status === 200) {
            notify(); // Show success notification
            setData((prevData) => prevData?.filter(item => item.id !== id) || null); // Update state to remove deleted item
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
            List Clients
          </Typography>
          <ToastContainer />
          <div className="companies-container">
            <div className="com-box">
              <div className="absolute -ml-[60px] mt-10 overflow-x-auto shadow-md sm:rounded-lg w-[1100px]">
                <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Id</th>
                      <th scope="col" className="px-6 py-3 hover:bg-gray-200 cursor-pointer">Email</th>
                      <th scope="col" className="px-6 py-3 hover:bg-gray-200 cursor-pointer">Date</th>
                      <th scope="col" className="px-6 py-3 hover:bg-gray-200 cursor-pointer">Role</th>
                      <th scope="col" className="px-6 py-3 hover:bg-gray-200 cursor-pointer">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
        
                     {data && data.map((item, i) => (
                        <tr key={item.id}>
                          <th scope="col" className="px-6 py-3">{item.id}</th>
                          <td className="px-6 py-4">{item.email}</td>
                          <td className="px-6 py-4">{item.createdAt}</td>
                          <td className="px-6 py-4">{item.role}</td>
                       
                          <td className="flex items-center px-6 py-4">
                            <button onClick={() => deletee(item.id)}>
                              <RestoreFromTrashIcon style={{ color: 'red' }} />
                            </button>
                          </td>
                        </tr>
                      ))
}
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

export default Clients;
