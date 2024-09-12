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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';

interface Newproduct {
  id: number;
  ProductID: number;
  Name: string;
  ProductImage: string[];
  Price: string;
  ProductRemise: string;
  Availability: string;
  Description: string;
  colorProduct: string;
}

function NewArrival() {
  const [news, setNews] = useState<Newproduct[]>([]);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState<number[]>([]); // To keep track of liked products

  let userId;
  if (JSON.parse(sessionStorage.getItem("user"))) {
    userId = JSON.parse(sessionStorage.getItem("user")).id;
  }

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

  const addCart = async (obj: object) => {
    if (JSON.parse(sessionStorage.getItem("user"))) {
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

  const addwish = async (obj: object) => {
    if (JSON.parse(sessionStorage.getItem("user"))) {
      try {
        const wishData = obj;
        const res = await axios.post("http://localhost:5000/api/wishlist/addwish",wishData);
        console.log(res);
        notify();
      } catch (err) {
        console.log(err);
      }
    } else setSignInModalOpen(true);
  };


  return (
    <div>
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
        <div className='list grid grid-cols-2 sm:grid-cols-50' style={{ marginBottom: '50px' }}>
          {Array.isArray(news) && news.map((e) => (
            <SwiperSlide key={e.ProductID}>
              <div className="product-card w-full max-w-sm bg-white group relative rounded-lg shadow">
                
                  <div className="image-container">
                    <img className='images' src={e.ProductImage[0]} alt="product image" />
                    <div className="heart-icon">
                      <button onClick={() => {
                        addwish({
                          product_ProductID: e.ProductID,
                          wishListName: e.Name,
                          wishListImage: e.ProductImage,
                          wishListPrice: e.Price,
                          user_id: userId,
                        });
                      }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={likedProducts.includes(e.ProductID) ? "red" : "none"}
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
                <Link href={`/productdetail?ProductID=${e.ProductID}`}>
                    <h4 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{e.Name}</h4>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{e.Description}</h5>
                    </Link>
                  <div className="flex flex-col items-end">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-blue-800 product-remise mb-1 mt-[-4px]">{e.ProductRemise}%</span>
                    <span className="text-3xl font-bold text-gray-900 dark:text-black mb-4">{e.Price}DT</span>
                    <button
                      className="text-black hover:bg-beige focus:ring-4 focus:outline-none font-medium text-sm px-5 py-2.5 text-center border dark:hover:bg-beige "
                      onClick={() => {
                        addCart({
                          product_ProductID: e.ProductID,
                          productName: e.Name,
                          CartImage: e.ProductImage,
                          productPrice: e.Price,
                          user_id: userId,
                        });
                      }}
                    >Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <ToastContainer />
        </div>
      </Swiper>
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setSignInModalOpen(false)}
        onSignUp={() => {/* Handle sign-up logic if needed */ }}
      />
    </div>
  )
}

export default NewArrival;
