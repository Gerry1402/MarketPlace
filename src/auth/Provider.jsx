import { useEffect, useState } from 'react';

import { Context } from './Context';
import PropTypes from 'prop-types';
import { supabaseAuth } from './../services/supabase';

const checkUser = async () => {
    const {
        data: { session },
    } = await supabaseAuth.auth.getSession();
    setUser(session?.user || null);
};

export const Provider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Revisar sesión activa
        const checkUser = async () => {
            const {
                data: { session },
            } = await supabaseAuth.auth.getSession();
            setUser(session?.user || null);
        };

        checkUser();

        // Escuchar cambios en la sesión
        const { data: listener } = supabaseAuth.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return <Context.Provider value={{ user }}>{children}</Context.Provider>;
};

Provider.propTypes = {
    children: PropTypes.node,
};
