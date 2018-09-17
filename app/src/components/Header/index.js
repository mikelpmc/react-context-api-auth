import React from 'react';
import { Link } from 'react-router-dom';

import { AuthConsumer } from './../../context/';

const Header = () => {
    return (
        <header>
            <AuthConsumer>
                {context => (
                    <nav>
                        <Link to="/">Landing</Link>{' '}
                        {context.state.isLoggedIn ? (
                            <React.Fragment>
                                <Link to="/dashboard">Dashboard</Link>{' '}
                                <button onClick={context.onLogout}>
                                    Logout
                                </button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Link to="/register">Register</Link>{' '}
                                <Link to="/login">Login</Link>
                            </React.Fragment>
                        )}
                    </nav>
                )}
            </AuthConsumer>
        </header>
    );
};

export default Header;
