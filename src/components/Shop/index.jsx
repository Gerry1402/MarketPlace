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
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [categories, setCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 21;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const fetchProducts = async (shopId = null) => {
    const { data, error } = shopId
      ? await supabase.from("products").select("*").eq("shop_id", shopId)
      : await supabase.from("products").select("*");

    if (error) {
      console.error("Error al obtener los productos:", error.message || error);
      return;
    }

    console.log("Productos:", data);

    setProducts(data);
    setCurrentPage(1);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      console.error("Error al obtener las categorias:", error.message || error);
      return;
    }

    console.log("Categorías:", data);

    setCategories(data);
  };

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

    fetchShops();
    fetchProducts();
    fetchCategories();
  }, []);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleShopChange = (e) => {
    const selectedId = e.target.value;
    setSelectedShopId(selectedId);
    console.log("Selected shop ID:", selectedId);
    fetchProducts(selectedId);
  };

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
              <div className="appie-shop-sidebar">
                <div className="shop-category-widget">
                  <h4 className="title">Product Categories</h4>
                  <ul>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <a
                          href="#"
                          onClick={() => handleCategoryFilter(category.id)}
                        >
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-9 order-1 order-lg-2">
              <div className="shop-grid-topbar d-flex justify-content-between align-items-center">
                <span>
                  Showing all <span>{products.length}</span> results
                </span>
                <select id="shops" onChange={handleShopChange}>
                  <option value="">All Shops</option>
                  {shops && shops.length > 0 ? (
                    shops.map((shop) => (
                      <option key={shop.id} value={shop.id}>
                        {shop.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No hay tiendas</option>
                  )}
                </select>
              </div>
              <div className="row">
                {currentProducts && currentProducts.length > 0 ? (
                  currentProducts.map((value) => (
                    <div className="col-lg-4 col-md-6">
                      <Card cardData={value} />
                    </div>
                  ))
                ) : (
                  <div>No hay productos</div>
                )}

                <div className="col-lg-12">
                  <div className="bisylms-pagination">
                    {[...Array(totalPages)].map((_, index) => (
                      <a
                        key={index}
                        href="#"
                        className={currentPage === index + 1 ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageClick(index + 1);
                        }}
                      >
                        {index + 1}
                      </a>
                    ))}
                    {currentPage < totalPages && (
                      <a
                        className="next"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNextPage();
                        }}
                      >
                        next <i className="fal fa-arrow-right"></i>
                      </a>
                    )}
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
