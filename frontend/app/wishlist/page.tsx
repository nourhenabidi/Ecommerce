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
  // const [wishList, setWishList] = useState<Products[] | []>([]);
  // const [refresh, setRefresh] = useState<Boolean>(false);
  // const [open, setOpen] = useState<Boolean>(false);

  // const handleOpen = () => setOpen(true);

  // const fetchData = async () => {
  //   const response = await fetch(`http://localhost:5000/wishlist/4`);
  //   const ress = await response.json();
  //   setWishList(ress);
  // };
  // useEffect(() => {
  //   fetchData();
  // }, [refresh]);
  // const handelRemoveItem = async (prod: Number) => {
  //   const resss = await axios.put("http://localhost:5000/wishlist", {
  //     ProductId: prod,
  //     UserId: 4,
  //   });
  //   setRefresh(!refresh);
  // };
  // const handelAddToCart = (obj: any) => {
  //   console.log(obj);

  //   let storage: Products[] =
  //     JSON.parse(localStorage.getItem("basket") as string) || null;
  //   let arrBasket = [];
  //   if (storage !== null) {
  //     arrBasket = [...storage, obj];
  //   } else {
  //     arrBasket = [obj];
  //   }
  //   localStorage.clear();
  //   localStorage.setItem("basket", JSON.stringify(arrBasket));
  // };
  
  const [show3, setshow3] = useState(false);
  return (
    <div className="wishlist">

        <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
            <div className="flex flex-col jusitfy-start items-start">
        
            
                <div className=" mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
                
                    <div className="flex flex-col">
                   
                        <div className="mt-6 flex justify-between items-center">
                            <div className="flex justify-center items-center">
                                <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800">EZ sneakers</p>
                            </div>
                            <div className="flex justify-center items-center">
                                <button aria-label="show menu" onClick={() => setshow3(!show3)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 text-white hover:text-gray-400">
                                    <svg className={`fill-stroke ${show3 ? "block" : "hidden"}`} width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L5 1L1 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <svg className={`fill-stroke ${show3 ? "hidden" : "block"}`} width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div id="menu3" className={`flex-col jusitfy-start items-start mt-12 ${show3 ? "flex" : "hidden"}`}>
                          <div>
                            <img className="max-w-20 max-h-30" src="https://i.pinimg.com/564x/20/22/b3/2022b3f88681d9caf0d8e5a7d4ad4dc8.jpg" alt="" />
                          </div>
                            <div>
                                <p className="tracking-tight text-xs leading-3 text-gray-800">name</p>
                            </div>
                            <div className="mt-2">
                                <p className="tracking-tight text-base font-medium leading-4 text-gray-800">description</p>
                            </div>
                          
                            <div className="mt-6">
                                <p className="tracking-tight text-base font-medium leading-4 text-gray-800">price</p>
                            </div>
                            <div className="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                             
                                <div className="w-30 ">
                                    <button className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2  text-white w-full tracking-tight py-4 text-lg leading-4  hover:bg-black bg-gray-800 border border-gray-800">Add to cart</button>
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

export default Wishlist;