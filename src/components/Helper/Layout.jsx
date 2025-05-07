import { Outlet } from 'react-router-dom';
import React from 'react';
import ScrollToTop from './ScrollToTop.jsx';

const Layout = () => {
    return (
        <>
            <ScrollToTop />
            <Outlet />
        </>
    );
};

export default Layout;
