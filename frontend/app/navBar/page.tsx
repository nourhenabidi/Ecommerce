'use client'
import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Link from 'next/link';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import axios from "axios";
import "./nav.css"

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


    <div className='fixed top-0 w-full  z-10'>
       <div className='w-full h-[40px] flex justify-center items-center bg-black'>
       </div>
       <div>
        <div className='flex justify-between items-center p-6 text-[16px] md:text-[20px]'>
<div className='hidden md:flex flex-1 space-x-7'>
    <a href="/home" onClick={() => handleItemClick(1)}>Home</a>
    <a href="/contact" onClick={() => handleItemClick(1)}>Contact</a>
<a href="/about" onClick={() => handleItemClick(1)}>Why Us</a>
</div>
<div className='flex flex-1 justify-center align-center'>
  <h1>MOA Collection</h1>
</div>
<div className='flex flex-1 flex row items-center gap-8 justify-end'>

<div className="flex gap-2 bg-white rounded">
{showSearch && (
  <input type="text" 
  placeholder="Search here .." 
  className="rounded-[8px]  outline-none placeholder:text-sm"
   style={{ width: '150px' }}
   value={searched}
   onChange={handleSearchChange} />
  )}
  <div className="mt-1 gap-[3px] flex justify-center align-center">

 <button onClick={toggleSearch}>
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="cursor-pointer mt-0.5" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 
0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z"></path>
</svg></button>
</div>
</div>
<a href="">
<FavoriteBorderIcon />
</a>
<a href="">
<ShoppingBagIcon />
</a>
<a href="/profile">
<AccountCircleIcon />
</a>
</div>
        </div>
       </div>
    </div>
    </div>


  )
}

export default Navbar



      {/* 
   <Badge color="secondary">
            <FavoriteBorderIcon className='ml-10'/>
            </Badge>
            <Badge color="secondary">
            <ShoppingBagIcon className='ml-9'/>
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
</div> */}