import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from '../../providers/authProvider';

const PrivateRoute = ({ children, redirectTo, ...rest }) => {
    const { isLoggedIn } = useAuthState();

    return (
        <Route
            {...rest}
            render={() =>
                isLoggedIn ? children : <Redirect to={redirectTo} />
            }
        />
    );
};

export default PrivateRoute;
