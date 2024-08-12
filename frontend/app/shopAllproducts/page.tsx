"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Na from "../navBar/page"
import "./prod.css"
import Fot from"../footer/page"


interface Products {
  ProductID: number;
  Name: string;
  Description: string;
  Price: string;
  Quantity:string;
  Availability:string;
  Discount:string;
  ProductImage:string[];
} 
const shopAllproducts: React.FC = () => {
    const [products, setProduct] = useState<Products[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/products/allProducts');
            setProduct(response.data);
          } catch (error) {
            console.error('Error fetching product data', error);
          }
        };
    
        fetchData();
      }, []);

    return(
        <div className='body'>
          <Na />
          <div className='list'style={{ marginBottom: '50px' }}>
          <h1 className='title'>Our Collection</h1>
             <div className="flex flex-wrap justify-center items-center gap-4 ">
        {products.map((product) => (


      
        
<div key={product.ProductID} className="w-full max-w-sm bg-white rounded-lg shadow ">
    <a href="#" >
      <div className="image-container">
        <img className="image" src={product.ProductImage} alt="product image" />
        </div>
    </a>
    <div className="px-5 pb-5">
        <a href="#">
          <h4 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{product.Name}</h4>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{product.Description}</h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
   
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-blue-800 ms-3">{product.Quantity}%</span>
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

    </div>
    
    )
}
export default shopAllproducts