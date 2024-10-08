'use client';
import React, { useState,useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {useRouter} from 'next/navigation'; 

interface Product {
  id:number;
  CartID: number; 
  ProductID: number;
  productName: string;
  CartImage: string[];
  productPrice: number;
}

type Quantities = {
  
  [ProductID: number]: number;
};

interface CartProps {
    user : number  ;
   onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose,user}) => {
  const [quantities, setQuantities] = useState<Quantities>({});
  const [products, setProducts] = useState<Product[]>([]);
const [refresh,setrefresh]=useState<boolean>(false)
  const router = useRouter();
 
  
  useEffect(() => {
       axios.get<Product[]>(`http://localhost:5000/api/cart/getcart/${user}`).then((res)=>{
        console.log("hghfhfgdgdg",res.data);
        setProducts(res.data);
       }).catch((err)=>console.log("errr ",err)
       )

  }, [refresh]);



  const notify = () => {
    toast.success("Product removed from cart successfully", {
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

  const handleDeleteOne =  (CartID: number) => {
    axios.delete(`http://localhost:5000/api/cart/deleteCart/${CartID}`).then((res)=>{
      setrefresh(!refresh)
      notify();

    })
     .catch((err)=> {
      console.error("edrrrrergd", err);
    })
  };
  

  const calculateProductTotalPrice = (product:any) => {
    const quantity = quantities[product.ProductID] || 1; // Get the quantity or default to 1
    return product.productPrice * quantity; // Multiply price by quantity
  };

  const calculateGrandTotal = () => {
    const productsInCartString = products
    const productsInCart: Product[] = productsInCartString ? productsInCartString : [];
  
    return productsInCart.reduce((total, product) => {
      const productQuantity = quantities[product.ProductID] || 1; // Get the quantity or default to 1
      return total + (product.productPrice * productQuantity); // Multiply price by quantity
    }, 0); // Start with a total of 0
  };
  
  const handleCheckout = () => {
    router.push('/formulaire'); // Navigate to the Formulaire page
  };
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex items-start justify-between px-4 py-6">
                  <h2 className="text-3xl font-bold">Shopping Cart</h2>
                  <button onClick={onClose}>
                    <IoCloseSharp />
                  </button>
                </div>
                <div className="px-4">
                {products.length === 0 ? (

   
      <p>Your cart is empty</p>
    ) || products.length > 0 : (
      products.map((product) => (
        <li className="flex py-6" key={product.ProductID}>
          
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
           src={product.CartImage && product.CartImage.length > 0
          ? product.CartImage[0]
          : 'default-image-url.jpg'}
                           
            alt={product.productName}
             className="h-full w-full object-cover object-center"
             />
                        </div>
          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3><a href="#">{product.productName}</a></h3>
              </div>
            </div>

            <div className="flex flex-1 items-end justify-between text-sm">
              <p className="ml-4">{calculateProductTotalPrice(product)} DT</p> {/* Update this dynamically */}
       
              <div className="flex">
                <button onClick={() => handleDeleteOne(product.CartID)} className="font-medium text-red-500 hover:text-red-700"><DeleteOutlineIcon /></button>
              </div>
            </div>
          </div>
        </li>
      ))
    )}
<ToastContainer />
  
</div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{calculateGrandTotal()} DT</p> {/* Grand total for all products */}
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                  <button 
                      onClick={handleCheckout} 
                      className="flex items-center justify-center border border-transparent bg-orange-950 px-6 py-3 text-base font-medium text-white shadow-sm">
                      Checkout
                    </button>                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <a href='/shopAllproducts' type="button" className="font-medium text-orange-900 hover:text-orange-600">Continue Shopping <span aria-hidden="true"> &rarr;</span></a>
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



// 'use client';
// import React, { useState, useEffect } from 'react';
// import { IoCloseSharp } from "react-icons/io5";
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// interface Product {
//   id: number;
//   CartID: number;
//   ProductID: number;
//   productName: string;
//   CartImage: string[];
//   productPrice: number;
// }

// type Quantities = {
//   [ProductID: number]: number;
// };

// interface CartProps {
//   user: number;
//   onClose: () => void;
// }

// const Cart: React.FC<CartProps> = ({ onClose, user }) => {
//   const [quantities, setQuantities] = useState<Quantities>({});
//   const [products, setProducts] = useState<Product[]>([]);
//   const [refresh, setRefresh] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     axios.get<Product[]>(`http://localhost:5000/api/cart/getcart/${user}`)
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((err) => console.log("Error fetching cart", err));
//   }, [refresh]);

//   const notify = (message: string) => {
//     toast.success(message, {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "colored",
//     });
//   };

//   const handleDeleteOne = (CartID: number) => {
//     axios.delete(`http://localhost:5000/api/cart/deleteCart/${CartID}`)
//       .then(() => {
//         setRefresh(!refresh);
//         notify("Product removed from cart successfully");
//       })
//       .catch((err) => {
//         console.error("Error deleting cart item", err);
//       });
//   };

//   const updateCartQuantity = async (CartID: number, newQuantity: number) => {
//     try {
//       await axios.put(`http://localhost:5000/api/cart/updateQuantity/${CartID}`, {
//         quantity: newQuantity
//       });
//       setRefresh(!refresh);
//       notify("Cart quantity updated successfully");
//     } catch (error) {
//       console.error("Error updating cart quantity", error);
//     }
//   };

//   const increaseQuantity = (product: Product) => {
//     const newQuantity = (quantities[product.ProductID] || 1) + 1;
//     setQuantities(prevQuantities => ({
//       ...prevQuantities,
//       [product.ProductID]: newQuantity
//     }));
//     updateCartQuantity(product.CartID, newQuantity); // Update the quantity in the backend
//   };

//   const decreaseQuantity = (product: Product) => {
//     const newQuantity = (quantities[product.ProductID] || 1) - 1;
//     if (newQuantity >= 1) {
//       setQuantities(prevQuantities => ({
//         ...prevQuantities,
//         [product.ProductID]: newQuantity
//       }));
//       updateCartQuantity(product.CartID, newQuantity); // Update the quantity in the backend
//     }
//   };

//   const calculateProductTotalPrice = (product: Product) => {
//     const quantity = quantities[product.ProductID] || 1; // Get the quantity or default to 1
//     return product.productPrice * quantity; // Multiply price by quantity
//   };

//   const calculateGrandTotal = () => {
//     return products.reduce((total, product) => {
//       const productQuantity = quantities[product.ProductID] || 1; // Get the quantity or default to 1
//       return total + (product.productPrice * productQuantity); // Multiply price by quantity
//     }, 0); // Start with a total of 0
//   };

//   const handleCheckout = () => {
//     router.push('/formulaire'); // Navigate to the Formulaire page
//   };

//   return (
//     <div className="relative z-10">
//       <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
//       <div className="fixed inset-0 overflow-hidden">
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
//             <div className="w-screen max-w-md">
//               <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
//                 <div className="flex items-start justify-between px-4 py-6">
//                   <h2 className="text-3xl font-bold">Shopping Cart</h2>
//                   <button onClick={onClose}>
//                     <IoCloseSharp />
//                   </button>
//                 </div>
//                 <div className="px-4">
//                   {products.length === 0 ? (
//                     <p>Your cart is empty</p>
//                   ) : (
//                     products.map((product) => (
//                       <li className="flex py-6" key={product.ProductID}>
//                         <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                           <img
//                             src={product.CartImage && product.CartImage.length > 0
//                               ? product.CartImage[0]
//                               : 'default-image-url.jpg'}
//                             alt={product.productName}
//                             className="h-full w-full object-cover object-center"
//                           />
//                         </div>
//                         <div className="ml-4 flex flex-1 flex-col">
//                           <div className="flex justify-between text-base font-medium text-gray-900">
//                             <h3>{product.productName}</h3>
//                           </div>
//                           <div className="flex flex-1 items-end justify-between text-sm">
//                             <p className="ml-4">{calculateProductTotalPrice(product)} DT</p>
//                             <div className="flex">
//                               <button onClick={() => decreaseQuantity(product)} className="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l">-</button>
//                               <span className="px-3 py-1 bg-white border border-gray-300 text-gray-800 font-medium">{quantities[product.ProductID] || 1}</span>
//                               <button onClick={() => increaseQuantity(product)} className="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r">+</button>
//                             </div>
//                             <div className="flex">
//                               <button onClick={() => handleDeleteOne(product.CartID)} className="font-medium text-red-500 hover:text-red-700"><DeleteOutlineIcon /></button>
//                             </div>
//                           </div>
//                         </div>
//                       </li>
//                     ))
//                   )}
//                   <ToastContainer />
//                 </div>
//                 <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//                   <div className="flex justify-between text-base font-medium text-gray-900">
//                     <p>Subtotal</p>
//                     <p>{calculateGrandTotal()} DT</p>
//                   </div>
//                   <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
//                   <div className="mt-6">
//                     <button
//                       onClick={handleCheckout}
//                       className="flex items-center justify-center border border-transparent bg-orange-950 px-6 py-3 text-base font-medium text-white shadow-sm">
//                       Checkout
//                     </button>
//                   </div>
//                   <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//                     <p>
//                       or
//                       <a href='/shopAllproducts' type="button" className="font-medium text-orange-900 hover:text-orange-600">Continue Shopping <span aria-hidden="true"> &rarr;</span></a>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

