// src/components/Product/Card.jsx
import React from "react";
import productImg from "../../assets/images/shop-grid-1.jpg";
import { Link } from "react-router-dom";

const Card = ({ cardData }) => {
  const handleError = (e) => {
    e.target.src = productImg;
  };

  return (
    <div className="single-shop-box">
      <div className="thumb text-center position-relative">
        <img
          className="appie-card-img"
          onError={handleError}
          src={cardData.images.thumbnail}
          alt={cardData.title}
        />
        <div className="reborn">
          <span>{cardData.stock > 0 ? "Sale" : "No Sale"}</span>
        </div>

        <div className="cart-list-icon">
          <ul className="cart-list-icon-list m-0 p-0 list-unstyled">
            {/* Add to Cart */}
            <li className="mx-1">
              <Link to="/Cart/index" className="icon-btn">
                <i className="fal fa-shopping-bag"></i>
              </Link>
            </li>
            {/* View Details */}
            <li className="mx-1">
              <Link to={`/shops/shop-details/${cardData.id}`} className="icon-btn">
                <i className="fal fa-eye"></i>
              </Link>
            </li>
            {/* Trade */}
            <li className="mx-1">
              <Link to="/trade" className="icon-btn">
                <i className="fal fa-exchange-alt"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="content">
        <br />
        <div>{cardData.title}</div>
        <div className="pricing">
          {cardData.discount ? (
            <>
              <span className="discount-price mr-15">
                {(Math.round(cardData.price * (1 - cardData.discount / 100) * 100) / 100).toFixed(2)}$
              </span>
              <del className="regular-price">{cardData.price}$</del>
            </>
          ) : (
            <span className="discount-price">{cardData.price}$</span>
          )}
        </div>
        {cardData.handmade && (
          <div
            className="handmade-icon"
            style={{
              display: "flex",
              alignItems: "center",
              color: "green",
              gap: "8px",
            }}
          >
            <i className="fas fa-hands" style={{ fontSize: "1rem" }}></i>
            <span>Handmade Product</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
