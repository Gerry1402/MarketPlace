// src/components/News/HeaderNews.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation.jsx';
import StickyMenu from '../../lib/StickyMenu.js';
import logo from '../../assets/images/logo.png';
import { useAuthContext } from '../../auth/useAuthContext.jsx';
import { supabase } from '../../services/supabase.jsx';

const HeaderNews = ({ action }) => {
  const { user } = useAuthContext();
  const [cart, setCart] = useState([]);
  const [storeLogo, setStoreLogo] = useState(null);

  // make header sticky
  useEffect(() => {
    StickyMenu();
  }, []);

  // load cart items count
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('cart')
        .select('quantity')
        .eq('user_id', user.id);
      if (!error) {
        setCart(data);
      }
    };
    fetchCart();
  }, [user]);

  // load this user's shop (so we can show its logo)
  useEffect(() => {
    const fetchShop = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('shops')
        .select('logo_url')
        .eq('creator', user.id)
        .single();
      if (!error && data?.logo_url) {
        setStoreLogo(data.logo_url);
      }
    };
    fetchShop();
  }, [user]);

  return (
    <header className="appie-header-area appie-header-page-area appie-sticky">
      <div className="container">
        <div className="header-nav-box header-nav-box-3 header-nav-box-inner-page">
          <div className="row align-items-center">
            {/* Site logo */}
            <div className="col-lg-2 col-md-4 col-sm-5 col-6 order-1 order-sm-1">
              <div className="appie-logo-box">
                <Link to="/">
                  <img src={logo} alt="Site Logo" />
                </Link>
              </div>
            </div>

            {/* Main navigation */}
            <div className="col-lg-6 col-md-1 col-sm-1 order-3 order-sm-2">
              <div className="appie-header-main-menu">
                <Navigation />
              </div>
            </div>

            {/* Buttons and store logo */}
            <div className="col-lg-4 col-md-7 col-sm-6 col-6 order-2 order-sm-3">
              <div className="appie-btn-box text-right d-flex align-items-center justify-content-end">
                {user && storeLogo && (
                  <Link to="/YourShop" className="mr-3">
                    <img
                      src={storeLogo}
                      alt="Store Logo"
                      style={{ height: 32, borderRadius: 4 }}
                    />
                  </Link>
                )}

                {user ? (
                  <>
                    {/* Cart */}
                    <Link
                      to="/Cart/index"
                      className="main-btn ml-30"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    >
                      <i className="fal fa-shopping-cart" />
                      <span>({cart.reduce((sum, i) => sum + i.quantity, 0)})</span>
                    </Link>

                    {/* Backpack */}
                    <Link
                      to="/BackPack"
                      className="main-btn ml-30"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    >
                      <i className="fal fa-store" />
                    </Link>

                    {/* User profile */}
                    <Link to="#" className="login-btn ml-30">
                      <i className="fal fa-user" /> {user.user_metadata.display_name}
                    </Link>
                  </>
                ) : (
                  <Link to="/login" className="main-btn ml-30">
                    Login
                  </Link>
                )}

                {/* Mobile menu toggle */}
                <div
                  onClick={(e) => action(e)}
                  className="toggle-btn ml-30 canvas_open d-lg-none d-block"
                >
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
