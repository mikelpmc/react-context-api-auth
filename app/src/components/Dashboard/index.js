import React, { Component } from 'react';
import { AuthConsumer } from './../../context/';

class Dashboard extends Component {
    componentDidMount() {
        this.props.context.retrieveUser();
    }

    render() {
        const { user } = this.props.context.state;

        return (
            <React.Fragment>
                <h1>Dashboard</h1>
                {user && (
                    <React.Fragment>
                        <p>Name: {user.name || 'No name'}</p>
                        <p>Email: {user.email || 'No email'}</p>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

const WrappedComponent = () => {
    return (
        <AuthConsumer>
            {context => <Dashboard context={context} />}
        </AuthConsumer>
    );
};

export default WrappedComponent;
