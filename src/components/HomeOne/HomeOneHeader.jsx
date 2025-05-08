// src/components/HomeOneHeader.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo7 from '../../assets/images/logo-7.png';
import logo from '../../assets/images/logo.png';
import StickyMenu from '../../lib/StickyMenu.js';
import Navigation from '../Navigation.jsx';
import { useAuthContext } from '../../auth/useAuthContext.jsx';
import { supabase } from '../../services/supabase.jsx';

const HomeOneHeader = ({
  lang,
  darkEnable = false,
  action,
  langEnabled = false,
  changeMode,
  changeModeLan,
  dark,
  className,
}) => {
  const { user } = useAuthContext();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    StickyMenu();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('cart')
        .select('quantity')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error al obtener el carrito:', error);
        return;
      }

      setCart(data);
    };

    fetchCart();
  }, [user]);

  return (
    <header className={`appie-header-area appie-sticky ${className || ''}`}>
      <div className="container">
        <div className="header-nav-box">
          <div className="row align-items-center">

            {/* Logo */}
            <div className="col-lg-2 col-md-4 col-sm-5 col-6 order-1 order-sm-1">
              <div className="appie-logo-box">
                {darkEnable && dark ? (
                  <Link to="/"><img src={logo7} alt="Logo" /></Link>
                ) : (
                  <Link to="/"><img src={logo} alt="Logo" /></Link>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-1 col-sm-1 order-3 order-sm-2">
              <div className="appie-header-main-menu">
                <Navigation />
              </div>
            </div>
            <div className="col-lg-4 col-md-7 col-sm-6 col-6 order-2 order-sm-3">
              <div className="appie-btn-box text-right">

                {darkEnable && (
                  dark ? (
                    <span className="dark__btn__sun" onClick={changeMode}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707
                             M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707
                             M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  ) : (
                    <span className="dark__btn__mon" onClick={changeMode}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M20.354 15.354A9 9 0 018.646 3.646
                             9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </span>
                  )
                )}

                {langEnabled && (
                  lang ? (
                    <span className="ml-3" onClick={changeModeLan}>RTL</span>
                  ) : (
                    <span className="mr-3" onClick={changeModeLan}>LTR</span>
                  )
                )}

                {user ? (
                  <>
                    <Link
                      to="/Cart/index"
                      className="main-btn ml-30"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <i className="fal fa-shopping-cart" />
                      <span>({cart.reduce((sum, i) => sum + i.quantity, 0)})</span>
                    </Link>
                    <Link
                      to="/BackPack"
                      className="main-btn ml-30"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <i className="fal fa-store" />
                    </Link>
                    <Link to="#" className="login-btn ml-30">
                      <i className="fal fa-user" /> {user.user_metadata.display_name}
                    </Link>
                  </>
                ) : (
                  <Link to="/login" className="main-btn ml-30">
                    Login
                  </Link>
                )}
                <div
                  onClick={action}
                  className="toggle-btn ml-30 canvas_open d-lg-none d-block"
                >
                  <i className="fa fa-bars" />
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeOneHeader;
