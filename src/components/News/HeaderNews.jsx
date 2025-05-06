// src/components/News/HeaderNews.jsx
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo7 from "../../assets/images/logo-7.png";
import logo from "../../assets/images/logo.png";
import StickyMenu from "../../lib/StickyMenu.js";
import Navigation from "../Navigation.jsx";

const HeaderNews = ({ action, showChat }) => {
  const location = useLocation();

  useEffect(() => {
    StickyMenu();
  }, []);

  // Mostrar el icono de bandeja solo en /shops
  const showInboxIcon = location.pathname.startsWith("/shops");

  return (
    <header className="appie-header-area appie-sticky">
      <div className="container">
        <div className="header-nav-box">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-lg-2 col-md-4 col-sm-5 col-6 order-1 order-sm-1">
              <div className="appie-logo-box">
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
            </div>

            {/* Navegación */}
            <div className="col-lg-6 col-md-1 col-sm-1 order-3 order-sm-2">
              <div className="appie-header-main-menu">
                <Navigation />
              </div>
            </div>

            {/* Botones */}
            <div className="col-lg-4 col-md-7 col-sm-6 col-6 order-2 order-sm-3">
              <div className="appie-btn-box text-right">
                {/* Icono de Mensajes (solo en shops) */}
                {showInboxIcon && (
                  <Link to="/inbox" className="mr-3">
                    <i className="fal fa-envelope fs-5" />
                  </Link>
                )}

                {/* Icono de Mochila */}
                <Link to="/backpack" className="mr-3">
                  <i className="fal fa-backpack fs-5" />
                </Link>

                {/* Login */}
                <Link to="/login" className="login-btn">
                  <i className="fal fa-user me-1" /> Login
                </Link>

                {/* Get Started */}
                <Link to="/contact" className="main-btn ml-30">
                  Get Started
                </Link>

                {/* Toggle mobile */}
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

export default HeaderNews;
