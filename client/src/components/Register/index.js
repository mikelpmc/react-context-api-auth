import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import withState from './../../utils/withState';

import './index.css';

const Register = ({ store, actions }) => {
    return (
        <div className="register">
            <h1 className="register__title">Register</h1>

            {store.error && <p className="register__error">{store.error}!</p>}

            <form className="register__form" onSubmit={actions.onRegister}>
                <input
                    type="text"
                    value={store.name}
                    name="name"
                    onChange={e => actions.handleChange(e)}
                    placeholder="Enter your name"
                />
                <br />

                <input
                    type="text"
                    value={store.email}
                    name="email"
                    onChange={e => actions.handleChange(e)}
                    placeholder="Enter your email"
                />
                <br />

                <input
                    type="password"
                    value={store.password}
                    name="password"
                    onChange={e => actions.handleChange(e)}
                    placeholder="Enter your password"
                />
                <br />

                <button className="register__button" type="submit">
                    Register
                </button>
                <Link to="/login">Login</Link>
            </form>
        </div>
    );
};

export default withRouter(withState(Register));
