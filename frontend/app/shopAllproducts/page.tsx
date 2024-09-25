"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Na from "../navBar/page"
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
  oldPrice?: number;
  newPrice?:number;
  Availability:string;
  ProductImage:string[];
  productRemise:number;
  colorProduct:string;
  user_id: number; 
} 
interface WishData {
  product_ProductID: number;
  wishListName: string;
  wishListImage: string[];
  wishListPrice: number;
  wishListDescription: string;
  user_id: number; // Add user_id here
}

const shopAllproducts: React.FC = () => {
    const [products, setProduct] = useState<Products[]>([]);
    const [SelectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [isSignInModalOpen, setSignInModalOpen] = useState(false);
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false); // State for sign-up modal
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
        const user = sessionStorage.getItem("user");
        if (user) {
            const userId = JSON.parse(user).id; // Safely parse user here
            try {
                const cartData = { ...obj, user_id: userId }; // Add userId to cartData if needed
                const res = await axios.post("http://localhost:5000/api/cart/addCart", cartData);
                console.log(res);
                notify();
            } catch (err) {
                console.log(err);
            }
        } else {
            setSignInModalOpen(true);
        }
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
      const addwish = async (obj: WishData) => {
        const user = sessionStorage.getItem("user");
        if (user) {
          const userId = JSON.parse(user).id; // Safely parse the user here
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
      
    
    
 
    return(
      <div className="body">
      <Na />
      <div  style={{ paddingTop: '80px', marginBottom: '50px' }}>
        <h1 className='title' style={{ color: 'black', textAlign: 'center', fontSize: '3rem', margin: '0', padding: '1rem 0', width: '100%' }}>Our Collection</h1>
        
        <div className='text-slate-400 flex justify-center gap-16 mb-8 '>
          <button className='relative hover:underline hover:text-black' onClick={()=>fetchData()}>All</button>
          <button onClick={()=>{getByCategory("Necklaces")}}>
            <a className='relative hover:underline hover:text-black'>Necklaces</a>
          </button>
          <button onClick={()=>{getByCategory("Earings")}}>
            <a className='relative hover:underline hover:text-black'>Earings</a>
          </button>
          <button onClick={()=>{getByCategory("Rings")}}>
            <a className='relative hover:underline hover:text-black'>Rings</a>
          </button>
          <button onClick={()=>{getByCategory("Bracelets")}}>
            <a className='relative hover:underline hover:text-black'>Bracelets</a>
          </button>
          <button onClick={()=>{getByCategory("Pack")}}>
            <a className='relative hover:underline hover:text-black'>Packs</a>
          </button>
          <button onClick={()=>{getByCategory("Accessories hair")}}>
            <a className='relative hover:underline hover:text-black'>Accessories hair</a>
          </button>
        </div>

        <div className='contenu' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
          <div className="grid grid-cols-3 gap-4 flex justify-center">
            {Array.isArray(products) && products.map((product) => (
              <div 
                style={{ 
                  width: '180px', 
                  backgroundColor: '#fff', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                  overflow: 'hidden', 
                  position: 'relative', 
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease' 
                }}  
                key={product.ProductID} 
                className="product-card bg-white rounded-lg shadow mt-4" 
              >
                
                  <div 
                    className="image" 
                    style={{ 
                      width: '100%', 
                      height: '200px', 
                      position: 'relative', 
                      overflow: 'hidden', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      backgroundColor: '#f0f0f0' 
                    }}
                  >
  {!product.productRemise || product.productRemise===0 ||product.productRemise==0  ? (
      ""
    ) :
                      <span 
                        className="product-remise" 
                        style={{ 
                          position: 'absolute', 
                          top: '10px', 
                          left: '10px', 
                          backgroundColor: '#ff4d4d', 
                          color: 'white', 
                          padding: '5px', 
                          borderRadius: '4px', 
                          fontSize: '12px' 
                        }}
                      >
                        {product.productRemise}%
                      </span>
                    }
<Link href={`/productdetail?ProductID=${product.ProductID}`}>
                    <img 
                      src={product.ProductImage[0]} 
                      alt="" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }} 
                    />
                      </Link>
                    <div 
                      className="heart-icon" 
                      style={{ 
                        position: 'absolute', 
                        top: '10px', 
                        right: '10px', 
                        padding: '6px', 
                        height: '35px', 
                        width: '35px', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center' 
                      }}
                    >
                      <button onClick={() => {
                        addwish({
                          product_ProductID: product.ProductID,
                          wishListName: product.Name,
                          wishListImage: product.ProductImage,
                          wishListPrice: product.newPrice !== undefined ? product.newPrice : 0, // Default to 0 if newPrice is undefined
                          user_id: userId,
                          wishListDescription: product.Description
                        });
                      }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={likedProducts.includes(product.ProductID) ? "red" : "none"}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                          style={{ width: '30px', height: '30px' }}
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
                    <h4 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
                      {product.Name}
                    </h4>
                    <h5 className="text-xl font-medium text-sm text-gray-900 dark:text-black">
                    {truncateText(product.Description, 25)}
                    </h5>

                    <div className='flex flex-col items-end'>
                    {product.oldPrice && (
                        <span className="text-sm line-through text-gray-500 mb-1">{product.oldPrice} DT</span>
                      )}
                      {product.newPrice ? (
                        <span className="text-3xl font-bold text-gray-900 dark:text-black mb-4">{product.newPrice} DT</span>
                      ) : (
                        <span className="text-3xl font-bold text-gray-900 dark:text-black mb-4">{product.oldPrice} DT</span>
                      )}
                      <button 
                        className="text-black hover:bg-beige focus:ring-4 focus:outline-none font-medium text-sm px-5 py-2.5 text-center border dark:hover:bg-beige"
                        onClick={() => {
                          addCart({
                            product_ProductID: product.ProductID,
                            productName: product.Name,
                            CartImage: product.ProductImage,
                            productPrice: product.newPrice,
                            user_id: userId,
                          });
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
              
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
        onSignUp={() => openSignUpModal()}
      />
      <Signup 
        isOpen={isSignUpModalOpen} 
        onClose={() => {
          setSignInModalOpen(false);
          setSignUpModalOpen(false);
        }} 
        onSignUp={() => openSignUpModal()}
      />
    </div>
    
    )
}
export default shopAllproducts