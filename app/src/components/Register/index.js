import React from 'react';
import { withRouter } from 'react-router-dom';

import withState from './../../utils/withState';

const Register = ({ store, actions }) => {
    return (
        <React.Fragment>
            {store.error && <p>{store.error}!</p>}

            <form onSubmit={actions.onRegister}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    value={store.name}
                    name="name"
                    onChange={e => actions.handleChange(e)}
                />
                <br />

                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    value={store.email}
                    name="email"
                    onChange={e => actions.handleChange(e)}
                />
                <br />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    value={store.password}
                    name="password"
                    onChange={e => actions.handleChange(e)}
                />
                <br />

                <input type="submit" value="Register" />
            </form>
        </React.Fragment>
    );
};

export default withRouter(withState(Register));
