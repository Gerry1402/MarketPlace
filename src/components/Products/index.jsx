import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { fetchTable, supabase } from '../../services/supabase.jsx';

import Accordion from 'react-bootstrap/Accordion';
import BackToTop from '../BackToTop.jsx';
import Card from './Card.jsx';
import Drawer from '../Mobile/Drawer.jsx';
import FooterHomeOne from '../HomeOne/FooterHomeOne.jsx';
import HeaderNews from '../News/HeaderNews.jsx';
import HeroNews from '../News/HeroNews.jsx';
import SideBarFilter from './SideBarFilter.jsx';
import productImg from '../../assets/images/shop-grid-1.jpg';
import useToggle from '../../Hooks/useToggle.js';

const Products = () => {
    const [drawer, drawerAction] = useToggle(false);
    const [products, setProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [shops, setShops] = useState(null);
    const [categories, setCategories] = useState(null);
    const [filters, setFilters] = useState([
        { name: 'categories', value: [], table:"single", key:"category_id"},
        { name: 'materials', value: [], table:"multiple", key:"material_id"},
        { name: 'colors', value: [], table:"single", key:"color_id"},
        { name: 'sizes', value: [], table:"single", key:"size_id"},
        { name: 'sources', value: [], table:"multiple", key:"source_id"},
        { name: 'targets', value: [], table:"multiple", key:"target_id"},
        { name: 'sustainability', value: [], table:"multiple", key:"sustainability_id"},
        { name: 'conditions', value: [], table:"multiple", key:"condition_id"},
    ]);
    
    const shop = useRef(null);
    const [selectedFilters, setSelectedFilters] = useState({
        multiple: {
            "product-material": new Set(),
            "product-source": new Set(),
            "product-target": new Set(),
            "product-sustainability": new Set(),
            "product-condition": new Set(),
        },
        single :{
            category_id: new Set(),
            color_id: new Set(),
            size_id: new Set(),
        }
    });
    const [selectedShopId, setSelectedShopId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 24;
    const totalPages = Math.ceil(products.length / productsPerPage);

    useEffect(() => {
        const fetchFilters = async () => {
            const resolvedFilters = await Promise.all(
                filters.map(async item => ({
                    name: item?.name ?? '',
                    value: item?.name ? await fetchTable(item.name) : null,
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

    const handleChangeFilters = (filterType, filterValue) => {
        const valueFilter = selectedFilters[filterType];

        if (valueFilter.has(filterValue)) {
            valueFilter.delete(filterValue);
        } else {
            valueFilter.add(filterValue);
        }

        setSelectedFilters({
            ...selectedFilters,
            [filterType]: valueFilter,
        });
    };

    const handleApplyFilters = () => {
        
        setCurrentProducts(filteredProducts);
        handlePageClick(1);
    };

    return (
        <>
            <Drawer drawer={drawer} action={drawerAction.toggle} />
            <HeaderNews action={drawerAction.toggle} />
            <HeroNews
                title={shop.current?.options[shop.current?.selectedIndex]?.text}
                breadcrumb={[
                    { link: '/', title: 'Home' },
                    { link: '/products', title: 'All Shops' },
                ]}
            />
            <div className="appie-shop-grid-area pt-100 pb-50">
                <Container>
                    <Row>
                        <Col lg="3" className="order-2 order-lg-1">
                            <div className="appie-shop-sidebar">
                                <ButtonGroup className='w-100' aria-label="Basic example">
                                    <Button onClick={handleApplyFilters} variant="primary" className='w-100'>Apply Filter</Button>
                                    <Button variant="primary"><i className="fas fa-trash-alt"></i></Button>
                                </ButtonGroup>
                                <Accordion>
                                    {filters &&
                                        filters.map((filter, i) => (
                                            <Accordion.Item eventKey={i} key={i}>
                                                <Accordion.Header>
                                                    {filter.name.charAt(0).toUpperCase() +
                                                        filter.name.slice(1)}
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <fieldset>
                                                        {filter.value?.map(item => (
                                                            <p key={item.id}>
                                                                <label>
                                                                    <input
                                                                        type="checkbox"
                                                                        name={filter.name}
                                                                        value={item.id}
                                                                        onChange={() =>
                                                                            handleChangeFilters(
                                                                                filter.name,
                                                                                item.id
                                                                            )
                                                                        }
                                                                        defaultChecked={
                                                                            selectedFilters[
                                                                                filter.name
                                                                            ]?.has?.(item.id) || false
                                                                        }
                                                                    />{' '}
                                                                    {item.name}
                                                                </label>
                                                            </p>
                                                        ))}
                                                    </fieldset>
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
                                <select id="shops" ref={shop} onChange={handleShopChange}>
                                    <option value="">All Shops</option>
                                    <option value="undefined">Only Users (no shop)</option>
                                    {shops && shops.length > 0 ? (
                                        shops.map(shop => (
                                            <option key={shop.id} value={shop.id} data-name={shop.name}>
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

export default Products;
