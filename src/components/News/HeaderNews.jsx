import React, { useEffect, useState } from 'react';
import { signOut, supabase } from '../../services/supabase.jsx';

import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation.jsx';
import StickyMenu from '../../lib/StickyMenu.js';
import logo from '../../assets/images/logo.png';
import { useAuthContext } from '../../auth/useAuthContext.jsx';

const HeaderNews = ({ action }) => {
    const { user } = useAuthContext();
    const [cart, setCart] = useState([]);

    const fetchCart = useCallback(async () => {
        if (!user) return;
        const { data, error } = await supabase.from('cart').select('quantity').eq('user_id', user.id);
        if (!error) setCart(data);
    }, [user]);

    useEffect(() => {
        StickyMenu();
        fetchCart();
    }, [fetchCart]);

    useEffect(() => {
        const onCartUpdated = () => {
            fetchCart();
        };
        window.addEventListener('cartUpdated', onCartUpdated);
        return () => {
            window.removeEventListener('cartUpdated', onCartUpdated);
        };
    }, [fetchCart]);

    return (
        <header className="appie-header-area appie-header-page-area appie-sticky">
            <div className="container">
                <div className="header-nav-box header-nav-box-3 header-nav-box-inner-page">
                    <div className="row align-items-center">
                        <div className="col-lg-2 col-md-4 col-sm-5 col-6 order-1 order-sm-1">
                            <div className="appie-logo-box">
                                <Link to="/">
                                    <img src={logo} alt="Site Logo" />
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-1 col-sm-1 order-3 order-sm-2">
                            <div className="appie-header-main-menu">
                                <Navigation />
                            </div>
                        </div>
                        <div className="col-lg-4  col-md-7 col-sm-6 col-6 order-2 order-sm-3">
                            <div className="appie-btn-box text-right d-flex align-items-center">
                                {user ? (
                                    <>
                                        <Link
                                            to="/Cart/index"
                                            className="main-btn ml-30"
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                            <i className="fal fa-shopping-cart" />
                                            <span>({cart.reduce((sum, i) => sum + i.quantity, 0)})</span>
                                        </Link>
                                        <Link
                                            to="/BackPack"
                                            className="main-btn ml-30"
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                            <i className="fal fa-store" />
                                        </Link>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary">
                                                <i className="fal fa-user"></i>{' '}
                                                {user.user_metadata.display_name}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">
                                                    Shops & Products
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </>
                                ) : (
                                    <Link to="/login" className="main-btn ml-30">
                                        Login
                                    </Link>
                                )}
                                <div
                                    onClick={e => action(e)}
                                    className="toggle-btn ml-30 canvas_open d-lg-none d-block">
                                    <i className="fa fa-bars"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderNews;
