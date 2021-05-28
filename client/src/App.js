import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from './providers/authProvider';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing/landing';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound/notFound';

const App = () => {
    const { onClearErrors } = useAuthDispatch();
    const { isLoggedIn, error } = useAuthState();

    const history = useHistory();

    useEffect(() => {
        const unlisten = history.listen(() => {
            error && onClearErrors();
        });

        return () => unlisten();
    }, [error]);

    return (
        <main className="App">
            <Header />
            <Switch>
                <Route exact path="/" component={Landing} />
                <PrivateRoute path="/dashboard" redirectTo="/">
                    <Dashboard />
                </PrivateRoute>
                <Route
                    path="/login"
                    render={() =>
                        isLoggedIn ? <Redirect to="/dashboard" /> : <Login />
                    }
                />
                <Route
                    path="/register"
                    render={() =>
                        isLoggedIn ? <Redirect to="/dashboard" /> : <Register />
                    }
                />
                <NotFound />
            </Switch>
        </main>
    );
};

export default App;
