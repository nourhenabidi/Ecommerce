"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; 
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./prod.css"


const ShopAllproducts: React.FC = () => {
    const [product, setProduct] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/products/allProducts');
            setProduct(response.data.filter((product: any) => product.shop === 'all'));
          } catch (error) {
            console.error('Error fetching product data', error);
          }
        };
    
        fetchData();
      }, []);

    return(
        <div>
             <div className="product-container">
        {product.map((product) => (
          <div key={product.idproducts} className="product-box">
            <img
              src={product.image[0]}
              alt={`${product.brand} ${product.model}`}
              className="product-image"
            />
            <div className="product-details">
              <h3>
                {product.brand} {product.model}
              </h3>
              <h3 style={{ display: "flex", alignItems: "center" }}>
              <PersonOutlineIcon /> {product.passengers}
                <span style={{ margin: "07px" }}></span>
                <LocalGasStationIcon /> {product.fuelType}
                <span style={{ margin: "07px" }}></span>
                <DirectionsCarIcon /> {product.type}
              </h3>
              <h3 style={{ display: "flex", alignItems: "center", position:"relative",top:"50px" }} >{product.price} DT/Day</h3>
              <Stack spacing={2} direction="row">
              <Link target="_blank" href={`/client/VehicleDetails/${product.idproducts}` }>
              <Button className = "but"size="small" variant="contained" style={{ backgroundColor: '#C0C0C0', color: 'black'  }}>Rent Now</Button>
      </Link>
      </Stack>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    )
}
export default ShopAllproducts