// "use client"
// import React, { useState , useEffect , useRef } from "react";
// import { List, ListItem, ListItemIcon, ListItemText,Menu,Typography } from '@mui/material';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
// import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
// import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
// import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
// import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
// import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
// import axios from "axios";
// import Link from 'next/link';
// import DonutSmallIcon from '@mui/icons-material/DonutSmall';
// import ChatIcon from '@mui/icons-material/Chat';
// interface MenuItem {
//   title: string;
//   path: string;
// }
// interface obj {
//   fullName:string;
//   image_user:string;
// }

// interface User{
 
//     id: number;
//     fullName: string;
//     image_user: string;
// }

// const Sidebar: React.FC <{}>= () => {
//   const [state, setState] = useState(false);
//   const [person,setPerson] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [fullName,setfullName]=useState<string>("")
//   const [image_user,setimage_user]=useState<string>("")
//   const [show,setShow] = useState<boolean>(true)
//   const profileRef = useRef<HTMLButtonElement>(null);
//   let id= typeof window !== 'undefined' ? localStorage.getItem("id"): null;



// useEffect(() => {
//   const getOne = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/users/${id}`)
//       setPerson(response.data);
//       console.log("eya",response.data);
      
//     } catch (error) {
//       setError('Error fetching data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   getOne();
// }, []);


//   const navigation: MenuItem[] = [
//     { title: "View Profile", path: "/admin/profile" }
// ];




//   useEffect(() => {
//       const handleDropDown = (e: MouseEvent) => {
//           if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
//               setState(false);
//           }
//       };
//       document.addEventListener('click', handleDropDown);
//       return () => {
//           document.removeEventListener('click', handleDropDown);
//       };
//   }, []);
//   return (
//     <div className=" fixed top-0 buttom-0 flex h-screen ">
//       {/* Sidebar */}
//       <div className={`col-span-3 bg-black text-white px-7 py-7 ${!show?'w-[100px]':'w-[250px]'}`}>
//       <List className={`flex  flex-col px-4 py-2 hover:bg-gray-1000 ${!show ? 'w-40' : ''}`}>

//         <div className={`flex ${show?'ml-[170px]':'ml-[10px]'}`}>
 
//   <button onClick={()=>setShow(!show)}>
//   <MenuOutlinedIcon sx={{ color: '#c8ad7f' }}  />
//   </button>
// </div>
//           <ListItem  className="flex items-center flex-col px-4 py-2 hover:bg-gray-1000" >
//  {show &&
//                   <div>
//                   <div className="flex items-center space-x-4">
//             <button ref={profileRef} className="w-24 h-24 outline-none rounded-full ring-offset-2 ring-gray-100 ring-2 lg:focus:ring-indigo-600"
//                 onClick={() => setState(!state)}>
// {!id?<img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
// className="w-full h-full rounded-full" />:<img
//                         src={person?.image_user||"https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"}
//                        className="w-full h-full rounded-full"
//                         alt="Profile"

//                     />}
//             </button>


//         </div>
                 
            
//             <ul className={`bg-grey top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
//                 {   
//                     navigation.map((item, idx) => (
//                         <li key={idx}>
//                             <a className="block text-black-600  lg:p-2.5" href={item.path}>
//                                 {item.title}
//                             </a>
//                         </li>
//                     ))
//                 }
//             </ul>
//             <ListItemText 
//             primary={<p className="mt-2"></p>} />
//             </div>   
// }         
// </ListItem>

// <div className="mt-[50px]">
//           <ListItem>
//             <ListItemIcon>
//               <HomeOutlinedIcon sx={{ color: '#c8ad7f' }}  className="hover:bg-gray-300 hover:bg-opacity-50"/>
//             </ListItemIcon>
//             <Link href={'/admin/dashboard'} ><button > <ListItemText primary={show&&<p>Dashboard</p>}/></button></Link>
//           </ListItem>

//             <ListItem button >
//             <ListItemIcon >
//               <GroupOutlinedIcon sx={{ color: '#c8ad7f' }}  className="hover:bg-gray-300 hover:bg-opacity-50"/>
//             </ListItemIcon>
//             <Link href={'/admin/clients'}  ><button > <ListItemText  primary={show&&<p>Clients</p>}/></button></Link>
//           </ListItem>
//           <ListItem button >
//             <ListItemIcon >
//               <ContactMailOutlinedIcon sx={{ color: '#c8ad7f' }}  className="hover:bg-gray-300 hover:bg-opacity-50"/>
//             </ListItemIcon>
//             <Link href={'/admin/company'} ><button > <ListItemText primary={show&&<p>Companies</p>} /></button></Link>
//           </ListItem>

//             <ListItem button>
//             <ListItemIcon>
//               <AccountCircleOutlinedIcon sx={{ color: '#c8ad7f' }} className="hover:bg-gray-300 hover:bg-opacity-50"/>
//             </ListItemIcon>
            
//             <Link href={'/admin/profile'} ><button > <ListItemText primary={show&&<p>Profile</p>}/></button></Link>
//           </ListItem>
    
//           </div>
//           </List>
//       </div>

      


//     </div>
//   );
// };

// export default Sidebar;
"use client"
import React, { useState , useEffect , useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';  
 import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
 import { List, ListItem, ListItemIcon, ListItemText,Menu,Typography } from '@mui/material';

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


const Sidebar: React.FC = () => {
   const [state, setState] = useState(false);
   const [person,setPerson] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [fullName,setfullName]=useState<string>("")
   const [image_user,setimage_user]=useState<string>("")
   const [show,setShow] = useState<boolean>(true)
   const profileRef = useRef<HTMLButtonElement>(null);
   let id= typeof window !== 'undefined' ? localStorage.getItem("id"): null;
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




  useEffect(() => {
      const handleDropDown = (e: MouseEvent) => {
          if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
              setState(false);
          }
      };
      document.addEventListener('click', handleDropDown);
      return () => {
          document.removeEventListener('click', handleDropDown);
      };
  }, [])
    return (
        <nav className="fixed top-0 left-0 w-full h-full border-r bg-[rgba(139,69,19,0.7)] space-y-8 sm:w-60">
            <div className="flex flex-col h-full">
             
                <div className={`col-span-3 text-white px-7 py-7 ${!show?'w-[100px]':'w-[250px]'}`}>
       <List className={`flex  flex-col px-4 py-2 hover:bg-gray-1000 ${!show ? 'w-40' : ''}`}>

         <div className={`flex ${show?'ml-[170px]':'ml-[10px]'}`}>
 
   <button onClick={()=>setShow(!show)}>
   <HomeOutlinedIcon sx={{ color: '#c8ad7f' }}  />
   </button>
 </div>
           <ListItem  className="flex items-center flex-col px-4 py-2 hover:bg-gray-1000" >
  {show &&
                  <div>
                  <div className="flex items-center space-x-4">
            <button ref={profileRef} className="w-24 h-24 outline-none rounded-full ring-offset-2 ring-gray-100 ring-2 lg:focus:ring-indigo-600"
                onClick={() => setState(!state)}>
{!id?<img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
className="w-full h-full rounded-full" />:<img
                        src={person?.image_user||"https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"}
                       className="w-full h-full rounded-full"
                        alt="Profile"

                    />}
            </button>


        </div>
                 
            
            <ul className={`bg-grey top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
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
            
            </div>   
}         
</ListItem>
</List>
</div>





                    {/* <a href="javascript:void(0)" className="flex-none">
                        <img src="https://media.discordapp.net/attachments/1157269732219691038/1194220754376589352/cars-removebg-preview.png?ex=65af8fbf&is=659d1abf&hm=94eae9de317c04c8f6efeb2ce656743162493db62d430b29f3b8c0aa69da9b28&=&format=webp&quality=lossless&width=706&height=552" width={140} className="mx-auto" alt="Logo" />
                    </a> */}
                </div>
                <div className="flex-1 flex flex-col h-full overflow-auto">
                    <ul className="px-4 text-sm font-medium flex-1">
                       
                            <li>
                                <a  href="" 
                                    className="flex items-center gap-x-2 text-black p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150">
                                    <div className="text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-10 ">
            <path strokeLinecap="round" strokeLinejoin="round"d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg></div>
                                    Home
                                </a>
                                <a  href="" 
                                    className="flex items-center gap-x-2 text-black p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150">
                                    <div className="text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
        </svg></div>
        Add a Product
                                </a>
                                <Link href={'/admin/clients'} >  <a href=''
                                    className="flex items-center gap-x-2 text-black p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150">
                                    <div className="text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 21a7.5 7.5 0 0115 0" />
</svg></div>
        Clients
                                </a>
                                </Link>
                            </li>
                      
                    </ul>
                    <div>
                        <ul className="px-4 pb-4 text-sm font-medium">
                        
                                <li >
                                    <a
                                        href=""
                                        className="flex items-center gap-x-2 text-black p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                                    >
                                        <div className="text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg></div>
        Help
                                    </a>
                                    <a
                                        href=""
                                        className="flex items-center gap-x-2 text-black p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                                    >
                                        <div className="text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg></div>
                                        Profile
                                    </a>
                                    <a
                                        href=""
                                        className="flex items-center gap-x-2 text-black p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                                    >
                                        <div className="text-black"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg></div>
        Logout
                                    </a>
                                </li>
                        </ul>
                        <div className="py-4 px-4 border-t ">
                            <div className="flex items-center gap-x-4">
                                <div>
                                    <span className="block text-white text-sm font-semibold"></span>
                                    <a
                                        className="block mt-px text-white hover:text-indigo-600 text-xs"
                                    >
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;