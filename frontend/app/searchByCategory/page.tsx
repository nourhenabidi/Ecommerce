"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams }  from 'next/navigation';
import axios from 'axios';
import "./category.css";
import Navbar from '../navBar/page';
import Footer from '../footer/page';
import { useRouter } from "next/navigation";
import SignInModal from "../Login/page";
import Link from 'next/link';


interface Products {
  ProductID: number;
  Name: string;
  Description: string;
  oldPrice?: number;
  newPrice?: number;
  Availability: string;
  ProductImage: string[]; // Ensure ProductImage is an array of strings
  ProductRemise: string;
  colorProduct: string;
  productCategory: string;
}


const SearchByCategory: React.FC = () => {
  const [categories, setCategories] = useState<Products[]>([]);
  const searchParams = useSearchParams();
  const [SelectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  let userId: number | undefined; 
  const user = sessionStorage.getItem("user");
  if (user) {
      userId = JSON.parse(user).id;
  }
 
  const router=useRouter()
console.log("cat=====",searchParams.get("category"));

const category = searchParams.get('category');



  useEffect(() => {
    axios.get('http://localhost:5000/api/products/allProducts').then((data)=>{
            console.log(data.data)

            setCategories(data.data.filter((Products:any) => Products.productCategory === category))
        
        }).catch((err)=>{
            console.log(err)
        })
  }
  ,[category]);


const getByCategory = async (productCategory: string): Promise<void> => {
  try {
    const response = await axios.get<Products[]>(
      `http://localhost:5000/api/products/category/${productCategory}`
    );
    setCategories(response.data);
    router.push(`/SearchByCategory/?category=${productCategory}`);

    setSelectedCategory(productCategory); 
  } catch (error) {
    console.error(error);
  }
};

const addCart = async (obj: object) => {
  const user = sessionStorage.getItem("user");
  if (user) {
    try {
      await axios.post("http://localhost:5000/api/cart/addCart", obj);
      // Redirect to cart page after adding item to the cart
      window.location.href = '/cart';
    } catch (err) {
      console.log(err);
    }
  } else {
    // Show sign-in modal if not authenticated
    setSignInModalOpen(true);
  }
};

  return (
    <div className="body">
<Navbar />
<div className='all'>
       <h1 className='title'>Catalog</h1>
      <div className='text-slate-400 flex justify-center gap-16 mb-8'>
      <button className='relative hover:underline hover:text-black' onClick={()=>router.push("/shopAllproducts")} >All</button>
        <button className='relative hover:underline hover:text-black' onClick={()=>{getByCategory("Necklaces")}} >Necklaces</button>
        <button className='relative hover:underline hover:text-black'onClick={()=>{getByCategory("Earings")}}  >Earings</button>
        <button className='relative hover:underline hover:text-black'onClick={()=>{getByCategory("Rings")}} >Rings</button>
        <button className='relative hover:underline hover:text-black' onClick={()=>{getByCategory("Bracelets")}} >Bracelets</button>
        <button className='relative hover:underline hover:text-black' onClick={()=>{getByCategory("Pack")}} >Packs</button>
        <button className='relative hover:underline hover:text-black' onClick={()=>{getByCategory("Accessories hair")}} >Accessories hair</button>
      </div>

      <div className='contenu'>
        <div className="grid grid-cols-3 gap-4 flex justify-center">
          {Array.isArray(categories) && categories.map((product) => (
            
            <div key={product.ProductID} className="product-card bg-white rounded-lg shadow mt-4">
             <Link href={`/productdetail?ProductID=${product.ProductID}`}>
                <div className='image'>
                {product.ProductRemise && (
      <span className="product-remise">{product.ProductRemise}%</span>
    )}
                  <img
                    src={product.ProductImage[0]} 
                    alt=""
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
              

              <div className="px-5 pb-5">
                <a href="#">
                  <h4 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{product.Name}</h4>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{product.Description}</h5>
                </a>

                <div className="flex items-center justify-between">
                {product.oldPrice && (
                        <span className="text-sm line-through text-gray-500 mb-1">{product.oldPrice} DT</span>
                      )}
                      {product.newPrice ? (
                        <span className="text-3xl font-bold text-gray-900 dark:text-black mb-4">{product.newPrice} DT</span>
                      ) : (
                        <span className="text-3xl font-bold text-gray-900 dark:text-black mb-4">{product.oldPrice} DT</span>
                      )}                  <button 
       className="text-black hover:bg-beige focus:ring-4 focus:outline-none font-medium text-sm px-5 py-2.5 text-center border dark:hover:bg-beige "
       onClick={() =>
        addCart({
          product_ProductID: product.ProductID,
          productName: product.Name,
          CartImage: product.ProductImage,
          productPrice: product.newPrice,
          user_idUser:userId,
        })
      }
       >Add to cart
      </button> 
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div> 
      </div>
      <Footer />
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setSignInModalOpen(false)}
        onSignUp={() => {/* Handle sign-up logic if needed */}}
      />
    </div>
  );
};

export default SearchByCategory;
