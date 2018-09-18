import React, { Component } from 'react';
import withState from './../../utils/withState';

class Dashboard extends Component {
    componentDidMount() {
        this.props.actions.retrieveUser();
    }

    render() {
        const { user } = this.props.store;

        return (
            <React.Fragment>
                <h1>Dashboard</h1>
                {Object.keys(user).length > 0 ? (
                    <React.Fragment>
                        <p>Name: {user.name || 'No name'}</p>
                        <p>Email: {user.email || 'No email'}</p>
                    </React.Fragment>
                ) : (
                    'Loading user info...'
                )}
            </React.Fragment>
        );
    }
}

export default withState(Dashboard);
