import React from "react";
import productImg from "../../assets/images/shop-grid-1.jpg";
import { Link } from "react-router-dom";

const Card = ({ cardData }) => {
  // console.log(cardData);
  const handleError = (e) => {
    e.target.src = productImg;
  };
  return (
    <>
      <div className="single-shop-box">
        <div className="thumb text-center">
          <img
            className="appie-card-img"
            onError={handleError}
            src={cardData.image}
            alt=""
          />
          <div className="reborn">
            <span>Sale</span>
          </div>
          <div className="cart-list-icon">
            <ul>
              <li>
                <Link to={"/Cart/index"}>
                  <i className="fal fa-shopping-bag"></i>
                </Link>
              </li>
              <li>
                <Link to={`/shops/shop-details/${cardData.id}`}>
                  <i className="fal fa-eye"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="content">
          <br />
          <div href="#">{cardData.name}</div>
          <div className="pricing">
            <div className="discount-price">$100{cardData.price} </div>
            <div className="regular-price">$180.00</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
