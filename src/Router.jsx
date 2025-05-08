import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AboutUs from './components/AboutUs/index.jsx';
import AboutUsTwo from './components/AboutUs/AboutUsTwo.jsx';
import Cart from './components/Cart/index.jsx';
import Contact from './components/Contact/index.jsx';
import CreateProduct from './components/Products/CreateProduct.jsx';
import Error from './components/Error/index.jsx';
import HomeDark from './components/HomeDark/index.jsx';
import HomeEight from './components/HomeEight/index.jsx';
import HomeFive from './components/HomeFive/index.jsx';
import HomeFour from './components/HomeFour/index.jsx';
import HomeOne from './components/HomeOne/index.jsx';
import HomeRtl from './components/HomeRtl/index.jsx';
import HomeSeven from './components/HomeSeven/index.jsx';
import HomeSix from './components/HomeSix/index.jsx';
import HomeThree from './components/HomeThree/index.jsx';
import HomeTwo from './components/HomeTwo/index.jsx';
import Layout from './components/Helper/Layout.jsx';
import Login from './components/Auth/Login.jsx';
import MessageInbox from './components/Products/MessageInbox.jsx';
import News from './components/News/index.jsx';
import Products from './components/Products/index.jsx';
import Service from './components/Service/index.jsx';
import ShopDetails from './components/Products/Details.jsx';
import SignUp from './components/Auth/SignUp.jsx';
import SingleNews from './components/News/SingleNews.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                index: true,
                element: <HomeOne />,
            },
            {
                path: '/home-two',
                element: <HomeTwo />,
            },
            {
                path: '/home-three',
                element: <HomeThree />,
            },
            {
                path: '/home-four',
                element: <HomeFour />,
            },
            {
                path: '/home-five',
                element: <HomeFive />,
            },
            {
                path: '/home-six',
                element: <HomeSix />,
            },
            {
                path: '/home-seven',
                element: <HomeSeven />,
            },
            {
                path: '/home-eight',
                element: <HomeEight />,
            },
            {
                path: '/home-dark',
                element: <HomeDark />,
            },
            {
                path: '/home-rtl',
                element: <HomeRtl />,
            },
            {
                path: '/news',
                element: <News />,
            },
            {
                path: '/news/single-news',
                element: <SingleNews />,
            },
            {
                path: '/service',
                element: <Service />,
            },
            {
                path: '/about-us',
                element: <AboutUs />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
                path: '/error',
                element: <Error />,
            },
            {
                path: '/about-us-another',
                element: <AboutUsTwo />,
            },
            {
                path: '/products',
                element: <Products />,
            },
            {
                path: '/products/product-details',
                element: <ShopDetails />,
            },
            {
                path: '/products/product-details/:idProduct',
                element: <ShopDetails />,
            },
            {
                path: '/Cart/index',
                element: <Cart />,
            },
            { path: 'inbox', element: <MessageInbox /> },
            {
                path: 'backpack',
                element: <CreateProduct />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '*',
                element: <Error />,
            },
        ],
    },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
