"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { IoCloseSharp } from "react-icons/io5";


interface Product {
  ProductID: number;
  Name: string;
  ProductImage: string[];
  Price: number;
}

type Quantities = {
  [ProductId: number]: number;
};
interface CartProps {
  fetchProducts:() => void;
}

type Props = {

  onClose: () => void;
 
};

const Cart:React.FC<CartProps> = ({fetchProducts}, {onClose}) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Quantities>({});
  const [isCartVisible, setIsCartVisible] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts()
        console.log('Products fetched successfully',fetchProducts());
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchData(); 
  }, []); 
  
  





  const handleDeleteOne = (ProductId: number) => {
    axios
      .delete(`http://localhost:5000/api/cart/deleteCart/${ProductId}`)
      .then((response) => {
        console.log(response.data);
       })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const calculateTotalPrice = (product: Product) => {
    return product.Price * (quantities[product.ProductID] || 1); // Use the correct quantity
  };

  const calculateGrandTotal = () => {
    return products.reduce((total, product) => {
      return total + calculateTotalPrice(product);
    }, 0);
  };
  const closeCart = () => {
    setIsCartVisible(true);
  };

  return (
    <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping Cart</h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button type="button"onClick={onClose} className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                      <IoCloseSharp />
                        <span className="sr-only">Close panel</span>
                      
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {products.map((product) => (
                      
                          <li key={product.ProductID} className="flex py-6">
                              
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img src={product.ProductImage}  className="h-full w-full object-cover object-center" />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href="#">{product.Name}</a>
                                  </h3>
                                  <p className="ml-4">{product.Price} DT</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">Quantity:</p>
                                <input
                                  type="number"
                                  min="1"
                                  value={quantities[product.ProductID] || 1}
                                  onChange={(e) => handleQuantityChange(product.ProductID, Number(e.target.value))}
                                  className="w-16 px-2 py-1 border border-gray-300 rounded"
                                />
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm mt-2">
                                <p className="text-gray-500">Qty {quantities[product.ProductID] || 1}</p>
                                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => handleDeleteOne(product.ProductID)}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{calculateGrandTotal()} DT</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => router.push('/shopAllproducts')}>
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;




















































