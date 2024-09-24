"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./detail.css";
import { useSearchParams } from 'next/navigation';
import Navbar from '../navBar/page';
import Footer from '../footer/page';
import SignInModal from "../Login/page";
import Signup from '../Signup/page';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
interface Thumbnail {
  src: string;
  alt: string;
}

interface Product {
  id: number;
  ProductID: number;
  Name: string;
  Description: string;
  oldPrice?: number;
  newPrice?:number;
  Availability: boolean;
  ProductImage: string[];
  ProductRemise: string;
  colorProduct: string;
}

const ProductDetail: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string>('');
  const [product, setProduct] = useState<Product | null>(null);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const productId = searchParams.get('ProductID');
  let userId;
  if (JSON.parse(sessionStorage.getItem("user"))) {
    userId = JSON.parse(sessionStorage.getItem("user")).id;
  }
  const openSignUpModal = () => {
    setSignUpModalOpen(true); // Open sign-up modal
  };
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get<Product>(`http://localhost:5000/api/products/getOneProd/${productId}`);
          console.log(response.data,"m here");
          setProduct(response.data);
          if (Array.isArray(response.data.ProductImage) && response.data.ProductImage.length > 0) {
            setCurrentImage(response.data.ProductImage[0]);
          }
        } catch (error) {
          console.error('Error fetching product details', error);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }
 
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
  // Ensure ProductImage is an array
  const thumbnails: Thumbnail[] = Array.isArray(product.ProductImage) ? 
    product.ProductImage.map((src, index) => ({
      src,
      alt: `Thumbnail ${index + 1}`
    })) : [];

  return (
     <div className="body">
      <Navbar />
      <div className="all" style={{ marginBottom: '50px' }}>
        {/* Main Image Section */}
        <div className="flex-1">
          <img src={currentImage} alt="Main Product Image" className="main-product-image" />
        </div>
        {/* Thumbnails Section */}
        <div className="thumbnails">
          {thumbnails.map((thumbnail) => (
            <img
              key={thumbnail.src}
              src={thumbnail.src}
              alt={thumbnail.alt}
              className="thumbnail-image"
              onClick={() => setCurrentImage(thumbnail.src)}
            />
          ))}
        </div>
        {/* Product Details */}
        <div className="product-details">
        <div className="flex justify-between">
  <h1 className="text-xl font-semibold  ">{product.Name}</h1>
  <div className='mr-[150px]'>
 
      <span className="text-3xl font-bold text-gray-900 dark:text-black mb-4">{product.newPrice} DT</span>
  
  </div>
</div>
<p className={`availability ${product.Availability ? "in-stock" : "out-of-stock"}`}>
  {product.Availability ? "In Stock" : "Out of Stock"}
</p>
{product.ProductRemise && (
  <span className="">{product.ProductRemise}%</span>
)}

          <div className="">
  <p>{product.Description}</p>
</div>


          <div className=" py-8 border-t border-gray-700 w-3/4 sm:w-2/2 items-center justify-between sm:flex">
          <div className="flex items-center space-x-2 mt-4">
    <p className="discount"></p>
    <div className="w-6 h-6 bg-red-500 cursor-pointer"></div>
    <div className="w-6 h-6 bg-blue-500 cursor-pointer"></div>
    <div className="w-6 h-6 bg-green-500 cursor-pointer"></div>
    <div className="w-6 h-6 bg-yellow-500 cursor-pointer"></div>
  </div>
          </div>
          <div className="contact-left">
        <div className="callas">
          <div className="CallToUs">

            <h2 className='text-orange-950'>Call To Us</h2>
          </div>
          <p>We are available 24/7, 7 days a week.</p>
          <p>phone: +216 92580162</p>
        </div>
        <div className="border"></div>
        <div className="write">
          <div className="WriteToUs text-orange-950">

            <h2> Write To Us </h2>
          </div>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          
          <p>Email: admin@exclusive.com</p>
        </div>
        <div className="flex items-center gap-x-6 text-black mt-6">
                     
                     <a href="https://www.tiktok.com/@moa_collection?_t=8bAV5i6nF2r&_r=1" target='_blank'>
 <svg 
     className="w-6 h-6 text-black duration-150 hover:text-orange-600" 
     fill="none" 
     viewBox="0 0 48 48"
 >
     <path 
         fill="currentColor" 
         d="M33.1,8.4c-1.9-1-3.1-2.9-3.2-5.1h-4.9v28.2c0,4.1-3.3,7.4-7.4,7.4s-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4
         c0.4,0,0.9,0,1.3,0.1v-5.1c-0.4-0.1-0.9-0.1-1.3-0.1c-6.9,0-12.5,5.6-12.5,12.5S10.4,46,17.3,46s12.5-5.6,12.5-12.5V18
         c1.8,1.1,3.9,1.7,6.1,1.7v-5.2C35.4,14.5,34.1,11.6,33.1,8.4z"
     />
     <path 
         fill="currentColor" 
         d="M31.2,0h-4.9v3.3c1.1,2.3,3.2,4.1,5.8,4.8C32,5.4,31.2,2.7,31.2,0z"
     />
 </svg>
</a>

                     <a href="https://www.instagram.com/moa_collectionn/" target='_blank'>
                         <svg className="w-6 h-6 text-black duration-150 hover:text-orange-600 " fill="currentColor" viewBox="0 0 48 48"><g clip-path="url(#clip0_17_63)"><path d="M24 4.322c6.413 0 7.172.028 9.694.14 2.343.104 3.61.497 4.453.825 1.116.432 1.922.957 2.756 1.791.844.844 1.36 1.64 1.79 2.756.329.844.723 2.12.826 4.454.112 2.53.14 3.29.14 9.693 0 6.413-.028 7.172-.14 9.694-.103 2.344-.497 3.61-.825 4.453-.431 1.116-.957 1.922-1.79 2.756-.845.844-1.642 1.36-2.757 1.791-.844.328-2.119.722-4.453.825-2.532.112-3.29.14-9.694.14-6.413 0-7.172-.028-9.694-.14-2.343-.103-3.61-.497-4.453-.825-1.115-.431-1.922-.956-2.756-1.79-.844-.844-1.36-1.641-1.79-2.757-.329-.844-.723-2.119-.826-4.453-.112-2.531-.14-3.29-.14-9.694 0-6.412.028-7.172.14-9.694.103-2.343.497-3.609.825-4.453.431-1.115.957-1.921 1.79-2.756.845-.844 1.642-1.36 2.757-1.79.844-.329 2.119-.722 4.453-.825 2.522-.113 3.281-.141 9.694-.141zM24 0c-6.516 0-7.331.028-9.89.14-2.55.113-4.304.526-5.822 1.116-1.585.619-2.926 1.435-4.257 2.775-1.34 1.332-2.156 2.672-2.775 4.247C.666 9.806.253 11.55.141 14.1.028 16.669 0 17.484 0 24s.028 7.331.14 9.89c.113 2.55.526 4.304 1.116 5.822.619 1.585 1.435 2.925 2.775 4.257a11.732 11.732 0 004.247 2.765c1.528.591 3.272 1.003 5.822 1.116 2.56.112 3.375.14 9.89.14 6.516 0 7.332-.028 9.891-.14 2.55-.113 4.303-.525 5.822-1.116a11.732 11.732 0 004.247-2.765 11.732 11.732 0 002.766-4.247c.59-1.528 1.003-3.272 1.115-5.822.113-2.56.14-3.375.14-9.89 0-6.516-.027-7.332-.14-9.891-.112-2.55-.525-4.303-1.115-5.822-.591-1.594-1.407-2.935-2.747-4.266a11.732 11.732 0 00-4.247-2.765C38.194.675 36.45.262 33.9.15 31.331.028 30.516 0 24 0z" /><path d="M24 11.672c-6.806 0-12.328 5.522-12.328 12.328 0 6.806 5.522 12.328 12.328 12.328 6.806 0 12.328-5.522 12.328-12.328 0-6.806-5.522-12.328-12.328-12.328zm0 20.325a7.998 7.998 0 010-15.994 7.998 7.998 0 010 15.994zM39.694 11.184a2.879 2.879 0 11-2.878-2.878 2.885 2.885 0 012.878 2.878z" /></g><defs><clipPath id="clip0_17_63"><path d="M0 0h48v48H0z" /></clipPath></defs></svg>
                     </a>
                 </div>
      </div>
          <div className=" py-8  items-center justify-between sm:flex"style={{marginLeft:"120px"}}>
          <button className="add-to-cart-btn bg-orange-950 "
                          onClick={() => {
                            addCart({
                              product_ProductID: product.ProductID,
                              productName: product.Name,
                              CartImage: product.ProductImage,
                              productPrice: product.newPrice,
                              user_id: userId,
                            });
                          }}>Add to Cart</button>
          </div>
       
        </div>
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
      <Footer />
    </div>
  );
};

export default ProductDetail;
