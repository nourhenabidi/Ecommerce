"use client";
import axios from "axios";
import { useState, useRef } from "react";
import SideNav from "../sideBar/page";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Products {
    ProductID?: number;
    Name: string;
    Description: string;
    Price: number;
    Availability: boolean;
    ProductImage: string[];
    ProductRemise: string;
    newProduct:boolean;
    colorProduct: string;
    productCategory: string;
}

const Addprod = () => {
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string[]>([]);
    const [description, setDescription] = useState<string>("");
    const [productRemise, setProductRemise] = useState<string>("");
    const [availability, setAvailability] = useState<boolean>(true);
    const [newProduct, setNewProduct] = useState<boolean>(true);
    const [productCategory, setProductCategory] = useState<string>("");
    const [colorProduct, setColorProduct] = useState<string>("");
    const [previewImage, setPreviewImage] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const addPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file && image.length < 5) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'pa4ezjqw');

            axios
                .post("http://api.cloudinary.com/v1_1/dfsyqvvim/image/upload", formData)
                .then((res) => {
                    setImage(prevImages => [...prevImages, res.data.secure_url]);
                    if (previewImage.length === 0) {
                        setPreviewImage(res.data.secure_url);
                    }
                })
                .catch((err) => {
                    console.log(formData);
                    console.log(err);
                });
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const notifySuccess = () => toast.success('Car added successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const notifyError = (message: string) => toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const addProduct = async () => {
        try {
            const newProd: Products = {
                Name: name,
                Description: description,
                Price: price,
                ProductImage: image,
                ProductRemise: productRemise,
                Availability: availability,
                newProduct:newProduct,
                colorProduct: colorProduct,
                productCategory: productCategory
            };

            const response = await axios.post('http://localhost:5000/api/products/addProduct', newProd);
            notifySuccess();
            console.log(response.data);
        } catch (error) {
            notifyError('Failed to add product. Please try again.');
            console.error('Error adding product:', error);
        }
    };

    return (
        <>
            <SideNav />
            <div className="mt-[100px] ml-[300px]  w-[1000px] ">
                <h1 className=" font-bold-5xl text-5xl ml-50 text-black ">Add New Product</h1>
                <div className="grid grid-cols-2 ">
                    <div className="grid ml-10 mt-[50px] space-y-4 ">
                        <ToastContainer />
                        <div className="grid grid-cols-2">
                            <label className="block text-orange-950 text-lg">Name:</label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                name="inputname"
                                className="block w-[300px]  py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 "
                            />
                        </div>
                        <div className="grid grid-cols-2 ">
                            <label className="block text-orange-950 text-lg">Price:</label>
                            <input
                                onChange={(e) => setPrice(e.target.valueAsNumber)}
                                type="number"
                                className="block w-[300px]  py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                            />
                        </div>
                        <div className="grid grid-cols-2">
                            <label className="block text-orange-950 text-lg">Description:</label>
                            <input
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                name="inputname"
                                className="block w-[300px]  py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 "
                            />
                        </div>
   
                        <div className="grid grid-cols-2 ">
                            <label className="block text-orange-950 text-lg">ProductRemise:</label>
                            <input
                                onChange={(e) => setProductRemise(e.target.value)}
                                type="number"
                                className="block w-[300px]  py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                            />
                        </div>
                        <div className="grid grid-cols-2">
                            <label className="block text-orange-950 text-lg">ProductCategory:</label>
                            <input
                                onChange={(e) => setProductCategory(e.target.value)}
                                type="text"
                                name="inputname"
                                className="block w-[300px]  py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 "
                            />
                        </div>
                        <div className="grid grid-cols-2">
                            <label className="block text-orange-950 text-lg">Availability:</label>
                            <input
                                type="checkbox"
                                checked={availability}
                                onChange={() => setAvailability(!availability)}
                                className="form-checkbox h-5 w-5 text-gray-600"
                            />
                        </div>
                        <div className="grid grid-cols-2">
                            <label className="block text-orange-950 text-lg">New Product:</label>
                            <input
                                type="checkbox"
                                checked={newProduct}
                                onChange={() => setNewProduct(!newProduct)}
                                className="form-checkbox h-5 w-5 text-gray-600"
                            />
                        </div>
                       
                        <button
                            className="py-3.5 px-7 text-base font-large text-black focus:outline-none bg-[#c8ad7f] border focus:z-10 focus:ring-4 focus:ring-indigo-200 mt-[200px] ml-[150px] w-[300px]"
                            onClick={addProduct}
                        >
                            Add product
                        </button>
                    </div>
                    <div className="space-y-5 sm:flex-col gap-6">
                        <button
                            className="ml-[200px] mt-[50px] text-white py-3.5 px-7 text-base font-medium focus:outline-none bg-orange-950  border border-indigo-200 hover:bg-orange-800 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                            onClick={handleButtonClick}
                        >
                            Add Pictures
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            onChange={(e) => { addPicture(e) }}
                        />
                        <div className="grid grid-cols-2 space-x-1 space-y-2 ml-[100px] mt-11">
                            {image.slice(0, 5).map((img, index) => (
                                <img
                                    className=" border object-cover w-[150px] h-[150px] p-1"
                                    key={index}
                                    src={img}
                                    alt={`previewImage ${index}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Addprod;
