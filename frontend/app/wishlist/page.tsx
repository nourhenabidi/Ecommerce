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
      {/* <Badge badgeContent="5" color="error">
        <ShoppingCartIcon
          color="black"
          onClick={handleOpen}
          sx={{ width: "35px" }}
        />
      </Badge> */}
      <div className="wishlist__container">
        <div className="wishlist__header">
          <h2>Your Wishlist</h2>
        </div>
        <div className="wishlist__items__container">
          {wishList.map((el, j) => (
            <div key={j} className="wishlist__items">
              <div className="wishcard">
                <div className="wish__remove__item__icon">
                  <IconButton
                    onClick={() => {
                      handelRemoveItem(el.id);
                    }}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </div>
                <div className="wish__item__image">
                  <img
                    src={el.ProductImage}
                    alt="item"
                    className="wish__image"
                  />
                </div>
                <div className="wish__item__name">{el.Name}</div>
                <div className="wish__item__price">${el.Price}</div>
                <div className="add__to__cart">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      console.log("hello");

                      handelAddToCart(el);
                    }}
                    sx={[
                      {
                        "&:hover": {
                          backgroundColor: "#FFE26E",
                          borderColor: "#FFE26E",
                          color: "black",
                        },
                        borderColor: "black",
                        backgroundColor: "black",
                        color: "#FFE26E",
                      },
                    ]}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>

              {/* <div>No items</div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;