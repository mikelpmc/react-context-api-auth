import React from 'react';
import { withRouter } from 'react-router-dom';

import { AuthConsumer } from './../../context/';

const Register = () => {
    return (
        <AuthConsumer>
            {context => (
                <React.Fragment>
                    {context.state.error && <p>{context.state.error}!</p>}

                    <form onSubmit={context.onRegister}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            value={context.state.name}
                            name="name"
                            onChange={e => context.handleChange(e)}
                        />
                        <br />
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            value={context.state.email}
                            name="email"
                            onChange={e => context.handleChange(e)}
                        />
                        <br />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            value={context.state.password}
                            name="password"
                            onChange={e => context.handleChange(e)}
                        />
                        <br />
                        <input type="submit" value="Register" />
                    </form>
                </React.Fragment>
            )}
        </AuthConsumer>
    );
};

export default withRouter(Register);
