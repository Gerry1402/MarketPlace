import React, { useState } from "react";
import cart1 from "../../assets/images/cart-1.jpg";
import cart2 from "../../assets/images/cart-2.jpg";
import blog4 from "../../assets/images/blog-4.jpg";
import blog5 from "../../assets/images/blog-5.jpg";
import blog6 from "../../assets/images/blog-6.jpg";
import blog7 from "../../assets/images/blog-7.jpg";
import shape5 from "../../assets/images/shape/5.png";
import shape12 from "../../assets/images/shape/shape-12.png";
import { useEffect } from "react";
import supabase from "../Service/supabase.jsx";

const Cart = ({ value, action }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const { data, error } = await supabase
        .from("cart")
        .select("*, product:products(*)");

      if (error) {
        console.error("Error al obtener el carrito:", error);
        return;
      }

      console.log("Carrito:", data);
      setCart(data);
    };

    fetchCart();
  }, []);
  return (
    <>
      <section className="appie-blog-3-area appie-blog-8-area pt-90 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="appie-section-title text-center">
                <h3 className="appie-title">Shopping Cart</h3>
              </div>
            </div>
          </div>
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <div className="row" key={item.id}>
                <div className="col-8">
                  <h5>{item.product?.name || "Producto desconocido"}</h5>
                  <p>Price: ${item.product?.price}</p>
                  <p>Stock: {item.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading cart...</p>
          )}
          <div className="row">
            <div className="col-lg-12">
              <div className="appie-blog-item-3 appie-blog-item-8 mt-30">
                <div className="thumb">
                  <img src={blog4} alt="" />
                </div>
                <div className="content">
                  <h5 className="title">
                    <a href="/news/single-news">
                      How to Improve Your App Store Position
                    </a>
                  </h5>
                  <div className="meta-item">
                    <ul>
                      <li>
                        <i className="fal fa-clock"></i> July 14, 2022
                      </li>
                      <li>
                        <i className="fal fa-comments"></i> July 14, 2022
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="appie-blog-item-3 appie-blog-item-8 mt-30">
                <div className="thumb">
                  <img src={blog5} alt="" />
                </div>
                <div className="content">
                  <h5 className="title">
                    <a href="/news/single-news">
                      Introducing New App Design for our iOS App
                    </a>
                  </h5>
                  <div className="meta-item">
                    <ul>
                      <li>
                        <i className="fal fa-clock"></i> July 14, 2022
                      </li>
                      <li>
                        <i className="fal fa-comments"></i> July 14, 2022
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="appie-blog-item-3 appie-blog-item-8 mt-30">
                <div className="thumb">
                  <img src={blog6} alt="" />
                </div>
                <div className="content">
                  <h5 className="title">
                    <a href="#">
                      Engineering job is Becoming More interesting.
                    </a>
                  </h5>
                  <div className="meta-item">
                    <ul>
                      <li>
                        <i className="fal fa-clock"></i> July 14, 2022
                      </li>
                      <li>
                        <i className="fal fa-comments"></i> July 14, 2022
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="blog-btn text-center mt-60">
                <a className="main-btn" href="#">
                  View All Posts <i className="fal fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="appie-blog-8-shape-1">
          <img src={shape5} alt="" />
        </div>
        <div className="appie-blog-8-shape-2">
          <img src={shape12} alt="" />
        </div>
      </section>
      <div className="amm-shopping-cart-wrapper">
        <div className={`amm-shopping-cart-canvas ${value ? "open" : ""}`}>
          <div className="amm-shopping_cart">
            <div className="amm-shopping_cart-top-bar d-flex justify-content-between">
              <h6>Shopping Cart</h6>
              <button
                type="button"
                onClick={action}
                className="amm-shopping-cart-close"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="amm-shopping_cart-list-items mt-30">
              <ul>
                <li>
                  <div className="amm-single-shopping-cart media">
                    <div className="cart-image">
                      <img src={cart1} alt="Cart" />
                    </div>
                    <div className="cart-content media-body pl-15">
                      <h6>
                        <a href="#">Banana</a>
                      </h6>
                      <span className="quality">QTY: 01</span>
                      <span className="price">$205.00</span>
                      <a className="remove" href="#">
                        <i className="fa fa-times"></i>
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="amm-single-shopping-cart media">
                    <div className="cart-image">
                      <img src={cart2} alt="Cart" />
                    </div>
                    <div className="cart-content media-body pl-15">
                      <h6>
                        <a href="#">Grape</a>
                      </h6>
                      <span className="quality">QTY: 01</span>
                      <span className="price-discount">$205.00</span>
                      <span className="price-close">$205.00</span>
                      <a className="remove" href="#">
                        <i className="fa fa-times"></i>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="amm-shopping_cart-btn">
              <div className="total pt-35 d-flex justify-content-between">
                <h5>Subtotal:</h5>
                <p>$240.00</p>
              </div>
              <div className="cart-btn pt-25">
                <a className="main-btn" href="#">
                  View Cart
                </a>
                <a className="main-btn main-btn-2" href="#">
                  Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={`overlay ${value ? "open" : ""}`}></div>
      </div>
    </>
  );
};

export default Cart;
