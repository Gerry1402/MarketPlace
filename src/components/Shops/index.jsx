import React, { useEffect, useState } from "react";
import productImg from "../../assets/images/shop-grid-1.jpg";
import useToggle from "../../Hooks/useToggle.js";
import BackToTop from "../BackToTop.jsx";
import FooterHomeOne from "../HomeOne/FooterHomeOne.jsx";
import Drawer from "../Mobile/Drawer.jsx";
import HeaderNews from "../News/HeaderNews.jsx";
import HeroNews from "../News/HeroNews.jsx";
import Card from "../Product/Card.jsx";
import SideBarFilter from "./SideBarFilter.jsx";
import supabase from "../Service/supabase.jsx";

const Shops = () => {
  const [drawer, drawerAction] = useToggle(false);
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      const { data, error } = await supabase.from("shops").select("*");

      if (error) {
        console.error("Error al obtener las tiendas:", error);
        return;
      }

      console.log("Tiendas:", data);
      setShops(data);
    };

    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products1").select("*");

      if (error) {
        console.error("Error al obtener los productos:", error);
        return;
      }

      console.log("Productos:", data);
      setProducts(data);
    };

    fetchShops();
    fetchProducts();
  }, []);

  return (
    <>
      <Drawer drawer={drawer} action={drawerAction.toggle} />
      <HeaderNews action={drawerAction.toggle} />
      <HeroNews
        title="Shop Products"
        breadcrumb={[
          { link: "/", title: "Home" },
          { link: "/shops", title: "Shop Products" },
        ]}
      />
      <div className="appie-shop-grid-area pt-100 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 order-2 order-lg-1">
              <SideBarFilter />
            </div>
            <div className="col-lg-9 order-1 order-lg-2">
              <div className="shop-grid-topbar d-flex justify-content-between align-items-center">
                <span>
                  Showing all <span>{products.length}</span> results
                </span>
                <select id="shops">
                  {shops && shops.length > 0 ? (
                    shops.map((shop) => (
                      <option key={shop.id} value={shop.name}>
                        {shop.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No hay tiendas</option>
                  )}
                </select>
              </div>
              <div className="row">
                {products && products.length > 0 ? (
                  products.map((value) => (
                    <div className="col-lg-4 col-md-6">
                      <Card cardData={value} />
                    </div>
                  ))
                ) : (
                  <div>No hay productos</div>
                )}
                <div className="col-lg-12">
                  <div className="bisylms-pagination">
                    <span className="current">1</span>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a className="next" href="#">
                      next
                      <i className="fal fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterHomeOne />
      <BackToTop />
    </>
  );
};

export default Shops;
