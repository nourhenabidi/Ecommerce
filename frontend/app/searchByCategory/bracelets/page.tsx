"use client"
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import "../../searchByCategory/category.css"
import Heady from "../../navBar/page"
import Fot from"../../footer/page"
import {motion} from "framer-motion"
import fadeIn from "../../fadeIn"

interface Products {
    ProductID: number;
    Name: string;
    Description: string;
    Price: string;
    Availability:string;
    ProductImage:string[];
    ProductRemise:string;
    colorProduct:string;
  } 

const Bracelets: React.FC =()=>{
    const [bracelet, setBracelet] = useState<Products[]>([]);
    const [animationTriggered, setAnimationTriggered] = useState<boolean>(false);
    const scrollDown = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/products/allProducts');
            setBracelet(response.data.filter((Products: any) => Products.productCategory === 'Bracelets'));
          } catch (error) {
            console.error('Error fetching car data', error);
          }
        };
        const handleScroll = () => {
          if (scrollDown.current) {
            const down = scrollDown.current.getBoundingClientRect();
            const vs = down.top < window.innerHeight
            setAnimationTriggered(vs);
          }
        };
        window.addEventListener('scroll', handleScroll);

        handleScroll()
        fetchData();
      }, []);
    return(
      <motion.div 
      ref={scrollDown}
          variants={fadeIn('up')}
           initial='hidden'
          animate={animationTriggered ? 'show' : 'hidden'}
      className="body">
           <Heady/>
           <div className="imag">
      <img src="https://i.pinimg.com/564x/c6/d1/f8/c6d1f818fdc5bcd574fc12deaddd1079.jpg"alt="" />  
        </div>
 
                     <h1 className='title'>Catalog</h1>
                     <div className='text-slate-400 flex justify-center gap-16 mb-8 '>
            <a className='relative hover:underline hover:text-black ' href="/searchByCategory/necklaces">Necklaces</a>
            <a className='relative hover:underline hover:text-black' href="/searchByCategory/earings">Earings</a>
            <a className='relative hover:underline hover:text-black' href="/searchByCategory/rings">Rings</a>
            <a className='relative hover:underline hover:text-black' href="/searchByCategory/bracelets">Bracelets</a>
</div>
           <div className='contenu'>
           
           <div className="grid grid-cols-3 gap-4 flex justify-center">
             
             {Array.isArray(bracelet) && bracelet.map((product) => (
<div key={product.ProductID} className="product-card bg-white rounded-lg shadow mt-4" >
<a href="#" >
  <div className='image'>
            <img
              src={product.ProductImage}
              alt=''
            />
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
          <h4 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{product.Name}</h4>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{product.Description}</h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
   
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-blue-800 ms-3 product-remise">{product.ProductRemise}%</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-black">{product.Price}DT</span>
            <a href="#" className="text-black  hover:bg-beige focus:ring-4 focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center border dark:hover:bg-beige ">Add to cart</a>
        </div>
    </div>
          </div>
        ))}
           </div>
  
             </div>
             <Fot />
           </motion.div>
    )
}
export default Bracelets