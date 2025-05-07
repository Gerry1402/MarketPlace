import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <Link to="/shops">Shops</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </>
    );
};

export default Navigation;
