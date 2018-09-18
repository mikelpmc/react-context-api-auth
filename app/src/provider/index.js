import React, { Component } from 'react';

import logic from './../logic/';

export const Context = React.createContext();

class AuthProvider extends Component {
    state = {
        isLoggedIn: logic.isLoggedIn(),
        user: {},
        name: '',
        email: '',
        password: '',
        error: ''
    };

    get actions() {
        return {
            handleChange: this.handleChange,
            onRegister: this.onRegister,
            onLogin: this.onLogin,
            onLogout: this.onLogout,
            retrieveUser: this.retrieveUser,
            clearErrors: this.clearErrors
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onRegister = e => {
        e.preventDefault();

        const { name, email, password } = this.state;

        logic
            .register(name, email, password)
            .then(() => {
                this.setState({
                    isRegistered: true
                });
            })
            .catch(({ message }) => {
                this.setState({
                    error: message
                });
            });
    };

    onLogin = e => {
        e.preventDefault();

        const { email, password } = this.state;

        logic
            .login(email, password)
            .then(() => {
                this.setState({
                    isLoggedIn: true,
                    email: '',
                    name: '',
                    password: ''
                });
            })
            .catch(({ message }) => {
                this.setState({
                    isLoggedIn: false,
                    error: message
                });
            });
    };

    onLogout = () => {
        logic.logout();

        this.setState({
            isLoggedIn: false
        });
    };

    retrieveUser = () => {
        logic.retrieveUser().then(user => {
            this.setState({
                user
            });
        });
    };

    clearErrors = () => {
        this.setState({
            error: ''
        });
    };

    render() {
        const { children } = this.props;

        return (
            <Context.Provider
                value={{
                    store: this.state,
                    actions: this.actions
                }}
            >
                {children}
            </Context.Provider>
        );
    }
}

export default AuthProvider;
