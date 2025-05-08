import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Layout from '../components/Helper/Layout';
import Loader from '../components/Helper/Loader';
import { useAuthContext } from './useAuthContext';

const Auth = () => {
    const { user } = useAuthContext();

    return user ? (
        <Layout>
            <Outlet />
        </Layout>
    ) : (
        <Navigate to="/auth/signin" replace />
    );
};
export default Auth;
