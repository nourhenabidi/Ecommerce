"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./detail.css";
import { useSearchParams } from 'next/navigation';
import Navbar from '../navBar/page';
import Footer from '../footer/page';

interface Thumbnail {
  src: string;
  alt: string;
}

interface Product {
  id: number;
  ProductID: number;
  Name: string;
  Description: string;
  Price: string;
  Availability: string;
  ProductImage: string[];
  ProductRemise: string;
  colorProduct: string;
}

const ProductDetail: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string>('');
  const [product, setProduct] = useState<Product | null>(null);
  const searchParams = useSearchParams();
  const productId = searchParams.get('ProductID');

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get<Product>(`http://localhost:5000/api/products/getOneProd/${productId}`);
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
          <h1>{product.Name}</h1>
          <p className="price"> {product.Price} DT</p>
          <div className="py-8 border-t border-gray-700 w-3/4 sm:w-2/2 items-center justify-between sm:flex">
  <p>{product.Description}</p>
</div>


          <div className=" py-8 border-t border-gray-700 w-3/4 sm:w-2/2 items-center justify-between sm:flex">
          <p className="availability">Availability: {product.Availability}</p>
          <p className="discount">Discount: {product.ProductRemise}%</p>
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
          <div className=" py-8 border-t border-gray-700 w-3/4 sm:w-2/2 items-center justify-between sm:flex">
          <button className="add-to-cart-btn bg-orange-950 ">Add to Cart</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
