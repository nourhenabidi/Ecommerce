"use client"
import React, { useEffect, useState } from 'react';
import './newN.css';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import SignInModal from "../Login/page";
import Signup from '../Signup/page';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';

interface Newproduct {
  id: number;
  ProductID: number;
  Name: string;
  ProductImage: string[];
  oldPrice?: number;
  newPrice?:number;
  productRemise: string;
  Availability: string;
  Description: string;
  colorProduct: string;
}
interface WishData {
  product_ProductID: number;
  wishListName: string;
  wishListImage: string[];
  wishListPrice: number;
  wishListDescription: string;
  user_id: number; // Add user_id here
}
function NewArrival() {
  const [news, setNews] = useState<Newproduct[]>([]);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState<number[]>([]); // To keep track of liked products

  let userId: number | undefined; 
  const user = sessionStorage.getItem("user");
  if (user) {
      userId = JSON.parse(user).id;
  }
  const openSignUpModal = () => {
    setSignUpModalOpen(true); // Open sign-up modal
  };
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/new');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching new products', error);
      }
    };

    fetchData();
  }, []);

  const notify = () => {
    toast.success("Item added to cart successfully!", {
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
  const notif = () => {
    toast.success("Item added to Wishlist successfully!", {
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

  const addCart = async (obj: object) => {
    const user = sessionStorage.getItem("user");
    if (user) {
  try {
        const cartData = obj;
        const res = await axios.post("http://localhost:5000/api/cart/addCart", cartData);
        console.log(res);
        notify();
      } catch (err) {
        console.log(err);
      }
    } else setSignInModalOpen(true);
  };

  const addwish = async (obj: WishData) => {
    const user = sessionStorage.getItem("user");
    if (user) {
      try {
        const wishData = { ...obj, user_id: userId }; // Add userId to wishData
        const res = await axios.post("http://localhost:5000/api/wishlist/addwish", wishData);
        console.log(res);
  
        // Update likedProducts state to mark the product as "liked"
        setLikedProducts((prevLikedProducts) => [...prevLikedProducts, obj.product_ProductID]);
  
        notif(); // Show the success notification
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('Error adding to wishlist:', error.response ? error.response.data : error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    } else {
      setSignInModalOpen(true); // Open sign-in modal if user is not logged in
    }
  };
  
  
   

  return (
    <div >
      <h1 className="flex justify-center text-3xl" style={{ marginBottom: '50px' }}>New Arrivals</h1>
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[FreeMode, Pagination, Navigation]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
<ToastContainer />
        <div className='list grid grid-cols-2 sm:grid-cols-50' style={{ marginBottom: '50px' }}>
          {Array.isArray(news) && news.map((e) => (
            
            <SwiperSlide key={e.ProductID}>
              <Link href={`/productdetail?ProductID=${e.ProductID}`}>
              <div className="product-card w-full max-w-sm bg-white group relative rounded-lg shadow">
                <div className="image-container">
                {!e.productRemise ||e.productRemise===0 ||e.productRemise==0  ? (
      ""
    ) : <span className="product-remise">{e.productRemise}%</span>}

                  <img className='images' src={e.ProductImage[0]} alt="product image" />
                 
                  <div className="heart-icon">
                    <button onClick={() => {
                  addwish({
                    product_ProductID: e.ProductID,
                    wishListName: e.Name,
                    wishListImage: e.ProductImage,
                    wishListPrice: e.newPrice !== undefined ? e.newPrice : 0, // Default to 0 if newPrice is undefined
                    wishListDescription: e.Description,  // Ensure this field is included
                    user_id: userId as number // Ensure user_id is passed and cast it to number
                  });
                    }}>
    <svg
  xmlns="http://www.w3.org/2000/svg"
  fill={likedProducts.includes(e.ProductID) ? "red" : "none"} // Check if the product is in the wishlist
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="h-6 w-6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
  />
</svg>

                    </button>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  
                    <h4 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{e.Name}</h4>
                    <h5 className="text-xl font-medium text-sm text-gray-900 dark:text-black">{truncateText(e.Description, 25)}</h5>
                  
                  <div className="flex flex-col items-end">
                  
                      {e.oldPrice && (
                        <span className="text-sm line-through text-gray-500 mb-1">{e.oldPrice} DT</span>
                      )}
                      {e.newPrice ? (
                        <span className="text-3xl font-bold text-gray-900 dark:text-black mb-4">{e.newPrice} DT</span>
                      ) : (
                        <span className="text-3xl font-bold text-gray-900 dark:text-black mb-4">{e.oldPrice} DT</span>
                      )}

                    <button
                      className="text-black hover:bg-beige focus:ring-4 focus:outline-none font-medium text-sm px-5 py-2.5 text-center border dark:hover:bg-beige "
                      onClick={() => {
                        addCart({
                          product_ProductID: e.ProductID,
                          productName: e.Name,
                          CartImage: e.ProductImage,
                          productPrice: e.newPrice,
                          user_id: userId,
                        });
                      }}
                    >Add to cart
                    </button>
                  </div>
                </div>
              </div>
              </Link>
            </SwiperSlide>
            
          ))}
         
        </div>
      </Swiper>
      
       <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setSignInModalOpen(false)}
        onSignUp={() =>openSignUpModal()}
      />

      <Signup 
        isOpen={isSignUpModalOpen} 
        onClose={()=>{setSignInModalOpen(false),setSignUpModalOpen(false)}} 
        onSignUp={() =>openSignUpModal()}
      />
    </div>
    
  )
}

export default NewArrival;