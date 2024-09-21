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
    oldPrice?: number;
    newPrice?:number;
    Availability: boolean;
    ProductImage: string[];
    ProductRemise: string;
    newProduct:boolean;
    colorProduct: string;
    productCategory: string;
}

const Addprod = () => {
    const [name, setName] = useState<string>("");
    const [oldPrice, setOldPrice] = useState<number | undefined>(undefined);
    const [newPrice, setNewPrice] = useState<number | undefined>(undefined);
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
 

    const notifySuccess = () => toast.success('Product added successfully!', {
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
            const formattedRemise = productRemise.endsWith('%') ? productRemise : `${productRemise}%`;

            const newProd: Products = {
                Name: name,
                Description: description,
                oldPrice: oldPrice,
                newPrice:newPrice,
                ProductImage: image,
                ProductRemise:formattedRemise,
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
    const categories = [
        "Rings",
        "Necklaces",
        "Earrings",
        "Bracelets",
        "Packs",
        "Accessories hair"
    ];
    return (
        <div>
        <SideNav />
        <div className="mt-[100px] ml-[300px] w-[1000px]">
            <h1 className="font-bold text-5xl text-black mb-8">Add New Product</h1>
            <div className="grid grid-cols-2 gap-10">
                <div className="ml-10 mt-8 space-y-6">
                    <ToastContainer />
                    
                    {/* Product Name */}
                    <div className="grid grid-cols-2 items-center">
                        <label className="block text-orange-950 text-lg">Name:</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            name="inputname"
                            className="block w-[300px] py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                        />
                    </div>
    
                    {/* Price */}
                    <div className="grid grid-cols-2 items-center">
                        <label className="block text-orange-950 text-lg">New Price:</label>
                        <input
                            onChange={(e) => setNewPrice(e.target.valueAsNumber)}
                            type="number"
                            className="block w-[300px] py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <label className="block text-orange-950 text-lg">Old Price:</label>
                        <input
                            onChange={(e) => setOldPrice(e.target.valueAsNumber)}
                            type="number"
                            className="block w-[300px] py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                        />
                    </div>
                    {/* Description */}
                    <div className="grid grid-cols-2 items-center">
                        <label className="block text-orange-950 text-lg">Description:</label>
                        <input
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            name="description"
                            className="block w-[300px] py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                        />
                    </div>
    
                    {/* Product Remise */}
            <div className="grid grid-cols-2 items-center">
                <label className="block text-orange-950 text-lg">Product Remise (%):</label>
                <input
                    onChange={(e) => setProductRemise(e.target.value)} // Ensure it sets the value
                    type="text" // Allow percentage input
                    className="block w-[300px] py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    placeholder="Enter percentage (e.g., 10)"
                    value={productRemise} // Ensure controlled component
                />
            </div>
    
                    {/* Product Category */}
                    <div className="grid grid-cols-2 items-center">
        <label className="block text-orange-950 text-lg">Product Category:</label>
        <select
            onChange={(e) => {
                console.log("Selected category:", e.target.value); // Debugging log
                setProductCategory(e.target.value);
            }}
            className="block w-[300px] py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
        >
            <option value="">Select a category</option>
            {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
            ))}
        </select>
    </div>
    
                    {/* Availability */}
                    <div className="grid grid-cols-2 items-center gap-4">
                        <label className="block text-orange-950 text-lg">Availability:</label>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setAvailability(true)}
                                className={`w-[150px] py-1.5 px-2 ring-1 ring-inset ${
                                    availability ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'
                                }`}
                            >
                                In Stock
                            </button>
                            <button
                                onClick={() => setAvailability(false)}
                                className={`w-[150px] py-1.5 px-2 ring-1 ring-inset ${
                                    !availability ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'
                                }`}
                            >
                                Out of Stock
                            </button>
                        </div>
                    </div>
    
                    {/* New Product */}
                    <div className="grid grid-cols-2 items-center gap-4">
                        <label className="block text-orange-950 text-lg">New Product:</label>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setNewProduct(true)}
                                className={`w-[150px] py-1.5 px-2 ring-1 ring-inset ${
                                    newProduct ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                                }`}
                            >
                                New
                            </button>
                            <button
                                onClick={() => setNewProduct(false)}
                                className={`w-[150px] py-1.5 px-2 ring-1 ring-inset ${
                                    !newProduct ? 'bg-gray-500 text-white' : 'bg-gray-200 text-black'
                                }`}
                            >
                                Not New
                            </button>
                        </div>
                    </div>
    
                    {/* Add Product Button */}
                    <button
                        className="py-3.5 px-7 text-base font-medium text-black focus:outline-none bg-[#c8ad7f] border focus:z-10 focus:ring-4 focus:ring-indigo-200 mt-[100px] w-[300px]"
                        onClick={addProduct}
                    >
                        Add Product
                    </button>
                </div>
    
                {/* Image Upload Section */}
                <div className="space-y-5 sm:flex-col gap-6">
                    <button
                        className="ml-[200px] mt-[50px] text-white py-3.5 px-7 text-base font-medium focus:outline-none bg-orange-950 border hover:bg-orange-800 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                        onClick={handleButtonClick}
                    >
                        Add Pictures
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={addPicture}
                    />
                    <div className="grid grid-cols-2 gap-4 ml-[100px] mt-11">
                        {image.slice(0, 5).map((img, index) => (
                            <img
                                className="border object-cover w-[150px] h-[150px] p-1"
                                key={index}
                                src={img}
                                alt={`Preview ${index}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    );
}

export default Addprod;
