import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import Navigation from '../Navigation.jsx';
import StickyMenu from '../../lib/StickyMenu.js';
import logo from '../../assets/images/logo.png';
import { useAuthContext } from '../../auth/useAuthContext.jsx';

const HeaderNews = ({ action }) => {
    const { user } = useAuthContext();
    // console.log(`User: ${user}`);
    useEffect(() => {
        StickyMenu();
    });
    return (
        <header className="appie-header-area appie-header-page-area appie-sticky">
            <div className="container">
                <div className="header-nav-box header-nav-box-3 header-nav-box-inner-page">
                    <div className="row align-items-center">
                        <div className="col-lg-2 col-md-4 col-sm-5 col-6 order-1 order-sm-1">
                            <div className="appie-logo-box">
                                <a href="/">
                                    <img src={logo} alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-1 col-sm-1 order-3 order-sm-2">
                            <div className="appie-header-main-menu">
                                <Navigation />
                            </div>
                        </div>
                        <div className="col-lg-4  col-md-7 col-sm-6 col-6 order-2 order-sm-3">
                            <div className="appie-btn-box text-right">
                                <Link to="/Cart/index" className="login-btn">
                                    <i
                                        className="fal fa-shopping-cart"
                                        style={{
                                            fontSize: '18px',
                                            marginRight: '5px',
                                        }}></i>
                                    <span style={{ fontWeight: 'bold', marginRight: '20px' }}>$0.00</span>
                                </Link>
                                {/* <a href="#" className="login-btn">
                  </a> */}
                                {user ? (
                                    <a className="login-btn" href="#">
                                        <i className="fal fa-user"></i> {user.user_metadata.display_name}
                                    </a>
                                ) : (
                                    <a className="main-btn ml-30" href="#">
                                        Login
                                    </a>
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
