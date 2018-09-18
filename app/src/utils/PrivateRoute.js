import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import withState from './withState';

class PrivateRoute extends Component {
    render() {
        const {
            store: { isLoggedIn },
            component: Component,
            redirectTo = '/',
            ...rest
        } = this.props;

        return (
            <Route
                render={props =>
                    isLoggedIn ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={redirectTo} />
                    )
                }
                {...rest}
            />
        );
    }
}

export default withState(PrivateRoute);
