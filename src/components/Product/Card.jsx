import { Link } from 'react-router-dom';
import React from 'react';
import productImg from '../../assets/images/shop-grid-1.jpg';

const Card = ({ cardData, shops }) => {
    const handleError = e => {
        e.target.src = productImg;
    };
    return (
        <>
            <div className="single-shop-box">
                <div className="thumb text-center">
                    <img
                        className="appie-card-img"
                        onError={handleError}
                        src={cardData.images.thumbnail}
                        alt=""
                    />
                    <div className="reborn">
                        <span>{cardData.stock > 0 ? 'Sale' : 'No stock'}</span>
                    </div>
                    <div className="cart-list-icon">
                        <ul>
                            <li>
                                <Link to={'/Cart/index'}>
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
                    <div href="#" className="text-nowrap text-truncate">
                        <i
                            className={`fas fa-hands ${cardData.handmade ? '' : 'd-none'}`}
                            style={{ color: 'green' }}></i>{' '}
                        {cardData.title}
                    </div>
                    <div href="#" className="text-nowrap text-truncate">
                        {shops.find(shop => shop.id == cardData.shop_id)?.name || "User's product"}
                    </div>
                    <div className="pricing">
                        <div className="discount-price mr-15">
                            {Math.round(cardData.price * (1 - cardData.discount / 100) * 100) / 100}$
                        </div>
                        <div className={`regular-price ${cardData.discount == 0 ? 'd-none' : ''}`}>
                            {cardData.price}$
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
