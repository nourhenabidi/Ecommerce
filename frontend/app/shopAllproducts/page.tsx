"use client"
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Na from "../navBar/page"
import "../SearchByCategory/category.css"
import Fot from"../footer/page"

 


interface Products {
  id:number;
  ProductID: number;
  Name: string;
  Description: string;
  Price: string;
  Availability:string;
  ProductImage:string[];
  ProductRemise:string;
  colorProduct:string;
  
} 
const shopAllproducts: React.FC = () => {
    const [products, setProduct] = useState<Products[]>([]);
    const [SelectedCategory, setSelectedCategory] = useState<string | null>(null)
    const id=sessionStorage.getItem('token')?.split(',')[1]
 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/products/allProducts');
            setProduct(response.data);
            console.log(response.data);
            
          } catch (error) {
            console.error('Error fetching product data', error);
          }
        };
        fetchData(); 
      }, []);

      const addCart=(obj:object)=>{
        axios.post("http://localhost:5000/api/cart/addCart",obj).then((res)=>{console.log(res)})
        .catch((err)=>console.log(err))
      }

      const getByCategory = async (productCategory: string): Promise<void> => {
        try {
          const response = await axios.get<Products[]>(
            `http://localhost:5000/api/products/category/${productCategory}`
          );
          setProduct(response.data);
          setSelectedCategory(productCategory); 
        } catch (error) {
          console.error(error);
        }
      };


    return(
      <div 
 
      className="body">
          <Na />
          <div className='all'style={{ marginBottom: '50px' }}>
          <h1 className='title'>Our Collection</h1>
          <div className='text-slate-400 flex justify-center gap-16 mb-8 '>
          <button onClick={()=>{getByCategory("Necklaces")}}>   <a className='relative hover:underline hover:text-black ' >Necklaces</a></button>
            <button onClick={()=>{getByCategory("Earings")}}>  <a className='relative hover:underline hover:text-black' >Earings</a></button>
           <button onClick={()=>{getByCategory("Rings")}}> <a className='relative hover:underline hover:text-black'>Rings</a></button>
           <button onClick={()=>{getByCategory("Bracelets")}}>  <a className='relative hover:underline hover:text-black' >Bracelets</a></button>
           <button onClick={()=>{getByCategory("Pack")}}>  <a className='relative hover:underline hover:text-black' >Packs</a></button>
</div>
<div className='contenu'>
          <div className="grid grid-cols-3 gap-4 flex justify-center">
             
             {Array.isArray(products) && products.map((product) => (
              
<div  key={product.ProductID} className="product-card bg-white rounded-lg shadow mt-4" >
  
    <a href="" >
    
      <div className="image">
     
        <img src={product.ProductImage} alt="" 

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
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-blue-800 ms-3 product-remise">
                    {product.ProductRemise}%
                  </span>
                </div>
      <div className='flex items-center justify-between'>
      <span className="text-3xl font-bold text-gray-900 dark:text-black mb-4">{product.Price}DT</span>
     <button 
       className="text-black hover:bg-beige focus:ring-4 focus:outline-none font-medium text-sm px-5 py-2.5 text-center border dark:hover:bg-beige "
       onClick={() =>
        addCart({
          product_ProductID: product.ProductID,
          productName: product.Name,
          CartImage: product.ProductImage,
          productPrice: product.Price,
          // Quantity: product.Description,
          user_idUser:id,
        })
      }
       >Add to cart
      </button> 
      </div>
    </div>
  </div>



))}

</div>
      </div>
      </div>
      <Fot />

    </div>
    
    )
}
export default shopAllproducts