import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import productImg from '../../assets/images/shop-grid-1.jpg';
import { useAuthContext } from '../../auth/useAuthContext.jsx';
import { supabase } from '../../services/supabase.jsx';

const Card = ({ cardData }) => {
    const { user } = useAuthContext();
    const [quantity, setQuantity] = useState(1);

    const handleError = e => {
        e.target.src = productImg;
    };

    const addCart = async () => {
        if (!cardData || quantity <= 0) {
            return;
        }

        if (quantity > cardData.stock) {
            alert('No hay suficiente stock disponible.');
            return;
        }

        if (!user) {
            alert('Por favor, inicia sesión para agregar productos al carrito.');
            return;
        }

        const { data: cartItems, error: cartError } = await supabase
            .from('cart')
            .select('quantity')
            .eq('product_id', cardData.id)
            .eq('user_id', user.id);

        if (cartError) {
            console.error('Error al verificar el carrito:', cartError);
            return;
        }

        let totalQuantityInCart = 0;
        if (cartItems.length > 0) {
            totalQuantityInCart = cartItems.reduce((total, item) => total + item.quantity, 0);
        }

        if (quantity + totalQuantityInCart > cardData.stock) {
            alert('No hay suficiente stock disponible.');
            return;
        }

        const addToCart = async () => {
            if (cartItems.length > 0) {
                const { data, error } = await supabase
                    .from('cart')
                    .update({
                        quantity: totalQuantityInCart + quantity,
                    })
                    .eq('product_id', cardData.id)
                    .eq('user_id', user.id);

                if (error) {
                    console.error('Error al actualizar el carrito:', error);
                    return;
                }
            } else {
                const { data, error } = await supabase
                    .from('cart')
                    .insert([
                        {
                            product_id: cardData.id,
                            quantity,
                            user_id: user.id,
                        },
                    ])
                    .select('*');

                if (error) {
                    console.error('Error al agregar producto al carrito:', error);
                    return;
                }
            }

            const newStock = cardData.stock - quantity;

            if (newStock < 0) {
                alert('No hay suficiente stock disponible.');
                return;
            }

            const { data: updatedProduct, error: stockError } = await supabase
                .from('products')
                .update({ stock: newStock })
                .eq('id', cardData.id)
                .select('*');

            if (stockError) {
                console.error('Error actualizando el stock del producto:', stockError);
                return;
            }

            console.log('Producto actualizado con stock:', updatedProduct);

            window.dispatchEvent(new Event('cartUpdated'));
        };

        addToCart();
    };
    return (
        <>
              <Link
                to={`/shops/shop-details/${cardData.id}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  textDecoration: 'none'
                }}
            >
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
                                    <Link>
                                        <button
                                            onClick={addCart}
                                            style={{ background: 'none', border: 'none' }}>
                                            <i className="fal fa-shopping-bag"></i>
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="content">
                        <br />
                        <div className="text-nowrap text-truncate text-dark">{cardData.title}</div>
                        <div className="pricing">
                            {cardData.discount ? (
                                <>
                                    <div className="discount-price mr-15">
                                        {Math.round(cardData.price * (1 - cardData.discount / 100) * 100) /
                                            100}
                                        $
                                    </div>
                                    <div className="regular-price">{cardData.price}$</div>
                                </>
                            ) : (
                                <div className="discount-price">{cardData.price}$</div>
                            )}
                        </div>
                        <div
                            style={{ color: 'green' }}
                            className={`${
                                cardData.handmade ? '' : 'invisible'
                            } handmade-icon green d-flex align-items-center justify-content-center gap-2 mt-2`}>
                            <i className="fas fa-hands" style={{ fontSize: '1rem' }}></i>
                            <span>Handmade Product</span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default Card;
