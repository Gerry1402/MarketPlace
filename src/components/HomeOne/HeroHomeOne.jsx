import React, { useState, useEffect } from "react";
// import heroThumbOne from "../../assets/images/hero-thumb-1.png";
// import heroThumbTwo from "../../assets/images/hero-thumb-2.png";
// import shapeTwo from "../../assets/images/shape/shape-2.png";
// import shapeThree from "../../assets/images/shape/shape-3.png";
// import shapeFour from "../../assets/images/shape/shape-4.png";

import slide1 from "../../assets/images/cesar.jpg";
import slide2 from "../../assets/images/oriol.jpg";
import slide3 from "../../assets/images/gerard.jpg"

const HeroHomeOne = ({ className }) => {
    // 1) Array de imágenes y estado para la slide actual
    const slides = [slide1, slide2, slide3];
    const [current, setCurrent] = useState(0);
  
    // 2) Efecto para avanzar la slide cada 5 segundos
    useEffect(() => {
      const iv = setInterval(() => {
        setCurrent((c) => (c + 1) % slides.length);
      }, 5000);
      return () => clearInterval(iv);
    }, [slides.length]);
  
    return (
      <section className={`appie-hero-area ${className || ""}`}>
        {/* Slider de fondos */}
        <div className="hero-slides">
          {slides.map((img, i) => (
            <div
              key={i}
              className={`slide ${i === current ? "active" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
  
        {/* Overlay con texto y botón */}
        <div className="hero-overlay">
          <h2>Nuestro equipo</h2>
          <p>Somos un grupo de profesionales dedicados a…</p>
          <a href="#equipo" className="main-btn">
            Conócenos
          </a>
        </div>
  
        {/* Contenedor adicional (si necesitas más contenido sobre el slider) */}
        <div className="container">
          {/* … resto de tu JSX … */}
        </div>
      </section>
    );
  };
  
  export default HeroHomeOne;