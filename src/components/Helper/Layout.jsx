import React from "react";
import ScrollToTop from "./ScrollToTop.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <ScrollToTop />
            <Outlet />
        </>
    );
};

export default Layout;
