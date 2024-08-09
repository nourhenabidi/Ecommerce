"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';  


const searchByCategory = () => {
    return (
    
             <div className="flex justify-center space-x-40 mt-[100px]">
      <Link href={`http://localhost:3001/Home/SearchBuyOccasion/wedding` }>

          <img
          src=""/>
          <h1 className="font-semibold text-black ">Weddings</h1>

        </Link> 
        
        <Link href={`http://localhost:3001/Home/SearchBuyOccasion/daily` }>
    
          <img
            src=""/>
          <h1 className="font-semibold text-black ">Daily Use</h1>
      
        </Link>

        <Link href={`http://localhost:3001/Home/SearchBuyOccasion/trans` }>
  
          <img
            src=""/>
          <h1 className="font-semibold text-black ">Transporter</h1>
        
        </Link>

        </div>
    )
}
export default searchByCategory