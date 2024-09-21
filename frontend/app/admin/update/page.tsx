"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../sideBar/page";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';

interface Products {
  id: number;
  ProductID: number;
  Name: string;
  Description: string;
  newPrice?: number;
  oldPrice?: number;
  Availability: string;
  ProductImage: string[];
  ProductRemise: string;
  colorProduct: string;
  productCategory: string;
}

const Update = () => {
  const [products, setProduct] = useState<Products[]>([]);
  const [editingProduct, setEditingProduct] = useState<Products | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/allProducts');
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (product: Products) => {
    setEditingProduct(product);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
    }
  };

  const updateProduct = async () => {
    if (editingProduct) {
      try {
        const response = await axios.put(`http://localhost:5000/api/products/updateProd/${editingProduct.ProductID}`, editingProduct);
        setProduct(prevProducts => prevProducts.map(p => (p.ProductID === editingProduct.ProductID ? response.data : p)));
        setEditingProduct(null); // Reset editing state after updating
      } catch (error) {
        console.error('Error updating product data', error);
      }
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="fixed relative sm:rounded-lg max-w-[1400px]" style={{ paddingTop: '80px', marginBottom: '50px', paddingLeft: "300px" }}>
        <table className="table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3"><span className="sr-only">Image</span></th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Old Price</th>
              <th scope="col" className="px-6 py-3">New Price</th>
              <th scope="col" className="px-6 py-3">Delete</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={product.ProductID}>
                <td className="p-4">
                {product.ProductImage && product.ProductImage.length > 0 ? (
    <img src={product.ProductImage[0]} className="border object-cover w-[150px] h-[150px] p-1" alt="Product" />
  ) : (
    <div className="border object-cover w-[150px] h-[150px] p-1 flex items-center justify-center">
      No Image Available
    </div>
  )}                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {editingProduct?.ProductID === product.ProductID ? (
                    <input
                      name="Name"
                      value={editingProduct?.Name || ''}
                      onChange={handleInputChange}
                      className="border rounded p-1"
                    />
                  ) : (
                    product.Name
                  )}
                  
                </td>
                <td className="px-6 py-4">
  {editingProduct?.ProductID === product.ProductID ? (
    <textarea
      name="Description"
      value={editingProduct?.Description || ''}
      onChange={handleInputChange}
      className="border rounded p-1"
    />
  ) : (
    product.Description
  )}
</td>
<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
  {editingProduct?.ProductID === product.ProductID ? (
    <input
      name="oldPrice"
      type="number"
      value={editingProduct?.oldPrice || ''} // Fallback to empty string
      onChange={handleInputChange}
      className="border rounded p-1"
    />
  ) : (
    product.oldPrice
  )}
</td>
<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
  {editingProduct?.ProductID === product.ProductID ? (
    <input
      name="newPrice"
      type="number"
      value={editingProduct?.newPrice || ''} // Fallback to empty string
      onChange={handleInputChange}
      className="border rounded p-1"
    />
  ) : (
    product.newPrice
  )}
</td>
                <td className="px-6 py-4">

                  <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                </td>
                <td className="px-6 py-4">
                <button onClick={() => handleEditClick(product)}>
                    <EditIcon />
                  </button>
                  <button onClick={updateProduct} className="font-medium text-green-600 dark:text-green-500 hover:underline">
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Update;
