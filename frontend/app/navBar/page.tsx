'use client'
import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Link from 'next/link';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';


interface Product {
  name: string;
}
const Navbar: React.FC =()=>{
    const [data, setData] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searched,setSearched]=useState<string>("");
    const [activeIndex, setActiveIndex]=useState<number|null>(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [showSearch, setShowSearch] = useState<boolean>(false);



    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/products/allProducts');
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
          const response = await fetch(`http://localhost:5000/api/products/getOneProd/${searched}`);
    
          if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
          }
    
          const searchData: Product[] = await response.json();
          setData(searchData);
          console.log("found", searchData);
        } catch (error) {
          console.error(error);
        }
      };
      const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearched(event.target.value);
      };

      const handleItemClick = (index: number) => {
        setActiveIndex(index === activeIndex ? null : index);
      };
      const handleMenu = (event:React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const toggleSearch = () => {
        setShowSearch(!showSearch);
      };

  return (
    <div>

      <header className='pl-20 h-24 pt-10'>
      <div className=' flex items-center'>
            
            <ul className="flex w-52">
        <li
          className={`text-1xl cursor-pointer ${
            activeIndex === 0 ? 'underline' : ''
          }`}
          onClick={() => (0)}
        >
          <Link href="/">Home</Link>
        </li>
        <li
          className={`text-1xl cursor-pointer ${
            activeIndex === 1 ? 'underline' : ''
          }`}
          onClick={() => handleItemClick(1)}
        >
          <Link href="/contact">Contact</Link>
        </li>
        <li
          className={`mr-16 text-1xl cursor-pointer ${
            activeIndex === 2 ? 'underline' : ''
          }`}
          onClick={() => handleItemClick(2)}
        >
          <Link href="/test">Why Us</Link>
        </li>
  
      </ul>
      <div>
      <h1 className='text-2xl font-bold ml-40 mb-10' > MOA Collection </h1>
      </div>
      <div className='w-52 flex items-center '>
   
   {showSearch && (
     <input
       type="text"
       placeholder="Search ...."
       value={searched}
       onChange={handleSearchChange}
       className="p-2 border border-gray-300 rounded-md"
     />
   )}
   <button onClick={toggleSearch} className="ml-2 p-2 text-black rounded-md">
     <SearchIcon className='text-black ml-[180px]' />
   </button>
   

   <Badge color="secondary">
            <FavoriteBorderIcon className='ml-10'/>
            </Badge>
            <Badge color="secondary">
            <AddShoppingCartIcon className='ml-9'/>
            </Badge>
            <Stack  className='ml-8' direction="row" spacing={2}>
                <button onClick={handleMenu} >
                <AccountCircleIcon  />
                </button>
                
                <Menu
                className='mt-9'
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </Stack>
   </div>
</div>


        
      </header>
      <hr />
    </div>
  )
}

export default Navbar