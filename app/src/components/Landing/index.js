import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <React.Fragment>
            <h1>Landing</h1>
            <Link to="/register">Register</Link> <Link to="/login">Login</Link>
        </React.Fragment>
    );
};

export default Landing;
