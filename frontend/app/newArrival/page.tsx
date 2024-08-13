"use client"
import React, { useEffect, useState } from 'react'
import './newN.css'
import axios from 'axios';

interface Newproduct{
    ProductID: number;
    Name: string;
    ProductImage:string[];
    Price: string;
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
        <div>
           <div className='list'style={{ marginBottom: '50px' }}>
          <h1 className="flex justify-center text-3xl ">New Arrivals</h1>
          {Array.isArray(news) && news.map((e) => (
          <div key={e.ProductID} className="max-w-fit border-1 border-solid pb-7 rounded-b-3xl drop-shadow-2xl bg-white">
          
<div className="pani-icon">
    <button >
    <svg
		xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
		stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
	<path stroke-linecap="round" stroke-linejoin="round"
	d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
	</svg>
    </button>
</div>

<div className="heart-icon">
 <button>   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        className="h-6 w-6">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
    </button>
</div>

<div className="rounded-md image-container">

        <img  src={e.ProductImage} alt="" />

    

</div>

<div className="flex flex-col space-y-3.5 mt-8 px-5">
    <div className="max-w-fit">
        <p className="text-2xl text-[#252B42] tracking-wider ">{e.Name}</p>
    </div>


    <div className="max-w-fit">
        <p className="text-2xl text-[#737373] font-medium">{e.Price}DT</p>
    </div>

    {/* <div className="flex space-x-3 max-w-fit">
        <div className=" bg-[#1855CB] max-w-fit p-4 border-2"></div>
        <div className=" bg-[#3DBB77] max-w-fit p-4 border-2"></div>
        <div className=" bg-[#E77C40] max-w-fit p-4 border-2"></div>
        <div className=" bg-[#252B42] max-w-fit p-4 border-2"></div>
    </div> */}



</div>
         
</div>

))}

</div>
</div>
    )}


export default NewArrival