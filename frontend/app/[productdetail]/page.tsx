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
    <div>
      <Navbar />
      <div className="all">
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
          <p>{product.Description}</p>
          <p className="price"> {product.Price} DT</p>
          <p className="availability"> {product.Availability}</p>
          <p className="discount">Discount: {product.ProductRemise}%</p>
          <p className="discount">colors:</p>
          <button className="add-to-cart-btn bg-orange-950 ">Add to Cart</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
