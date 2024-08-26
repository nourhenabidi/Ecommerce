// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navv from "../../navBar/page";
// // import Company from "../companyInfo/CompanyInfo";
// import Foot from "../../footer/page";
// import { Modal } from "react-responsive-modal";
// import "react-responsive-modal/styles.css";
// // import Rating from "../rating/Rating"
// // import Available from "../companyInfo/VehicleAvailability"
// interface Prodcut {
//   ProductID: number;
//   Name: string;
//   Description: string;
//   Price: string;
//   Availability:string;
//   ProductImage:string[];
//   ProductRemise:string;
//   colorProduct:string;
// }



// const CarInfo = ({ ProductID }: CarInfoProps) => {
//   const [carInfo, setCarInfo] = useState<Prodcut | null>(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

//   const handleThumbnailClick = (index) => {
//     console.log("Selected Image Index:", index);
//     setSelectedImageIndex(index);
//   };

//   const handleCloseModal = () => {
//     setSelectedImageIndex(null);
//   };

//   const handlePreviousImage = () => {
//     if (selectedImageIndex !== null) {
//       const newIndex =
//         (selectedImageIndex - 1 + carInfo.image.length) % carInfo.image.length;
//       setSelectedImageIndex(newIndex);
//     }
//   };

//   const handleNextImage = () => {
//     if (selectedImageIndex !== null) {
//       const newIndex = (selectedImageIndex + 1) % carInfo.image.length;
//       setSelectedImageIndex(newIndex);
//     }
//   };

//   const handleKeyDown = (event:any) => {
//     switch (event.key) {
//       case 'ArrowLeft':
//         handlePreviousImage();
//         break;
//       case 'ArrowRight':
//         handleNextImage();
//         break;
//       default:
//         break;
//     }
//   };
//   var currentUrl = window.location.href;
//   var endPoint = currentUrl.split("/");
//   var i = endPoint[endPoint.length - 1];
//   useEffect(() => {
//     const fetchCarInfo = async () => {
//       try {
//         const response = await axios.get<Car>(
//           `http://localhost:3000/api/car/${i}`
//         );
//         console.log("Car Images:", response.data.image);
//         setCarInfo(response.data);
//       } catch (error) {
//         console.error("Error fetching car info:", error);
//       }
//     };

//     fetchCarInfo();
//   }, []);

//   return (
//     <div onKeyDown={handleKeyDown} tabIndex="0">
//       {carInfo ? (
//         <div>
//           <Navv />
//           <br/>
//           <br/>
//           <br/>
//           <br/>

//           <p className="name">
//             {carInfo.brand} {carInfo.model}{" "}
//           </p>
//           <div style={{ display: "flex" }}>
//             <div>
//               <p className="infos">
//                 <PaidIcon /> Price: {carInfo.price} DT/Day
//               </p>
//               <p className="infos">
//                 <DirectionsCarIcon />
//                 Brand: {carInfo.brand}
//               </p>
//               <p className="infos">
//                 <DirectionsCarIcon />
//                 Model: {carInfo.model}
//               </p>
//               <p className="infos">
//                 <ToysIcon />
//                 Type: {carInfo.type}
//               </p>
//             </div>
//             <div>
//               <p className="info">
//                 {" "}
//                 <DirectionsCarIcon /> Transmission: {carInfo.transmission}
//               </p>
//               <p className="info">
//                 <LocalGasStationIcon /> Fuel Type: {carInfo.fuelType}
//               </p>
//               <p className="info">
//                 <CalendarTodayIcon /> Registration: {carInfo.registration}
//               </p>
//               <p className="info">
//                 <AddRoadIcon /> Mileage : {carInfo.mileage}
//               </p>
//               <Company />
//               <Date />
//               <Rating />
//              <Available/>
//             </div>
//           </div>

//           {carInfo.image && carInfo.image.length > 0 && (
//             <div>
//               <div style={{ display: "flex" }}>
//                 <img id="mainimage" src={carInfo.image[0]} alt={`Car 1`} />
//                 <div className="carimages">
//                   {carInfo.image.map((imageUrl, index) => (
//                     <img
//                       key={index}
//                       src={imageUrl}
//                       className="carImageItem"
//                       alt={`Car ${index + 1}`}
//                       style={{ width: "250px", cursor: "pointer" }}
//                       onClick={() => handleThumbnailClick(index)}
//                     />
//                   ))}
//                 </div>
//                 <Modal
//                   open={selectedImageIndex !== null}
//                   onClose={handleCloseModal}
//                   center
//                   classNames={{
//                     modal: "custom-modal",
//                   }}
//                 >
//                   {selectedImageIndex !== null && (
//                     <div>
//                       <button onClick={handleCloseModal}></button>
//                       <img
//                         src={carInfo.image[selectedImageIndex]}
//                         alt={`Car ${selectedImageIndex + 1}`}
//                         style={{ width: "800px", height: "auto" }}
//                       />
//                     </div>
//                   )}
//                 </Modal>
//               </div>
//             </div>
//           )}
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <div>
//             {" "}
//             <Foot />
//           </div>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default CarInfo;