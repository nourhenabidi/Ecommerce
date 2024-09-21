"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';  
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import Sidebar from "../sideBar/page";
import ChartBar from "../charts/bar";

// import ChartBar from "../charts/chart";



const Dashboard: React.FC = () => {
  const [prodlength, setProdLength] = useState<number | null>(null);
  const [clientlength, setClientLength] = useState<number | null>(null);

  async function fetchCarLength() {
    try {
      const response = await axios.get('http://localhost:5000/api/products/getlengthProd');
      setProdLength(response.data.rowCount);
    } catch (error) {
      console.error('Error fetching car length:', error);
    }
  }

  async function fetchClientLength() {
    try {
      const response = await axios.get('http://localhost:5000/api/users/getlength');
      setClientLength(response.data.rowCount);
    } catch (error) {
      console.error('Error fetching client length:', error);
    }
  }

  useEffect(() => {
    fetchCarLength();
    fetchClientLength();
  }, []);

  return (
    <div>
      <Sidebar />
      
      <div className="flex-1 p-4 ml-[300px] " >
        <Typography variant="h2" fontWeight="bold" style={{ color: '#000080' }}>
          Welcome to your Dashboard
        </Typography>
        
        <div className="grid grid-cols-2 gap-6 p-10" >
          {/* General Report and Line Chart */}
          <div className="grid grid-cols-2 gap-6">
            {/* Item Sales */}
            <Box className="p-4 bg-white rounded-md shadow-md transition transform hover:scale-105">
              <TimeToLeaveIcon color="primary" />
              <div className="flex items-center">
                <Typography variant="h4" fontWeight="bold">
                  {prodlength !== null ? prodlength : 'Data not available'}
                </Typography>
              </div>
              <Typography variant="h6" gutterBottom>
                Products
              </Typography>
            </Box>

            {/* Clients */}
            <Box className="p-4 bg-white rounded-md shadow-md transition transform hover:scale-105">
              <PersonAddOutlinedIcon color="primary" />
              <Typography variant="h4" fontWeight="bold">
                {clientlength !== null ? clientlength : 'Data not available'}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Clients
              </Typography>
            </Box>
          </div>

          
          <div className="col-span-2">
          <ChartBar />
          </div>
         
        </div>
        <div>
          
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
