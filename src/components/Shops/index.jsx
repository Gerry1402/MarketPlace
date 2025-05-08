import { Col, Container, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { fetchTable, supabase } from '../../services/supabase.jsx';

import Accordion from 'react-bootstrap/Accordion';
import BackToTop from '../BackToTop.jsx';
import Card from '../Product/Card.jsx';
import Drawer from '../Mobile/Drawer.jsx';
import FooterHomeOne from '../HomeOne/FooterHomeOne.jsx';
import HeaderNews from '../News/HeaderNews.jsx';
import HeroNews from '../News/HeroNews.jsx';
import SideBarFilter from './SideBarFilter.jsx';
import productImg from '../../assets/images/shop-grid-1.jpg';
import useToggle from '../../Hooks/useToggle.js';

const Shops = () => {
    const [drawer, drawerAction] = useToggle(false);
    const [products, setProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [shops, setShops] = useState(null);
    const [categories, setCategories] = useState(null);
    const [filters, setFilters] = useState([
        { name: 'Categories', value: [] },
        { name: 'Materials', value: [] },
        { name: 'Colors', value: [] },
        { name: 'Sizes', value: [] },
        { name: 'Sources', value: [] },
        { name: 'Targets', value: [] },
        { name: 'Sustainability', value: [] },
    ]);

    const [selectedFilters, setSelectedFilters] = useState({
        categories: new Set(),
        shops: new Set(),
        materials: new Set(),
        colors: new Set(),
        sizes: new Set(),
        sources: new Set(),
        targets: new Set(),
        sustainability: new Set(),
        handmade: null,
    });
    const [selectedShopId, setSelectedShopId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 24;
    const totalPages = Math.ceil(products.length / productsPerPage);

    useEffect(() => {
        const fetchFilters = async () => {
            const resolvedFilters = await Promise.all(
                filters.map(async item => ({
                    name: item?.name ?? '',
                    value: item?.name ? await fetchTable(item.name.toLowerCase()) : null,
                }))
            );
            setFilters(resolvedFilters);
        };

        fetchTable('products').then(setProducts);
        fetchTable('categories').then(setCategories);
        fetchTable('shops').then(setShops);
        fetchFilters();
        setCurrentProducts(
            products.slice(productsPerPage * (currentPage - 1), productsPerPage * currentPage)
        );
    }, []);
    let allProducts = fetchTable('products').then(data => (allProducts = data));

    useEffect(() => {
        setCurrentProducts(
            products.slice(productsPerPage * (currentPage - 1), productsPerPage * currentPage)
        );
    }, [currentPage, products]);

    const handlePageClick = pageNum => {
        if (pageNum >= 1 && totalPages >= pageNum) {
            setCurrentPage(pageNum);
        }
    };

    const handleShopChange = e => {
        const shopId = e.target.value;

        if (shopId === 'undefined') {
            setSelectedShopId(undefined);
            setProducts(allProducts.filter(product => product.shop_id === null));
        } else if (shopId === '') {
            setSelectedShopId(null);
            setProducts(allProducts);
        } else {
            setSelectedShopId(shopId);
            setProducts(allProducts.filter(product => product.shop_id == shopId));
        }

        handlePageClick(1); // Reset to the first page
    };

    const handleChangeFilters = (filterType, filterValue, add) => {
        if (!add) {
            setSelectedFilters({
                ...selectedFilters,
                [filterType]: selectedFilters[filterType].delete(filterValue),
            });
        } else {
            setSelectedFilters({
                ...selectedFilters,
                [filterType]: selectedFilters[filterType].add(filterValue),
            });
        }
    };

    return (
        <>
            <Drawer drawer={drawer} action={drawerAction.toggle} />
            <HeaderNews action={drawerAction.toggle} />
            <HeroNews
                title="Shop Products"
                breadcrumb={[
                    { link: '/', title: 'Home' },
                    { link: '/shops', title: 'Shop Products' },
                ]}
            />
            <div className="appie-shop-grid-area pt-100 pb-50">
                <Container>
                    <Row>
                        <Col lg="3" className="order-2 order-lg-1">
                            <div className="appie-shop-sidebar">
                                <Accordion>
                                    {filters &&
                                        filters.map((filter, i) => (
                                            <Accordion.Item eventKey={i} key={i}>
                                                <Accordion.Header>{filter.name}</Accordion.Header>
                                                <Accordion.Body>
                                                    {filter.value?.map(item => (
                                                        <p key={item.id}>{item.name}</p>
                                                    ))}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                </Accordion>
                            </div>
                        </Col>
                        <Col lg="9" className="order-1 order-lg-2">
                            <div className="shop-grid-topbar d-flex justify-content-between align-items-center">
                                <span>
                                    Showing all <span>{products.length}</span> results
                                </span>
                                <select id="shops" onChange={handleShopChange}>
                                    <option value="">All Shops</option>
                                    <option value="undefined">Only Users (no shop)</option>
                                    {shops && shops.length > 0 ? (
                                        shops.map(shop => (
                                            <option key={shop.id} value={shop.id}>
                                                {shop.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No hay tiendas</option>
                                    )}
                                </select>
                            </div>
                            <Row>
                                {currentProducts &&
                                    currentProducts.map(data => (
                                        <Col lg="4" md="6" key={data.id}>
                                            <Card cardData={data} shops={shops} />
                                            {/* <Card cardData={data} /> */}
                                        </Col>
                                    ))}

                                <div className="col-lg-12">
                                    <div className="bisylms-pagination">
                                        <a
                                            className={currentPage != 1 ? '' : 'pe-none'}
                                            href="#"
                                            onClick={e => {
                                                e.preventDefault();
                                                handlePageClick(currentPage - 1);
                                            }}>
                                            <i className="fal fa-arrow-left"></i>
                                        </a>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <a
                                                key={index}
                                                href="#"
                                                className={currentPage === index + 1 ? 'active' : ''}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    handlePageClick(index + 1);
                                                }}>
                                                {index + 1}
                                            </a>
                                        ))}

                                        <a
                                            className={currentPage != totalPages ? '' : 'pe-none'}
                                            href="#"
                                            onClick={e => {
                                                e.preventDefault();
                                                handlePageClick(currentPage + 1);
                                            }}>
                                            <i className="fal fa-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <FooterHomeOne />
            <BackToTop />
        </>
    );
};

export default Shops;
