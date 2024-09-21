"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
interface Product{
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
const Barr: React.FC = () => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

  const [products, setProducts] = useState<Product[]>([]);
  const [prodNames, setProdNames] = useState<string[]>([]);
  const [prodPrices, setProdPrices] = useState<number[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<{ productCategory: string; productCount: number }[]>([]);

  useEffect(() => {
    fetchData();
    fetchCategoryCounts('someCategory'); // Ensure you pass a valid category
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:5000/api/products/allProducts')
      .then((result) => {
        setProducts(result.data);
        makeMyChart(result.data);
      })
      .catch((err) => { console.log(err); });
  };

  const fetchCategoryCounts = (productCategory: string) => {
    axios.get(`http://localhost:5000/api/products/count/${productCategory}`)
      .then((result) => {
        console.log(result.data); // Log the response to see the structure
        setCategoryCounts(result.data); // Ensure this is an array
      })
      .catch((err) => { console.log(err); });
  };
  

  const makeMyChart = (products: Product[]) => {
    const names: string[] = [];
    const prices: number[] = [];
    products.forEach(product => {
      names.push(product.Name);
      prices.push(product.newPrice || 0);
    });
    setProdNames(names);
    setProdPrices(prices);
  };

  const data = {
    labels: prodNames,
    datasets: [{
      label: 'Products Prices',
      data: prodPrices,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 1,
    }],
  };

  const categoryData = {
    labels: categoryCounts.map(category => category.productCategory),
    datasets: [{
      label: 'Product Counts by Category',
      data: categoryCounts.map(category => category.productCount),
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    }],
  };
  return (
    <div>
      <div className='flex justify-center rounded gap-x-72'>
        <div style={{ padding: '20px', width: '80%' }}>
          <h1 className='text-lg mb-8 font-extrabold'>Evolution of Prices</h1>
          {prodNames.length > 0 && <div style={{ height: '400px', width: '100%' }}>
            <Bar data={data} options={options} />
          </div>}
         <h1 className='text-lg mb-8 font-extrabold'>Product Counts by Category</h1>
          {categoryCounts.length > 0 ? (
            <div style={{ height: '400px', width: '100%' }}>
              <Bar data={categoryData} options={options} />
            </div>
          ) : (
            <p>No data available for categories.</p> // Optional: Message when no data
          )}
        </div>
      </div>
    </div>
  );
};

export default Barr;

