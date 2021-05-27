import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import 'normalize.css';
import './index.css';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import AuthProvider from './provider/';

ReactDOM.render(
    <AuthProvider>
        <Router>
            <App />
        </Router>
    </AuthProvider>,
    document.getElementById('root')
);

registerServiceWorker();
