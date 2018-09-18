import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import withState from './../utils/withState';

import PrivateRoute from './../utils/PrivateRoute';

import Header from './Header/';
import Dashboard from './Dashboard/';
import Landing from './Landing/';
import Login from './Login/';
import Register from './Register/';

class App extends Component {
    render() {
        const {
            store: { isLoggedIn }
        } = this.props;

        return (
            <div className="App">
                <Header />

                <Switch>
                    <React.Fragment>
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
                    </React.Fragment>
                </Switch>
            </div>
        );
    }
}

export default withState(App);
