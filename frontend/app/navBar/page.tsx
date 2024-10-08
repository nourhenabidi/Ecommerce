'use client';
import React, { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Drop from './AuthDrop';
import Cart from '../cart/page';
import Wishlist from '../wishlist/page';
import './nav.css';
import { useRouter } from 'next/navigation';
import { useNavigate } from 'react-router-dom';
interface Product {
  ProductID: number;
  Name: string;
  ProductImage: string[];
  Price: number;
}

const Navbar: React.FC = () => {
  const [searched, setSearched] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [data, setData] = useState<Product[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);



  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchSuggestions(searched);
    }
  };

  const fetchSuggestions = (query: string) => {
    axios.get(`http://localhost:5000/api/products/oneProduct/${query}`)
      .then(response => {
        // Check if the response data is an array of products or a single product
        if (Array.isArray(response.data)) {
          // If the response is an array of products, set it directly
          setSuggestions(response.data);
        } else if (response.data && typeof response.data === 'object') {
          // If the response is a single product object, wrap it in an array
          setSuggestions([response.data]);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching suggestions:', error);
      });
  };

  const handleSuggestionClick = (productName: string) => {
    setSearched(productName);  // Set the search input to the clicked product's name
    setSuggestions([]);  // Close the dropdown
    router.push(`/productdetail?ProductID=${suggestions[0].ProductID}`);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleOpenWishlist = () => {
    setIsWishlistOpen(true);
  };

  const handleCloseWishlist = () => {
    setIsWishlistOpen(false);
  };

  return (
    <div className="body">
      <div className="fixed top-0 w-full z-10">
        <div className="navi flex justify-between items-center p-6">
        <div className="hidden md:flex flex-1 space-x-7">
      <button onClick={() => router.push('/bodyhome')} className=" hover:underline">
        Home
      </button>
      <button onClick={() => router.push('/shopAllproducts')} className=" hover:underline">
        Shop
      </button>
      <button onClick={() => router.push('/contact')} className=" hover:underline">
        Contact
      </button>
      <button onClick={() => router.push('/whyUs')} className=" hover:underline">
        Why Us
      </button>
    </div>
          <div className="flex flex-1 justify-center">
            <h1>MOA Collection</h1>
          </div>
          <div className="flex flex-1 items-center gap-8 justify-end">
        
          <div className="relative">
  <input
    type="text"
    placeholder="Search here .."
    className="outline-none bg-transparent search-input"
    value={searched}
    onChange={handleSearchChange}
    onKeyDown={handleKeyPress}
  />
{suggestions.length > 0 && (
  <div className="select ">
    {suggestions.map((suggestion, index) => (
      <div key={index} onClick={() => handleSuggestionClick(suggestion.Name)}>
<img className='w-[40px] h-[40px]' src={suggestion.ProductImage[0]} alt="" />  
        <p>{suggestion.Name}</p>
      </div>
    ))}
  </div>
)}

  <SearchIcon className='icon'/>
</div>



            <button onClick={handleOpenWishlist}>
              <FavoriteBorderIcon />
            </button>

            {isWishlistOpen && <Wishlist user={user?.id} onClose={handleCloseWishlist} />}

            <button onClick={toggleCart}>
              <ShoppingBagIcon />
            </button>
            {isCartVisible && <Cart user={user?.id}  onClose={toggleCart} />}
            <Drop />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;