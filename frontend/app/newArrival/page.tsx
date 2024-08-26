"use client"
import React, { useEffect, useState } from 'react'
import './newN.css'
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";



interface Newproduct{
    ProductID: number;
    Name: string;
    ProductImage:string[];
    Price: string;
    ProductRemise:string;
    Availability:string;
    Description: string;
    colorProduct:string;
} 




function NewArrival() {

    const [news,setNews]= useState<Newproduct[]>([])

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
  

  
    return (
        <div >
            <h1 className="flex justify-center text-3xl "style={{ marginBottom: '50px' }}>New Arrivals</h1>
 
           <div className='list grid grid-cols-2 sm:grid-cols-50'style={{ marginBottom: '50px' }}>
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
        modules={[FreeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
      
          {Array.isArray(news) && news.map((e) => (
            <SwiperSlide key={e.ProductID}>
            <div  className="product-card w-full max-w-sm bg-white group reative rounded-lg shadow ">
  
  <a href="#" >

    <div className="image-container">
      <img className='images' src={e.ProductImage} alt="product image" />
      <div className="heart-icon">
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
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
  </a>
  <div className="px-5 pb-5">
    <a href="#">
      <h4 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{e.Name}</h4>
      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{e.Description}</h5>
    </a>
    <div className="flex flex-col items-end">
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-blue-800 product-remise mb-1 mt-[-4px]">{e.ProductRemise}%</span>
      <span className="text-3xl font-bold text-gray-900 dark:text-black mb-4">{e.Price}DT</span>
      <a href="#" className="text-black hover:bg-beige focus:ring-4 focus:outline-none font-medium text-sm px-5 py-2.5 text-center border dark:hover:bg-beige ">Add to cart</a>
    </div>
  </div>
  
</div>
</SwiperSlide>
))}
</Swiper>
</div>

</div>
    )}


export default NewArrival