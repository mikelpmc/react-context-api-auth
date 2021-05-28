import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../../providers/authProvider';
import './index.css';

const Header = () => {
    const { onLogout } = useAuthDispatch();
    const { isLoggedIn } = useAuthState();

    return (
        <header>
            <nav>
                <ul className="navbar">
                    <li className="navbar__item">
                        <Link to="/">Landing</Link>
                    </li>
                    {isLoggedIn ? (
                        <Fragment>
                            <li className="navbar__item">
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="navbar__item navbar__item--right">
                                <button type="button" onClick={onLogout}>
                                    Logout
                                </button>
                            </li>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <li className="navbar__item navbar__item--right">
                                <Link to="/register">Register</Link>
                            </li>
                            <li className="navbar__item">
                                <Link to="/login">Login</Link>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
