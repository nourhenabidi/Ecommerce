'use client'
import React, { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import axios from "axios";
import Drop from "./AuthDrop";
import Cart from '../cart/page';
import Wishlist from '../wishlist/page';
import "./nav.css";

interface Product {
  ProductID: number;
  Name: string;
  ProductImage: string[];
  Price: number;
}

type Quantities = {
  [ProductId: number]: number;
};

const Navbar: React.FC = () => {
  const [searched, setSearched] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  // const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isWishVisible, setIsWishVisible] = useState(false);
  const [data, setData] = useState<Product[]>([]);
 const [user, setuser] = useState({})

useEffect(()=>{
  if (sessionStorage.getItem('user')) {

    setuser(sessionStorage.getItem('user'))
  }
  console.log("eeeeeeeeeeee",sessionStorage.getItem('user'));
},[])

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await axios.get<Product[]>(`http://localhost:5000/api/cart/getcart/${JSON.parse(user).id}`);
  console.log(response.data);
  
      setData(response.data);
      sessionStorage.setItem("products",JSON.stringify(response.data))
    } catch (error) {
      console.log(error,"errr")
      console.error('Error fetching data:', user.id);
    }
  };
  
  const getwishlist = async (): Promise<void> => {
    try {
      const response = await axios.get<Product[]>(`http://localhost:5000/api/wishlist/getwish/${JSON.parse(user).id}`);
  console.log(response.data);
  
      setData(response.data);
      sessionStorage.setItem("products",JSON.stringify(response.data))
    } catch (error) {
      console.log(error,"errr")
      console.error('Error fetching data:', user.id);
    }
  };
  useEffect(() => {
    if (isCartVisible) {
      fetchProducts(); // Fetch products when the cart is opened
    }
  }, [isCartVisible]);

  useEffect(() => {
    if (isWishVisible) {
      getwishlist(); 
    }
  }, [isWishVisible]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchSuggestions(searched);
    }
  };

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/oneProduct/${query}`);
      setSuggestions(response.data.map((item: Product) => item.Name));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearched(suggestion);
    setSuggestions([]);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };
  const toggleWish = () => {
    setIsWishVisible(!isCartVisible);
  };

  return (
    <div className='body'>
      <div className='fixed top-0 w-full z-10'>
        <div className='navi flex justify-between items-center p-6'>
          <div className='hidden md:flex flex-1 space-x-7'>
            <a href="/bodyhome">Home</a>
            <a href="/shopAllproducts">Shop</a>
            <a href="/contact">Contact</a>
            <a href="/whyUs">Why Us</a>
          </div>
          <div className='flex flex-1 justify-center'>
            <h1>MOA Collection</h1>
          </div>
          <div className='flex flex-1 items-center gap-8 justify-end'>
            <div className="relative">
              <input type="text" 
                placeholder="Search here .." 
                className="outline-none bg-transparent"
                value={searched}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
              />
              {suggestions.length > 0 && (
                <ul className='select'>
                  {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button onClick={toggleWish}>
              <FavoriteBorderIcon />
            </button>
            {isWishVisible && <Wishlist getwishlist={getwishlist} onClose={toggleWish} />}
            <button onClick={toggleCart}>
              <ShoppingBagIcon />
            </button>
            {isCartVisible && <Cart fetchProducts={fetchProducts} onClose={toggleCart} />}
            <Drop />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
