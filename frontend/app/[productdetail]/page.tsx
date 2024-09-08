"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./detail.css"
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
  ProductImage: string[]; // Ensure this is always an array
  ProductRemise: string;
  colorProduct: string;
}

const ProductDetail: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string>('');
  const [product, setProduct] = useState<Product | null>(null);
  const searchParams = useSearchParams();
  const productId = searchParams.get('ProductID'); // Get the product ID from the URL

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get<Product>(`http://localhost:5000/api/products/getOneProd/${productId}`);
          setProduct(response.data);
          if (Array.isArray(response.data.ProductImage) && response.data.ProductImage.length > 0) {
            setCurrentImage(response.data.ProductImage[0]); // Set initial image
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
    <div>
        <Navbar/>
    <div className="all p-4 flex gap-60">
      {/* Main Image Section */}
      <div className="flex-1">
        <img src={currentImage} alt="Main Product Image" className="w-[700px] max-h-[650px] object-cover" />
      </div>
      {/* Thumbnails Section */}
      <div className="flex flex-col gap-4 w-32">
        {thumbnails.map((thumbnail) => (
          <img
            key={thumbnail.src}
            src={thumbnail.src}
            alt={thumbnail.alt}
            className="cursor-pointer w-full max-h-[100px] object-cover"
            onClick={() => setCurrentImage(thumbnail.src)}
          />
        ))}
      </div>
    {/* Product Details */}
    <div className="ml-4">
      <h1 className="text-2xl font-bold">{product.Name}</h1>
      <p className="mt-2 text-lg">{product.Description}</p>
      <p className="mt-2 text-xl font-semibold">{product.Price} DT</p>
      <p className="mt-2 text-sm">Availability: {product.Availability}</p>
      <p className="mt-2 text-sm">Discount: {product.ProductRemise}%</p>
    </div>
  </div>
  <Footer />
  </div>
  );
};

export default ProductDetail;
