"use client"
import React, { useState } from 'react';

const CarouselIndicators = ({ images, activeIndex, onClick }) => {
    return (
      <div className="carousel__indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`carousel__indicator ${
              index === activeIndex ? 'active' : ''
            }`}
            onClick={() => onClick(index)}
          />
        ))}
      </div>
    );
  };
const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    'https://via.placeholder.com/800x400/ff5733/fff',
    'https://via.placeholder.com/800x400/33ff57/fff',
    'https://via.placeholder.com/800x400/5733ff/fff',
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="carousel">
      <button onClick={prevSlide} className="carousel__btn carousel__btn--prev">
        &lt;
      </button>
      <img
        src={images[activeIndex]}
        alt={`Slide ${activeIndex}`}
        className="carousel__img"
      />
      <button onClick={nextSlide} className="carousel__btn carousel__btn--next">
        &gt;
      </button>
    </div>
  );
};
export default Carousel;