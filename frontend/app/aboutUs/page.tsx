"use client"
import "./about.css"
import Navbar from "../navBar/page"

const aboutUs :React.FC =()=>{
    return(
        <div>
              <div className="body">
    <Navbar />
    <div className="fully">
      
        <div>
      <img src="https://i.pinimg.com/564x/78/70/05/787005072c466cab7303683ce92f11ea.jpg"alt="" />  

        </div>
        <div className="text-container absolute right-32 top-1/2 transform -translate-y-1/2">
      <h1 className="text-white text-4xl font-bold mb-9">Why Us</h1>
      <p className="text-white text-2xl ">Fall has arrived .</p>
      <p className="text-white text-2xl">Shop for our new releases starting today .</p>
 
    </div>
    </div>
        </div>
        </div>
    )
}
export default aboutUs