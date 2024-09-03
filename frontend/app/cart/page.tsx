"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useRouter } from 'next/navigation';


interface Product {
  ProductID: number;
  Name: string;
  ProductImage:string[];
  Price: number;
}

type Quantities = {
  [ProductId: number]: number;
};

const Cart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Quantities>({});
  const id=sessionStorage.getItem('token')?.split(',')[1]
  const router=useRouter()
  useEffect(()=>{
    const id=sessionStorage.getItem('token')?.split(',')[1]
    if(id){
      router.push('/cart')
    }
    else{
    router.push('/Login')}
  },[])
  useEffect(() => {
    if (id) {
      fetchProducts();
    }
  }, [id]);

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await axios.get<Product[]>(`http://localhost:5000/api/cart/UserCart/${id}`);
      setProducts(response.data);
      const initialQuantities: Quantities = {};
      response.data.forEach((product) => {
        initialQuantities[product.Price] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleDeleteOne = (ProductId:number) => {
    axios
      .delete(`http://localhost:5000/api/cart/deleteCart/${ProductId}`)
      .then((response) => {
        console.log(response.data);
     
        fetchProducts();
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handleQuantityChange = (productId:number, quantity:number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const calculateTotalPrice = (product:Product) => {
    return product.Price * quantities[product.ProductID];
  };

  const calculateGrandTotal = () => {
    return products.reduce((total, product) => {
      return total + calculateTotalPrice(product);
    }, 0);
  };


  return (
    <div>
     
      <div className="bg-gray-100">
  <div className="container mx-auto mt-10">
    <div className="flex shadow-md my-10">
      <div className="w-3/4 bg-white px-10 py-10">
        <div className="flex justify-between border-b pb-8">
          <h1 className="font-semibold text-2xl">Shopping Cart</h1>
        </div>
        <div className="flex mt-10 mb-5">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 className="font-semibold text center text-gray-600 text-xs uppercase w-1/5 text center">Quantity</h3>
          <h3 className="font-semibold text center text-gray-600 text-xs uppercase w-1/5 text center">Price</h3>
          <h3 className="font-semibold text center text-gray-600 text-xs uppercase w-1/5 text center">Total</h3>
        </div>
       
        {products.map((product)=>(
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={product.ProductID}>
          <div className="flex w-2/5">
            <div className="w-20">
              <img className="h-24" src={product.ProductImage} alt=""/>
            </div>
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <span className="font-bold text-sm">{product.Name}</span>
              <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs"
              onClick={() => {handleDeleteOne(product.ProductID)}}>Remove</a>
            </div>
          </div>
          
          <div className="flex justify-center w-1/5">
            
    <button onClick={() =>handleQuantityChange(product.ProductID,quantities[product.ProductID] - 1) } disabled={quantities[product.ProductID] <= 1}>
                          -
                        </button>
                        <span>{quantities[product.ProductID]}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product.ProductID,
                              quantities[product.ProductID] + 1
                            )
                          }
                        >
                          +
                        </button>
            
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">{product.Price}</span>
          <span className="text-center w-1/5 font-semibold text-sm">{calculateTotalPrice(product)} DT</span>
        </div>
         ))}  
      
        <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">
          <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
          Continue Shopping
        </a>
      </div>

      <div id="summary" className="w-1/4 px-8 py-10">
        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>{calculateGrandTotal()} DT</span>
          </div>
          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-black uppercase w-full">Checkout</button>
        </div>
      </div>

    </div>
  </div>
</div>

    </div>
  )
}

export default Cart




















































// "use client"
// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import { useRouter} from 'next/navigation';
// import "../shopAllproducts/prod.css"
// import Nav from "../navBar/page"
// import Footer from "../footer/page"


// type CartItem = {
//   quantity?: number;
//   Price: number;
// };

// function Cart() {

//   const [cartData, setCartData] =  useState<CartItem[]>([]);
//   const [refresh,setRefresh] = useState<boolean>(true);
//   const id = localStorage.getItem('idUser');
//   const router=useRouter()


  


//   const deleteC = (CartID:number) => {
//     console.log('cart ID:', CartID);
//     axios.delete(`http://localhost:5000/api/cart/deleteCart/${CartID}`)
//       .then((res) => {
//         console.log(res.data)
        
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//       setRefresh(!refresh)
      
//   }
  
  

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/cart/UserCart/${id}`)
//       .then((response) => {
//         console.log('cartList', response.data);
//         setCartData(response.data);
       
//       })
//       .catch((error) => console.log(error));
//   }, [refresh])

//   const calculateSubtotal = (quantity:number, price:number) => {
//     return quantity * price;
//   };



//   return (
//     <div className='body'>
//       <Nav /> 
// <div>
// <h1 className='mt-20'>
//      <span className="flex justify-center text-4xl text-black "> Cart</span>
//         </h1>
// </div>

//       <div className='ml-40 mt-20'>


//         <div className='grid grid-cols-4 mt-10 shadow items-center h-14 w-5/6 '>
//           <h1 className='ml-20'>Product</h1>
//           <h1 className='ml-20'>Price</h1>
//           <h1 className='ml-20'>Quantity</h1>
//           <h1 className='ml-10'>Subtotal</h1>
//         </div>
//         {cartData.map((item:any, i) => (
//           <div key={i} className='grid grid-cols-4 mt-10 shadow items-center h-14 w-5/6 ' style={{'display':'flex','justifyContent':'space-around'}}>
           
//            <h1 className='ml-5'>{item.NameCart}</h1>
//             <img className='image' src={item.CartImage[0]} alt="no-content" />
            
//             <h1 className='pricc'>{item.Price} DT</h1>
//             <input
//               className='w-10 ml-10 border-gray-300 border rounded'
//               type="number"
//               value={item.Quantity || 1}
//               onChange={(e) => {
//                 const newQuantity = parseInt(e.target.value);
//               }}
//             />
//             <h1 className='pricee'>{calculateSubtotal(item.quantity || 1, item.Price)} DT</h1>
//             <MdDelete className='ml-10 cursor-pointer'  onClick={() => { deleteC(item.CartID)}}/>
            
//           </div>
          
//         ))}



//         <div className='mt-20 '>
        

//         <img className="imga" src="https://images2.imgbox.com/fc/97/c24stbXg_o.png" alt=""></img>

//           <h3 className='sub'>Subtotal: {cartData.reduce((total, item) => total + calculateSubtotal(item.quantity || 1, item.Price), 0)}DT</h3>
//           <br/>
//           <h3 className='sub'>Total: {cartData.reduce((total, item) => total + calculateSubtotal(item.quantity || 1, item.Price), 0)}DT</h3>
//           <br/>
//           </div>
//           <button
//           // onClick={()=>navigate('/shooping/paiement')} 
//           className=' bg-red w-40 h-12 border rounded text-white text-sm' id='check'>Checkout</button>
//         </div>
//         <Footer />
//       </div>
      
//   );
// }

// export default Cart;