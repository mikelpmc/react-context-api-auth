import React from 'react';
import { Link } from 'react-router-dom';

import withState from './../../utils/withState';

const Header = ({ store, actions }) => {
    return (
        <header>
            <nav>
                <Link to="/">Landing</Link>{' '}
                {store.isLoggedIn ? (
                    <React.Fragment>
                        <Link to="/dashboard">Dashboard</Link>{' '}
                        <button onClick={actions.onLogout}>Logout</button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Link to="/register">Register</Link>{' '}
                        <Link to="/login">Login</Link>
                    </React.Fragment>
                )}
            </nav>
        </header>
    );
};

export default withState(Header);
