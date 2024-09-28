"use client";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SignInModal from "../Login/page";
import Signup from "../Signup/page"; // Import the Signup component
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const WhereDrop = () => {
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false); // State for sign-up modal
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const openSignInModal = () => {
    setSignUpModalOpen(false); // Close sign-up if open
    setSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setSignInModalOpen(false);
  };

  const openSignUpModal = () => {
    setSignInModalOpen(false); // Close login modal if it's open
    setSignUpModalOpen(true); // Open sign-up modal
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };

  const handleSignUpSuccess = () => {
    closeSignUpModal(); // Close the sign-up modal
    openSignInModal();  // Open the login modal
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false); // Set isAuthenticated to false to reflect the logged-out state
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      setIsAuthenticated(!!token); // Set authentication state based on token existence
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Set authentication state to true after login
    closeSignInModal();       // Close the sign-in modal after successful login
  };
 return (
    <>
      <DropdownMenu>
      {!isAuthenticated && (
        <DropdownMenuTrigger>
         Join Us
        </DropdownMenuTrigger>
      )}
      {isAuthenticated && (
        <DropdownMenuTrigger>
          <AccountCircleIcon />
        </DropdownMenuTrigger>
      )}
        <DropdownMenuContent>
              {!isAuthenticated && (
            <>
              <DropdownMenuItem onClick={openSignInModal}>
               Log in
              </DropdownMenuItem>
            </>
          )}
          
          {isAuthenticated && (
            
            <>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sign-In Modal */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={closeSignInModal}
        onLoginSuccess={handleLoginSuccess} // Pass the login success handler to update the dropdown
        onSignUp={openSignUpModal}         // Pass the function to open sign-up modal
      />

      {/* Sign-Up Modal */}
      <Signup
        isOpen={isSignUpModalOpen}
        onClose={closeSignUpModal}
        onSignUpSuccess={handleSignUpSuccess} // Pass the function to open login modal after successful sign-up
      />
    </>
  );
};

export default WhereDrop;
