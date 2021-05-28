import React from 'react';
import useRetrieveUserQuery from './services/useRetrieveUserQuery';
import './index.css';

const Dashboard = () => {
    const { loading, error, data } = useRetrieveUserQuery();

    if (loading) return <p>Loading user info...</p>;
    if (error) return <p>Oops! something went wrong</p>;

    const { name, email } = data;

    return (
        <section className="dashboard">
            <h1 className="dashboard__title">Dashboard</h1>
            <div className="dashboard__info">
                <p>Name: {name}</p>
                <p>Email: {email}</p>
            </div>
        </section>
    );
};

export default Dashboard;
