"use client";
import React, { useState ,useEffect} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import SignInModal from "../Login/page";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const AuthDrop = () => {
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openSignInModal = () => {
    setSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setSignInModalOpen(false);
  };
  console.log(isSignInModalOpen);

    useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if the code is running on the client side
      const token = sessionStorage.getItem("token");
      setIsLoggedIn(!!token); // Update the logged-in state
    }
  }, []);
  return (
    
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AccountCircleIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {isLoggedIn ? (
            <DropdownMenuLabel >My Account</DropdownMenuLabel>
          ) : (
            <DropdownMenuLabel>Join Us !</DropdownMenuLabel>
          )}
          <DropdownMenuSeparator className="bg-gray-400" />
          {!isLoggedIn && (
            <DropdownMenuItem onClick={openSignInModal}>
              Sign up
            </DropdownMenuItem>
          )}
          {!isLoggedIn && (
            <DropdownMenuItem onClick={openSignInModal}>
              Login
            </DropdownMenuItem>
          )}

          {isLoggedIn&& (
            <>
              <DropdownMenuSeparator className="bg-gray-400" />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              {isLoggedIn&& (
                <DropdownMenuItem>Log out</DropdownMenuItem>
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <SignInModal isOpen={isSignInModalOpen} onClose={closeSignInModal} />
    </>
  );
};

export default AuthDrop;