import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import withState from './../utils/withState';

import PrivateRoute from './../utils/PrivateRoute';

import Header from './Header/';
import Dashboard from './Dashboard/';
import Landing from './Landing/';
import Login from './Login/';
import Register from './Register/';
import NotFound from './NotFound/';

class App extends Component {
    componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            if (this.props.store.error !== '') {
                this.props.actions.clearErrors();
            }
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        const {
            store: { isLoggedIn }
        } = this.props;

        return (
            <div className="App">
                <Header />

                <Switch>
                    <Route exact path="/" component={Landing} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <Route
                        path="/login"
                        render={() =>
                            isLoggedIn ? (
                                <Redirect to="/dashboard" />
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        render={() =>
                            isLoggedIn ? (
                                <Redirect to="/dashboard" />
                            ) : (
                                <Register />
                            )
                        }
                    />

                    <NotFound />
                </Switch>
            </div>
        );
    }
}

export default withRouter(withState(App));
