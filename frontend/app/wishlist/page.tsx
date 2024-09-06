"use client";
import React, { useEffect, useState } from "react";
import "./wishlist.css";
import { Button, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import { refresh } from "@cloudinary/url-gen/qualifiers/artisticFilter";
import axios from "axios";
// import Badge from "@mui/material/Badge";
// // import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface Products {
    id:number;
    ProductID: number;
    Name: string;
    Description: string;
    Price: string;
    Availability:string;
    ProductImage:string[];
    ProductRemise:string;
    colorProduct:string;
    
  } 


const Wishlist: React.FC = () => {
  const [wishList, setWishList] = useState<Products[] | []>([]);
  const [refresh, setRefresh] = useState<Boolean>(false);
  const [open, setOpen] = useState<Boolean>(false);

  const handleOpen = () => setOpen(true);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:5000/wishlist/4`);
    const ress = await response.json();
    setWishList(ress);
  };
  useEffect(() => {
    fetchData();
  }, [refresh]);
  const handelRemoveItem = async (prod: Number) => {
    const resss = await axios.put("http://localhost:5000/wishlist", {
      ProductId: prod,
      UserId: 4,
    });
    setRefresh(!refresh);
  };
  const handelAddToCart = (obj: any) => {
    console.log(obj);

    let storage: Products[] =
      JSON.parse(localStorage.getItem("basket") as string) || null;
    let arrBasket = [];
    if (storage !== null) {
      arrBasket = [...storage, obj];
    } else {
      arrBasket = [obj];
    }
    localStorage.clear();
    localStorage.setItem("basket", JSON.stringify(arrBasket));
  };

  return (
    <div className="wishlist">
 
 
    </div>
  );
};

export default Wishlist;