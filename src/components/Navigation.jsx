import { Link } from 'react-router-dom';
import React from 'react';

const Navigation = () => {
    return (
        <>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </>
    );
};

export default Navigation;
