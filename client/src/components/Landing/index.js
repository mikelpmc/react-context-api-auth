import React from 'react';
import { Link } from 'react-router-dom';

import withState from './../../utils/withState';

import './index.css';

const Landing = ({ store }) => {
    return (
        <div className="landing">
            <h1 className="landing__title">React Context API Auth Demo</h1>

            {!store.isLoggedIn ? (
                <React.Fragment>
                    <Link to="/login" className="landing__button">
                        Login
                    </Link>

                    <Link to="/register" className="landing__button">
                        Register
                    </Link>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <p>Welcome back!</p>
                    <Link to="/dashboard" className="landing__button">
                        Go to Dashboard
                    </Link>
                </React.Fragment>
            )}
        </div>
    );
};

export default withState(Landing);
