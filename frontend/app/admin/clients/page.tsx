"use client"
import React ,{useState , useEffect} from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

import Sidebar from "../sideBar/page";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
interface Form{
  id: number;
  fullName: string;
  image_user: string;
  phoneNumber: string;
  userEmail:string;
  position:string;
} 


const Clients: React.FC =()=>{
  const [data, setData] = useState<Form[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searched,setSearched]=useState<string>("");
  const [refresh,setRefresh] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forms/getForms');
        setData(response.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const notify = () => {
    toast.success("client removed successfully", {
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
  const deletee = async (id:number) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
      console.log(res);
      notify();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
    setRefresh(!refresh);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(event.target.value);
  };
    return (
      <div >
        <div className="flex h-screen">
        <Sidebar/>
     
           {/* Main Content */}
           <div className="flex-1 p-4 ml-[350px]">
           {/* Your main content goes here */}
           <div>

           <Typography variant="h1" fontWeight="bold" style={{ color: 'black' }} className="items-center">
             List clients 
           </Typography>
           <ToastContainer />
           <div className="companies-container">
          
          <div  className="com-box">


<div className="  absolute -ml-[60px] mt-10 overflow-x-auto shadow-md sm:rounded-lg w-[1100px]">
    <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

                <th scope="col" className="px-6 py-3">
                    Id
                </th>
                <th scope="col" className="px-6 py-3 hover:bg-gray-200 cursor-pointer">
                    FullName 
                </th>
                <th scope="col" className="px-6 py-3 hover:bg-gray-200 cursor-pointer">
                    Email 
                </th>

                <th scope="col" className="px-6 py-3 hover:bg-gray-200 cursor-pointer">
                    Phone Number 
                </th>
                <th scope="col" className="px-6 py-3 hover:bg-gray-200 cursor-pointer">
                    Position 
                </th>
                <th scope="col" className="px-6 py-3 hover:bg-gray-200 cursor-pointer">
                    Edit 
                </th>
            </tr>
        </thead>
        <tbody>
        {data && data.map((e,i) => (
            <tr >
                <th scope="col" className="px-6 py-3">
                   {e.id}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                {e.fullName}
                </th>
                <td className="px-6 py-4">
                {e.userEmail}
                </td>

                <td className="px-6 py-4">
                {e.phoneNumber}
                </td>
                <td className="px-6 py-4">
                {e.position}
                </td>

                <td className="flex items-center px-6 py-4"> 
                 <button onClick={() => { deletee(e.id) }}> <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"><RestoreFromTrashIcon style={{ color: 'red' }}/></a></button>  
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
           </div>
    )
}
export default Clients;