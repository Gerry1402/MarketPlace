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
import { Link } from "react-router-dom";

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

  const updateQuantity = async (itemId, newQuantity) => {
    const item = cart.find((i) => i.id === itemId);
    if (!item) return;

    const currentQuantity = item.quantity;
    const quantityDiff = newQuantity - currentQuantity;
    const productId = item.product.id;
    const currentStock = item.product.stock;

    const newStock = currentStock - quantityDiff;
    if (newStock < 0) {
      alert("No hay suficiente stock disponible.");
      return;
    }

    const stockUpdate = await supabase
      .from("products")
      .update({ stock: newStock })
      .eq("id", productId);

    if (stockUpdate.error) {
      console.error("Error actualizando el stock:", stockUpdate.error);
      return;
    }

    if (newQuantity <= 0) {
      const { error } = await supabase.from("cart").delete().eq("id", itemId);
      if (error) {
        console.error("Error eliminando del carrito:", error);
      } else {
        setCart((prev) => prev.filter((i) => i.id !== itemId));
      }
    } else {
      const { error } = await supabase
        .from("cart")
        .update({ quantity: newQuantity })
        .eq("id", itemId);
      if (error) {
        console.error("Error actualizando el carrito:", error);
      } else {
        setCart((prev) =>
          prev.map((i) =>
            i.id === itemId
              ? {
                  ...i,
                  quantity: newQuantity,
                  product: { ...i.product, stock: newStock },
                }
              : i,
          ),
        );
      }
    }
  };

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
              <div className="col-lg-12" key={item.id}>
                <div className="appie-blog-item-3 appie-blog-item-8 mt-30">
                  <div className="thumb">
                    <img src={blog4} alt="" />
                  </div>
                  <div className="content">
                    <h5 className="title">
                      {item.product?.title || "Producto desconocido"}
                    </h5>
                    <div className="meta-item">
                      <ul>
                        <li>
                          <p>Price: ${item.product?.price}</p>
                        </li>
                        <li>
                          <p>Stock: {item.product?.stock}</p>
                        </li>
                      </ul>
                    </div>

                    <div className="shop-buttons d-block d-sm-flex align-items-center">
                      <div className="product-quantity" id="quantity">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          type="button"
                          className="sub"
                        >
                          -
                        </button>

                        <input
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (!isNaN(value)) {
                              updateQuantity(item.id, value);
                            }
                          }}
                          type="text"
                          value={item.quantity}
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          type="button"
                          className="add"
                        >
                          +
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
        </div>
      </section>
    </>
  );
};

export default Cart;
