import { Col, Container, Row } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { signOut, supabase } from '../../services/supabase.jsx';

import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation.jsx';
import StickyMenu from '../../lib/StickyMenu.js';
import logo from '../../assets/images/logo.png';
import { useAuthContext } from '../../auth/useAuthContext.jsx';

const HeaderNews = ({ action, updateCart }) => {
    const { user } = useAuthContext();
    const [cart, setCart] = useState([]);

    const fetchCart = useCallback(async () => {
        if (!user) {
            return;
        }
        const { data, error } = await supabase.from('cart').select('*').eq('user_id', user.id);
        if (!error) {
            setCart(data);
        }
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
            <Container>
                <div className="header-nav-box header-nav-box-3 header-nav-box-inner-page">
                    <Row className="align-items-center">
                        <Col lg="2" md="4" sm="5" className="col-6 order-1 order-sm-1">
                            <div className="appie-logo-box">
                                <Link to="/">
                                    <img src={logo} alt="Site Logo" />
                                </Link>
                            </div>
                        </Col>

                        <Col lg="6" md="1" sm="1" className="order-3 order-sm-2">
                            <div className="appie-header-main-menu">
                                <Navigation />
                            </div>
                        </Col>
                        <Col lg="4" md="7" sm="6" className="col-6 order-2 order-sm-3">
                            <div className="appie-btn-box text-right d-flex align-items-center justify-content-end">
                                {user ? (
                                    <div className="d-flex align-items-center gap-3">
                                        <Link
                                            to="/Cart/index"
                                            className="btn d-flex align-items-center gap-1 btn-primary">
                                            <i className="fal fa-shopping-cart" />
                                            <span>({cart.reduce((sum, i) => sum + i.quantity, 0)})</span>
                                        </Link>
                                        <Link to="/BackPack" className="btn btn-primary">
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
                                    </div>
                                ) : (
                                    <div className="d-flex align-items-center gap-3">
                                        <Link
                                            to="/login"
                                            className="btn d-flex align-items-center gap-1 btn-primary">
                                            Login
                                        </Link>
                                        <Link to="/signup" className="btn btn-primary text-nowrap">
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                                <div
                                    onClick={e => action(e)}
                                    className="toggle-btn ml-30 canvas_open d-lg-none d-block">
                                    <i className="fa fa-bars"></i>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </header>
    );
};

export default HeaderNews;
