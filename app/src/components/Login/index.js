import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import withState from './../../utils/withState';

import './index.css';

const Login = ({ store, actions }) => {
    return (
        <div className="login">
            <h1 className="login__title">Login</h1>

            {store.error && <p className="login__error">{store.error}</p>}

            <form className="login__form" onSubmit={actions.onLogin}>
                <input
                    type="text"
                    value={store.email || ''}
                    name="email"
                    onChange={e => actions.handleChange(e)}
                    placeholder="Enter your email"
                />
                <br />

                <input
                    type="password"
                    value={store.password || ''}
                    name="password"
                    onChange={e => actions.handleChange(e)}
                    placeholder="Enter your password"
                />
                <br />

                <button className="login__button" type="submit">
                    Login
                </button>
                <Link to="/register">Register</Link>
            </form>
        </div>
    );
};

export default withRouter(withState(Login));
