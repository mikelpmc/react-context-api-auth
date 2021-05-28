import React, { useEffect } from 'react';
import './index.css';
import { useAuthDispatch, useAuthState } from '../../providers/authProvider';

const Dashboard = () => {
    const { onRetrieveUser } = useAuthDispatch();
    const { user } = useAuthState();

    useEffect(() => {
        onRetrieveUser();
    }, []);

    return (
        <section className="dashboard">
            <h1 className="dashboard__title">Dashboard</h1>
            {user ? (
                <div className="dashboard__info">
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                'Loading user info...'
            )}
        </section>
    );
};

export default Dashboard;
