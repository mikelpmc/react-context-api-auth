import React, { Component } from 'react';

import logic from './../logic/';

const AuthContext = React.createContext();

const initialContext = {
    isLoggedIn: logic.isLoggedIn(),
    isRegistered: false,
    name: '',
    email: '',
    password: '',
    user: '',
    error: ''
};

class AuthProvider extends Component {
    state = initialContext;

    componentDidMount() {
        this.setState({ isLoggedIn: logic.isLoggedIn() });
    }

    render() {
        return (
            <AuthContext.Provider
                value={{
                    state: this.state,

                    handleChange: e => {
                        this.setState({
                            [e.target.name]: e.target.value
                        });
                    },
                    onRegister: e => {
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
                    },
                    onLogin: e => {
                        e.preventDefault();

                        const { email, password } = this.state;

                        logic
                            .login(email, password)
                            .then(() => {
                                this.setState({
                                    isLoggedIn: true
                                });
                            })
                            .catch(({ message }) => {
                                this.setState({
                                    isLoggedIn: false,
                                    error: message
                                });
                            });
                    },
                    onLogout: () => {
                        logic.logout();

                        this.setState({
                            isLoggedIn: false
                        });
                    },

                    retrieveUser: () => {
                        logic.retrieveUser().then(user => {
                            this.setState({
                                user
                            });
                        });
                    }
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
