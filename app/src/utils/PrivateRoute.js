import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from './../context/';

class PrivateRoute extends Component {
    render() {
        const { component: Component, ...rest } = this.props;

        return (
            <AuthConsumer>
                {context => (
                    <Route
                        render={props =>
                            context.state.isLoggedIn ? (
                                <Component {...props} />
                            ) : (
                                <Redirect to="/" />
                            )
                        }
                        {...rest}
                    />
                )}
            </AuthConsumer>
        );
    }
}

export default PrivateRoute;
