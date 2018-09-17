import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AuthConsumer } from './../context/';
import PrivateRoute from './../utils/PrivateRoute';

import Header from './Header/';
import Dashboard from './Dashboard/';
import Landing from './Landing/';
import Login from './Login/';
import Register from './Register/';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />

                <Switch>
                    <AuthConsumer>
                        {context => (
                            <React.Fragment>
                                <Route exact path="/" component={Landing} />
                                <PrivateRoute
                                    path="/dashboard"
                                    component={Dashboard}
                                />
                                <Route
                                    path="/login"
                                    render={() =>
                                        context.state.isLoggedIn ? (
                                            <Redirect to="/dashboard" />
                                        ) : (
                                            <Login />
                                        )
                                    }
                                />
                                <Route
                                    path="/register"
                                    render={() =>
                                        context.state.isLoggedIn ? (
                                            <Redirect to="/dashboard" />
                                        ) : (
                                            <Register />
                                        )
                                    }
                                />
                            </React.Fragment>
                        )}
                    </AuthConsumer>
                </Switch>
            </div>
        );
    }
}

export default App;
