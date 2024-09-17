"use client"
import React ,{useState , useEffect} from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from "../sideBar/page";
interface Client {
  id: number;
  fullName: string;
  image_user: string;
  phoneNumber: string;
  email:string;
  role:string;
} 


const client: React.FC =()=>{
  const [data, setData] = useState<Client[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searched,setSearched]=useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/getall');
        setData(response.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const search = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/getName/${searched}`);

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
      }

      const searchData: Client[] = await response.json();
      setData(searchData);
      console.log("found", searchData);
    } catch (error) {
      console.error(error);
    }
  };
  const deletee = async (id:number) => {
    try {
      await fetch(`http://localhost:5000/api/users/delete/:id`, {
        method: 'DELETE',
      });
      console.log("user deleted");
    } catch (error) {
      console.error("delete category:", error);
    }
    location.reload();

  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(event.target.value);
  };
    return (
      <div className="body">
        <div className="flex h-screen">
        <Sidebar/>
     
           {/* Main Content */}
           <div className="flex-1 p-4 ml-[350px]">
           {/* Your main content goes here */}
           <div>

<div className="mb-4 ml-[800px]">
              <input
                type="text"
                placeholder="Search ...."
                value={searched}
                onChange={handleSearchChange}
                className="p-2 border border-gray-300 rounded-md"
              />
              <button onClick={search} className="ml-2 p-2 bg-blue-500 text-black rounded-md">
              <SearchIcon />
              </button>
            </div>
           <Typography variant="h1" fontWeight="bold" style={{ color: '#000080' }} className="items-center">
             list clients 
           </Typography>

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
                {e.email}
                </td>

                <td className="px-6 py-4">
                {e.phoneNumber}
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
export default client;