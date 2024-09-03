"use client"
import { createContext, useState, useEffect, ReactNode } from 'react';
// import axios from 'axios';

interface Product {
        ProductID: number;
        Name: string;
        Description: string;
        Price: string;
        Availability:string;
        ProductImage:string[];
        ProductRemise:string;
        colorProduct:string;
      } 

interface User {
  id: number;
//   username: string;
  email: string;
  password: string;
//   address: string;
//   firstName: string;
//   lastName: string;
//   role: string;
}
type ProductArray = Product[];
interface DataProviderProps {
  children: ReactNode;  
}

interface DataContextValue {
  oneProduct: Product | null;
  setOneproduct: React.Dispatch<React.SetStateAction<Product | null>>;
  products: ProductArray;
  productList: any[];
  setProductList: React.Dispatch<React.SetStateAction<any[]>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  handleAddToChartBtn: (i: string, prod: Product) => void;
  id: number | null;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Add this line
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  setGetAllData: React.Dispatch<React.SetStateAction<Boolean>>;
  getAllData: Boolean;
  cartList: any[]; // Add this line
  setCartList: React.Dispatch<React.SetStateAction<any[]>>; // Add this line
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [oneProduct, setOneproduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<ProductArray>([]);
  const [productList, setProductList] = useState<any[]>([]);
  const [cartList, setCartList] = useState<any[]>([]); // Add state for cartList
  const [quantity, setQuantity] = useState(1);
  const [id, setId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null); // Add state for user
  const [getAllData, setGetAllData] = useState<Boolean>(false);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (getAllData) {
         
  //         const allProductsResponse = await axios.get('http://localhost:5000/api/products/allProducts');
  //         setProducts(allProductsResponse.data);
  //       } else {
        
  //         const limitedProductsResponse = await axios.get('http://localhost:5000/api/products/allProducts', {
  //           params: 
  //           {limit: 4},
  //         });
  //         setProducts(limitedProductsResponse.data);
  //       }

        
  //       const userResponse = await axios.get(`http://localhost:5000/api/users/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       });
  //       setUser(userResponse.data);
  //     } catch (error) {
  //       console.error('Error fetching data', error);
  //     }
  //   };
  //   fetchData();
  // }, [id, getAllData]);

  const handleAddToChartBtn = (i: string, prod: Product) => {
    setProductList([
      ...productList,
      {
        id: i,
        product: prod,
        quantity: 1,
      },
    ]);
    console.log(prod, 'cartlisttt');
  };

  const value: DataContextValue = {
    oneProduct,
    setOneproduct,
    products,
    productList,
    setProductList,
    cartList, // Include cartList
    setCartList, // Include setCartList
    quantity,
    setQuantity,
    handleAddToChartBtn,
    id,
    setId,
    user, // Include user
    setUser, // Include setUser
    setGetAllData,
    getAllData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };