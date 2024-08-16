"use client"
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Na from "../navBar/page"


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

  const Cart: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/card/getCard');
            setCart(response.data);
            console.log(response.data);
            
          } catch (error) {
            console.error('Error fetching product data', error);
          }
        };
    
        fetchData();
      }, []);

    return(
        <div></div>
    )
  }
  export default Cart