import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import productImg from '../../assets/images/shop-grid-1.jpg';
import { supabase } from '../../services/supabase.jsx';
import { useAuthContext } from '../../auth/useAuthContext.jsx';

const Card = ({ cardData, shops }) => {
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
                    .select();

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
                .select();

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
        <Link
            to={`/shops/shop-details/${cardData.id}`}
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                textDecoration: 'none',
            }}>
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
                                <button onClick={addCart} style={{ background: 'none', border: 'none' }}>
                                    <i className="fal fa-shopping-bag"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="content">
                    <br />
                    <div href="#" className="text-nowrap text-truncate text-dark">
                        <i
                            className={`fas fa-hands ${cardData.handmade ? '' : 'd-none'}`}
                            style={{ color: 'green' }}></i>{' '}
                        {cardData.title}
                    </div>
                    <div href="#" className="text-nowrap text-truncate text-dark">
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
        </Link>
    );
};

export default Card;
