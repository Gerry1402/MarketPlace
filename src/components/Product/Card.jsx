import { Link } from 'react-router-dom';
import React from 'react';
import productImg from '../../assets/images/shop-grid-1.jpg';

const Card = ({ cardData }) => {
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
                        <span>{cardData.stock > 0 ? 'Sale' : 'No Sale'}</span>
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
                        {cardData.title}
                    </div>
                    <div className="pricing">
                        {cardData.discount ? (
                            <>
                                <div className="discount-price mr-15">
                                    {Math.round(cardData.price * (1 - cardData.discount / 100) * 100) / 100}$
                                </div>
                                <div className="regular-price">{cardData.price}$</div>
                            </>
                        ) : (
                            <div className="discount-price">{cardData.price}$</div>
                        )}
                    </div>
                    <div
                        className={`${
                            cardData.handmade ? '' : 'invisible'
                        } handmade-icon green d-flex align-items-center justify-content-center gap-2 mt-2`}>
                        <i className="fas fa-hands" style={{ fontSize: '1rem' }}></i>
                        <span>Handmade Product</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
