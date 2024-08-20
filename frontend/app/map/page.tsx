"use client"
import 'leaflet/dist/leaflet.css';
import React from "react"
import {MapContainer , TileLayer} from "react-leaflet"
import "./map.css"

const Map: React.FC=()=>{
        
return (
  <div className='map'>
  <MapContainer center={[33.892166,9.561555499999997]} style={{ height: '30rem', width: '30%'}} zoom={10} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

  </MapContainer>
  </div>
)
}
export default Map