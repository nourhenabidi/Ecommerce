"use client";
import React from 'react';
import { IoCloseSharp } from "react-icons/io5";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface Product {
  ProductID: number;
  Name: string;
  ProductImage: string[];
  Price: number;
}

interface WishProps {
  products: Product[];
  onClose: () => void;
}

const Wishlist: React.FC<WishProps> = ({ products, onClose }) => {
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose}></div> {/* Close on background click */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex items-start justify-between px-4 py-6">
                  <h2 className="text-3xl font-bold">Wishlist</h2>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <IoCloseSharp size={24} />
                  </button>
                </div>
                <div className="px-4">
                {JSON.parse(sessionStorage.getItem("products"))?.length === 0 ? (
                    <p>Your cart is empty</p>
                  ) : (
                    JSON.parse(sessionStorage.getItem("products"))?.map((product) => (
                      <li className="flex py-6" key={product.ProductID}>
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                            src={product.wishListImage && product.wishListImage.length > 0 ? product.wishListImage[0] : 'default-image-url.jpg'}
                            alt={product.Name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3><a href="#">{product.wishListName}</a></h3>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="ml-4">{product.wishListPrice} DT</p>
                            <div className="flex">
                              <button className="font-medium text-red-500 hover:text-red-700"><DeleteOutlineIcon /></button>
                            </div>
                          </div>
                        </div>
                        </div>
                      </li>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
