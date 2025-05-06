import React, { useState, useEffect } from "react";
import slide1 from "../../assets/images/ecomerce1.jpg";
import slide2 from "../../assets/images/ecomerce2.png";
import slide3 from "../../assets/images/ecomerce3.png";

const HeroHomeOne = ({ className }) => {
  const slides = [slide1, slide2, slide3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(iv);
  }, [slides.length]);

  // Estilo para cada línea
  const lineStyle = {
    display: "inline-block",
    backgroundColor: "#1c2f5f",  // azul oscuro
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    margin: "0.25rem 0",
    fontSize: "2rem",
    lineHeight: 1.2,
  };

  return (
    <section className={`appie-hero-area ${className || ""}`}>
      <div className="hero-slides">
        {slides.map((img, i) => (
          <div
            key={i}
            className={`slide ${i === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
      <div className="hero-overlay">
        <h2 style={{ margin: 0 }}>
          <span style={lineStyle}>
            Everything you need with
          </span>
          <br />
          <span style={lineStyle}>
            just one CLICK
          </span>
        </h2>
        <p style={{ color: "#fff", marginTop: "1rem" }}>
          Visit our website for more information!
        </p>
        <a
          href="#equipo"
          className="main-btn"
          style={{
            color: "#fff",
            borderColor: "#fff",
            marginTop: "1.5rem",
          }}
        >
          VIEW
        </a>
      </div>
    </section>
  );
};

export default HeroHomeOne;
