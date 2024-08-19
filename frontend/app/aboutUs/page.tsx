"use client"
import React, { useEffect, useState, useRef } from 'react';
import "./about.css"
import Navbar from "../navBar/page"
import Fott from "../footer/page"
import {motion} from "framer-motion"
import fadeIn from "../fadeIn"



const aboutUs :React.FC =()=>{

  const [animationTriggered, setAnimationTriggered] = useState<boolean>(false);
  const scrollDown = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleScroll = () => {
      if (scrollDown.current) {
        const down = scrollDown.current.getBoundingClientRect();
        const vs = down.top < window.innerHeight
        setAnimationTriggered(vs);
      }
    };
    window.addEventListener('scroll', handleScroll);

  },[])
    return(
  
                <motion.div 
      ref={scrollDown}
          variants={fadeIn('up')}
           initial='hidden'
          animate={animationTriggered ? 'show' : 'hidden'}
      className="body">
    <Navbar />
    <div className="fully" style={{ marginBottom: '50px' }}>
      
        <div>
      <img src="https://i.pinimg.com/564x/78/70/05/787005072c466cab7303683ce92f11ea.jpg"alt="" />  

        </div>
        <div className="text-container absolute right-32 top-1/2 transform -translate-y-1/2">
      <h1 className="text-white text-4xl font-bold mb-9">Why Us</h1>
      <p className="text-white text-2xl ">Fall has arrived .</p>
      <p className="text-white text-2xl">Shop for our new releases starting today .</p>
 
    </div>
    </div>
    <Fott />
        </motion.div>
    )
}
export default aboutUs