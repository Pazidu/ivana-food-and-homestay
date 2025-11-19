import React, { useEffect, useRef, useState } from "react";
import "./Slidebar.css";
import ivanafront from "../../Assets/ivanaFront.jpg";
import image1 from "../../Assets/images.jpeg";
import image2 from "../../Assets/image2.jpg";
import image3 from "../../Assets/image3.jpg";

const images = [ivanafront, image1, image2, image3];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const trackRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    if (index === images.length) {
      setIsTransitioning(false);
      setIndex(0);
    } else {
      setIsTransitioning(true);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50); // Quick re-enable of transition
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  return (
    <div className="fullscreen-carousel">
      <div
        ref={trackRef}
        className="carousel-track"
        style={{
          transform: `translateX(${-index * 100}%)`,
          transition: isTransitioning ? "transform 0.8s ease-in-out" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {images.map((img, i) => (
          <div key={i} className="carousel-slide">
            <img src={img} alt={`Slide ${i}`} />
          </div>
        ))}
        <div className="carousel-slide">
          <img src={images[0]} alt="Slide 0 Clone" />
        </div>
      </div>

      <div className="carouselindicators-">
        {images.map((_, i) => (
          <span
            key={i}
            className={`indicator ${
              index % images.length === i ? "active" : ""
            }`}
            onClick={() => {
              setIsTransitioning(true);
              setIndex(i);
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
