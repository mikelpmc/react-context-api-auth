import React from 'react';
import { withRouter } from 'react-router-dom';

import withState from './../../utils/withState';

const Login = ({ store, actions }) => {
    return (
        <React.Fragment>
            {store.error && <p>{store.error}</p>}

            <form onSubmit={actions.onLogin}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    value={store.email || ''}
                    name="email"
                    onChange={e => actions.handleChange(e)}
                />
                <br />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    value={store.password || ''}
                    name="password"
                    onChange={e => actions.handleChange(e)}
                />
                <br />

                <input type="submit" value="Login" />
            </form>
        </React.Fragment>
    );
};

export default withRouter(withState(Login));
