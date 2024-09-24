"use client"
import React, { useState , useEffect , useRef } from "react";
import { List, ListItem, ListItemIcon, ListItemText,Menu,Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import axios from "axios";
import Link from 'next/link';

interface MenuItem {
  title: string;
  path: string;
}
interface obj {
  fullName:string;
  image_user:string;
}

interface User{
 
    id: number;
    fullName: string;
    image_user: string;
}

const Sidebar: React.FC <{}>= () => {
  const [state, setState] = useState(false);
  const [person,setPerson] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [show,setShow] = useState<boolean>(true)




useEffect(() => {
  const getOne = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${id}`)
      setPerson(response.data);
      console.log("eya",response.data);
      
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  getOne();
}, []);


  const navigation: MenuItem[] = [
    { title: "View Profile", path: "/admin/profile" }
];




  return (
    <div className=" fixed top-0 buttom-0 flex h-screen " style={{ zIndex:9999}}>
      {/* Sidebar */}
      <div className={`col-span-3 bg-[#c8ad7f] text-black px-7 py-7 ${!show?'w-[100px]':'w-[250px]'}`} >
      <List className={`flex  flex-col px-4 py-2 hover:bg-gray-1000 ${!show ? 'w-40' : ''}`}>

        <div className={`flex ${show?'ml-[170px]':'ml-[10px]'}`}>
 
  <button onClick={()=>setShow(!show)}>
  <MenuOutlinedIcon className="text-black"  />
  </button>
</div>
          <ListItem  className="flex items-center flex-col px-4 py-2 hover:bg-gray-1000" >
 {show &&
                  <div>
                  <div className="flex items-center space-x-4">
<img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
className="w-full h-full rounded-full" />

        </div>
                 
            
            <ul className={`bg-grey top-12 right-0 mt-5 space-y-5 lg:absolute lg:border border-black     lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
                {   
                    navigation.map((item, idx) => (
                        <li key={idx}>
                            <a className="block text-black-600  lg:p-2.5" href={item.path}>
                                {item.title}
                            </a>
                        </li>
                    ))
                }
            </ul>
            <ListItemText 
            primary={<p className="mt-2"></p>} />
            </div>   
}         
</ListItem>

<div className="mt-[50px] " >
          <ListItem button>
            <ListItemIcon className="text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-10 ">
                 <path strokeLinecap="round" strokeLinejoin="round"d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
             </svg>
            </ListItemIcon>
            <Link href={'/admin/dashboard'} ><button > <ListItemText className="flex items-center gap-x-2 text-black p-2 rounded-lg  hover:bg-gray-300 active:bg-gray-400 duration-150" primary={show&&<p>Dashboard</p>}/></button></Link>
          </ListItem>

            <ListItem button >
            <ListItemIcon className="text-black" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-10">
     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 21a7.5 7.5 0 0115 0" />
     </svg>
            </ListItemIcon>
            <Link href={'/admin/clients'}  ><button > <ListItemText className="flex items-center gap-x-2 text-black p-2 rounded-lg  hover:bg-gray-300 active:bg-gray-400 duration-150" primary={show&&<p>Clients</p>}/></button></Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon className="text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
</svg>
            </ListItemIcon>
            
            <Link href={'/admin/orders'} ><button > <ListItemText className="flex items-center gap-x-2 text-black p-2 rounded-lg  hover:bg-gray-300 active:bg-gray-400 duration-150" primary={show&&<p>Orders</p>}/></button></Link>
          </ListItem>
          <ListItem button >
            <ListItemIcon className="text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-10">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
             </svg>
            </ListItemIcon>
            <Link href={'/admin/addProd'} ><button > <ListItemText className="flex items-center gap-x-2 text-black p-2 rounded-lg  hover:bg-gray-300 active:bg-gray-400 duration-150" primary={show&&<p>Adding</p>} /></button></Link>
          </ListItem>

            {/* <ListItem button>
            <ListItemIcon className="text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
             </svg>
            </ListItemIcon>
            
            <Link href={'/admin/profile'} ><button > <ListItemText className="flex items-center gap-x-2 text-black p-2 rounded-lg  hover:bg-gray-300 active:bg-gray-400 duration-150" primary={show&&<p>Profile</p>}/></button></Link>
          </ListItem> */}

          <ListItem button>
            <ListItemIcon className="text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
            </ListItemIcon>
            
            <Link href={'/admin/update'} ><button > <ListItemText className="flex items-center gap-x-2 text-black p-2 rounded-lg  hover:bg-gray-300 active:bg-gray-400 duration-150" primary={show&&<p>Update</p>}/></button></Link>
          </ListItem>
          </div>
          </List>
      </div>
    </div>
  );
};

export default Sidebar;