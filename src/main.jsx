import './assets/css/bootstrap.min.css';
import './assets/css/custom-animated.css';
import './assets/css/default.css';
import './assets/css/font-awesome.min.css';
import './assets/css/magnific-popup.css';
import './assets/css/magnific.dark.css';
import './assets/css/magnific.rtl.css';
import './assets/css/main.css';
import './assets/css/style.css';

import App from './App.jsx';
import Auth from './auth/Auth.jsx';
import { Provider } from './auth/Provider.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider>
            <App />
        </Provider>
    </React.StrictMode>
);
