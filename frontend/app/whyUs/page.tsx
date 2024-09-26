"use client"
import "./whyUs.css"
import Navbar from "../navBar/page"
import Fott from "../footer/page"




const WhyUs :React.FC =()=>{

    return(
  
                <div 
     
      className="body">
    <Navbar />
    <div className="fully" >
      
        <div>
      <img src="https://i.pinimg.com/736x/4c/0b/be/4c0bbe67066d0c6d9426664e7659dde7.jpg"alt="" />  

        </div>
        <div className="text-container absolute left-32 top-1/2 transform -translate-y-1/2">
      <h1 className="text-white text-4xl font-bold mb-9">Why Us</h1>
      <p className="text-white text-2xl ">Fall has arrived .</p>
      <p className="text-white text-2xl">Shop for our new releases starting today .</p>
 
    </div>
    </div>
    <Fott />
        </div>
    )
}
export default WhyUs;