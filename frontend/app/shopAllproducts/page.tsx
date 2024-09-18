"use client"
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Na from "../navBar/page"
import "../SearchByCategory/category.css"
import Fot from"../footer/page"
import SignInModal from "../Login/page";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Signup from '../Signup/page';
import Link from 'next/link';

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
    const [isSignInModalOpen, setSignInModalOpen] = useState(false);
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false); // State for sign-up modal
    const [likedProducts, setLikedProducts] = useState<number[]>([]); // To keep track of liked products
 
    let userId;
    if (JSON.parse(sessionStorage.getItem("user"))) {
      userId = JSON.parse(sessionStorage.getItem("user")).id;
    }
    const openSignUpModal = () => {
      setSignUpModalOpen(true); // Open sign-up modal
    };
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/allProducts');
        setProduct(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching product data', error);
      }
    };
    useEffect(() => {
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
      const addwish = async (obj: object) => {
        if (JSON.parse(sessionStorage.getItem("user"))) {
          try {
            const wishData = obj;
            const res = await axios.post("http://localhost:5000/api/wishlist/addwish", wishData);
            console.log(res);
      
            // Update likedProducts state to mark the product as "liked"
            setLikedProducts((prevLikedProducts) => [...prevLikedProducts, wishData.product_ProductID]);
      
            notif(); // Show the success notification
          } catch (error) {
            console.error('Error adding to wishlist:', error.response ? error.response.data : error.message);
          }
        } else {
          setSignInModalOpen(true); // Open sign-in modal if user is not logged in
        }
      };
 
    return(
      <div className="body">
          <Na />
          <div className='all'style={{ marginBottom: '50px' }}>
          <h1 className='title'>Our Collection</h1>
          <div className='text-slate-400 flex justify-center gap-16 mb-8 '>
          <button className='relative hover:underline hover:text-black' onClick={()=>fetchData()} >All</button>
          <button onClick={()=>{getByCategory("Necklaces")}}>   <a className='relative hover:underline hover:text-black ' >Necklaces</a></button>
            <button onClick={()=>{getByCategory("Earings")}}>  <a className='relative hover:underline hover:text-black' >Earings</a></button>
           <button onClick={()=>{getByCategory("Rings")}}> <a className='relative hover:underline hover:text-black'>Rings</a></button>
           <button onClick={()=>{getByCategory("Bracelets")}}>  <a className='relative hover:underline hover:text-black' >Bracelets</a></button>
           <button onClick={()=>{getByCategory("Pack")}}>  <a className='relative hover:underline hover:text-black' >Packs</a></button>
           <button onClick={()=>{getByCategory("Accessories hair")}}> <a className='relative hover:underline hover:text-black' >Accessories hair</a></button>

           
</div>
<div className='contenu'>
          <div className="grid grid-cols-3 gap-4 flex justify-center">
             
             {Array.isArray(products) && products.map((product) => (
              
<div  key={product.ProductID} className="product-card bg-white rounded-lg shadow mt-4" >
  

<Link href={`/productdetail?ProductID=${product.ProductID}`}>
      <div className="image">
      {product.ProductRemise && (
      <span className="product-remise">{product.ProductRemise}%</span>
    )}

        <img src={product.ProductImage[0]} alt="" />
        
        <div className="heart-icon">
        <button onClick={() => {
                     addwish({
                      product_ProductID: product.ProductID,
                      wishListName: product.Name,
                      wishListImage: product.ProductImage,
                      wishListPrice: product.Price,
                      user_id: userId,
                      wishListDescription: product.Description  // Ensure this field is included
                    });
                    }}>
           <svg
  xmlns="http://www.w3.org/2000/svg"
  fill={likedProducts.includes(product.ProductID) ? "red" : "none"} // Check if the product is in the wishlist
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
    
    
      <h4 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{product.Name}</h4>
      <h5 className="text-xl font-medium text-sm text-gray-900 dark:text-black">{product.Description}</h5>
  
    
  
      <div className='flex flex-col items-end'>
      <span className="text-2xl font-bold text-gray-900 dark:text-black mb-4">{product.Price}DT</span>
     <button 
     
       className="text-black hover:bg-beige focus:ring-4 focus:outline-none font-medium text-sm px-5 py-2.5 text-center border dark:hover:bg-beige "
       onClick={() => {
        addCart({
          product_ProductID: product.ProductID,
          productName: product.Name,
          CartImage: product.ProductImage,
          productPrice: product.Price,
          user_id: userId,
        });
      }}
    >Add to cart
    </button>
      </div>
    </div>
    </Link>
  </div>

))}
<ToastContainer />
</div>
      </div>
      </div>
      <Fot />
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
export default shopAllproducts