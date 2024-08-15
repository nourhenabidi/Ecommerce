"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./braclete.css"
import Heady from "../../navBar/page"

interface Products {
    ProductID: number;
    Name: string;
    Description: string;
    Price: string;
    Availability:string;
    ProductImage:string[];
    ProductRemise:string;
    colorProduct:string;
  } 

const Bracelets: React.FC =()=>{
    const [bracelet, setBracelet] = useState<Products[]>([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/products/allProducts');
            setBracelet(response.data.filter((Products: any) => Products.productCategory === 'Bracelets'));
          } catch (error) {
            console.error('Error fetching car data', error);
          }
        };
    
        fetchData();
      }, []);
    return(
        <div>
           <Heady/>
           <div >
           <h1 className='title'>Our Collection</h1>
           </div>
        </div>
    )
}
export default Bracelets