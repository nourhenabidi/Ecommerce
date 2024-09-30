"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams }  from 'next/navigation';
import axios from 'axios';
import "./category.css";
import Navbar from '../navBar/page';
import Footer from '../footer/page';
import { useRouter } from "next/navigation";
import SignInModal from "../Login/page"
import Signup from '../Signup/page';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';


interface Products {
  ProductID: number;
  Name: string;
  Description: string;
  oldPrice?: number;
  newPrice?: number;
  Availability: string;
  ProductImage: string[]; // Ensure ProductImage is an array of strings
  productRemise: number;
  colorProduct: string;
  productCategory: string;
}
interface WishData {
  product_ProductID: number;
  wishListName: string;
  wishListImage: string[];
  wishListPrice: number;
  wishListDescription: string;
  user_id: number | undefined; // Add user_id here
}


const SearchByCategory: React.FC = () => {
  const [categories, setCategories] = useState<Products[]>([]);
  const searchParams = useSearchParams();
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
  const router=useRouter()
console.log("cat=====",searchParams.get("category"));

const category = searchParams.get('category');

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

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
  return (
    <div className="body">
<Navbar />
<div  className='contenu'>
      <div className='text-slate-400 flex justify-center gap-16 mb-8'>
      <button className='relative hover:underline hover:text-black' onClick={()=>router.push("/shopAllproducts")} >All</button>
        <button className='relative hover:underline hover:text-black' onClick={()=>{getByCategory("Necklaces")}} >Necklaces</button>
        <button className='relative hover:underline hover:text-black'onClick={()=>{getByCategory("Earings")}}  >Earings</button>
        <button className='relative hover:underline hover:text-black'onClick={()=>{getByCategory("Rings")}} >Rings</button>
        <button className='relative hover:underline hover:text-black' onClick={()=>{getByCategory("Bracelets")}} >Bracelets</button>
        <button className='relative hover:underline hover:text-black' onClick={()=>{getByCategory("Pack")}} >Packs</button>
        <button className='relative hover:underline hover:text-black' onClick={()=>{getByCategory("Accessories hair")}} >Accessories hair</button>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-4 flex justify-center">
          {Array.isArray(categories) && categories.map((product) => (
            
            <div key={product.ProductID} className="product-card bg-white rounded-lg shadow mt-4">
           
                <div className='image'>
 {!product.productRemise ||product.productRemise===0 ||product.productRemise==0  ? (
      ""
    ) :
      <span className="product-remise">{product.productRemise}%</span>
    }
      <Link href={`/productdetail?ProductID=${product.ProductID}`}>
                  <img
                    src={product.ProductImage[0]} 
                    alt=""
                  />
                  </Link>
                  <div className="heart-icon">
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
                <a href="#">
                  <h4 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{product.Name}</h4>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{truncateText(product.Description, 20)}</h5>
                </a>

                <div className="flex flex-col items-end">
                {product.oldPrice && (
                        <span className="text-sm line-through text-gray-500 mb-1">{product.oldPrice} DT</span>
                      )}
                      {product.newPrice ? (
                        <span className="text-3xl font-bold text-gray-900 dark:text-black mb-4">{product.newPrice} DT</span>
                      ) : (
                        <span className="text-3xl font-bold text-gray-900 dark:text-black mb-4">{product.oldPrice} DT</span>
                      )}                 
                </div>
              </div>
          
            </div>
          ))}
        </div>
      </div> 
      </div>
      <Footer />
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
  );
};

export default SearchByCategory;
