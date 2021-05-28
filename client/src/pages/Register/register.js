import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../../providers/authProvider';
import './index.css';

const Register = () => {
    const { onUpdate, onRegister } = useAuthDispatch();
    const { name, email, password, error } = useAuthState();

    return (
        <div className="register">
            <h1 className="register__title">Register</h1>
            {error && <p className="register__error">{error}!</p>}
            <form
                className="register__form"
                onSubmit={e => {
                    e.preventDefault();
                    onRegister();
                }}
            >
                <input
                    type="text"
                    value={name}
                    name="name"
                    onChange={onUpdate}
                    placeholder="Enter your name"
                />
                <br />
                <input
                    type="text"
                    value={email}
                    name="email"
                    onChange={onUpdate}
                    placeholder="Enter your email"
                />
                <br />
                <input
                    type="password"
                    value={password}
                    name="password"
                    onChange={onUpdate}
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

export default Register;
