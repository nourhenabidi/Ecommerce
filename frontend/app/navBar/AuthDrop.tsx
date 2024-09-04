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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const WhereDrop = () => {
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false); // State for sign-up modal
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      setIsAuthenticated(!!token);
    }
  }, []);

  if (isAuthenticated === null) {
    // Optionally render a loading state or nothing while determining authentication
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AccountCircleIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Join Us!</DropdownMenuLabel>
          {!sessionStorage.getItem("token") && (
            <>
              <DropdownMenuItem onClick={openSignInModal}>
                Sign in
              </DropdownMenuItem>

            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sign-In Modal */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={closeSignInModal}
        onSignUp={openSignUpModal} // Pass the function to open sign-up modal
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
