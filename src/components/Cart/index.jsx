import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/supabase.jsx';
import HeaderNews from '../News/HeaderNews.jsx';
import Drawer from '../Mobile/Drawer.jsx';
import useToggle from '../../Hooks/useToggle.js';
import { useAuthContext } from '../../auth/useAuthContext.jsx';

const Cart = ({ value, action }) => {
    const [cart, setCart] = useState([]);
    const [drawer, drawerAction] = useToggle(false);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchCart = async () => {
            if (!user) return;
            const { data, error } = await supabase
                .from('cart')
                .select('*, product:products(*)')
                .eq('user_id', user.id);

            if (error) {
                console.error('Error al obtener el carrito:', error);
                return;
            }

            setCart(data);
        };

        fetchCart();
    }, [user]);

    const updateQuantity = async (itemId, newQuantity) => {
        const item = cart.find(i => i.id === itemId);
        if (!item) return;

        const currentQuantity = item.quantity;
        const quantityDiff = newQuantity - currentQuantity;
        const productId = item.product.id;
        const currentStock = item.product.stock;
        const newStock = currentStock - quantityDiff;

        if (newStock < 0) {
            alert('No hay suficiente stock disponible.');
            return;
        }
        const stockUpdate = await supabase
            .from('products')
            .update({ stock: newStock })
            .eq('id', productId);

        if (stockUpdate.error) {
            console.error('Error actualizando el stock:', stockUpdate.error);
            return;
        }

        if (newQuantity <= 0) {
            const { error } = await supabase.from('cart').delete().eq('id', itemId);
            if (error) {
                console.error('Error eliminando del carrito:', error);
            } else {
                setCart(prev => prev.filter(i => i.id !== itemId));
                window.dispatchEvent(new Event('cartUpdated'));
            }
        } else {
            const { error } = await supabase.from('cart').update({ quantity: newQuantity }).eq('id', itemId);
            if (error) {
                console.error('Error actualizando el carrito:', error);
            } else {
                setCart(prev =>
                    prev.map(i =>
                        i.id === itemId
                            ? { ...i, quantity: newQuantity, product: { ...i.product, stock: newStock } }
                            : i
                    )
                );
                window.dispatchEvent(new Event('cartUpdated2'));
            }
        }
    };

    const deleteItem = async itemId => {
        const item = cart.find(i => i.id === itemId);
        if (!item) return;

        const productId = item.product.id;
        const currentStock = item.product.stock;
        const quantityToRestore = item.quantity;

        const { error: stockError } = await supabase
            .from('products')
            .update({ stock: currentStock + quantityToRestore })
            .eq('id', productId);

        if (stockError) {
            console.error('Error restaurando el stock:', stockError);
            return;
        }

        const { error: deleteError } = await supabase.from('cart').delete().eq('id', itemId);
        if (deleteError) {
            console.error('Error eliminando del carrito:', deleteError);
            return;
        }

        setCart(prev => prev.filter(i => i.id !== itemId));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const total = cart.reduce((acc, item) => {
        const basePrice = item.product?.price || 0;
        const discount = item.product?.discount || 0;
        const finalPrice = basePrice * (1 - discount / 100);
        return acc + item.quantity * finalPrice;
    }, 0);

    return (
        <>
            <Drawer drawer={drawer} action={drawerAction.toggle} />
            <HeaderNews action={drawerAction.toggle} />
            <section
                className="appie-blog-3-area appie-blog-8-area pt-90 pb-100"
                style={{ paddingTop: '150px' }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="appie-section-title text-center">
                                <h3 className="appie-title">Shopping Cart</h3>
                            </div>
                        </div>
                    </div>

                    {cart.length > 0 ? (
                        cart.map(item => (
                            <div className="col-lg-12" key={item.id}>
                                <div className="appie-blog-item-3 appie-blog-item-8 mt-30">
                                    <div className="thumb">
                                        <img src={item.product?.images.thumbnail} alt="" />
                                    </div>
                                    <div className="content">
                                        <h5 className="title">{item.product?.title}</h5>
                                        <div className="meta-item">
                                            <ul>
                                                <li>
                                                    <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        {item.product.discount ? (
                                                            <>
                                                                <span className="discount-price">
                                                                    {Math.round(
                                                                        item.product.price *
                                                                            (1 - item.product.discount / 100) *
                                                                            100
                                                                    ) / 100}
                                                                    $
                                                                </span>
                                                                <span
                                                                    className="regular-price"
                                                                    style={{ textDecoration: 'line-through', color: '#888' }}
                                                                >
                                                                    {item.product.price}$
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span className="discount-price">
                                                                {item.product.price}$
                                                            </span>
                                                        )}
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>Stock: {item.product?.stock}</p>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="shop-buttons d-block d-sm-flex align-items-center">
                                            <div className="product-quantity" id="quantity">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    type="button"
                                                    className="sub"
                                                >
                                                    -
                                                </button>

                                                <input
                                                    onChange={e => {
                                                        const value = parseInt(e.target.value, 10);
                                                        if (!isNaN(value)) {
                                                            updateQuantity(item.id, value);
                                                        }
                                                    }}
                                                    type="text"
                                                    value={item.quantity}
                                                />

                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    type="button"
                                                    className="add"
                                                >
                                                    +
                                                </button>

                                                <button
                                                    onClick={() => deleteItem(item.id)}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        color: '#dc3545',
                                                        cursor: 'pointer',
                                                        fontSize: '18px',
                                                    }}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading cart...</p>
                    )}

                    <div
                        style={{
                            position: 'fixed',
                            bottom: 20,
                            right: 20,
                            backgroundColor: '#a3a3a3',
                            borderRadius: '8px',
                            padding: '12px 24px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            zIndex: 9999,
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                        }}
                    >
                        <h5 style={{ margin: 0 }}>Total:</h5>
                        <h5 style={{ margin: 0 }}>${total.toFixed(2)}</h5>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;
