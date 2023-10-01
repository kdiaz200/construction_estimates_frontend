import React from 'react';
import { Route, Link, Routes } from "react-router-dom";
import Materials from './Materials';
import Favorites from './Favorites';
import './Dashboard.css';

function Dashboard() {
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
    };

    return (
        <div className="Dashboard">
            <div className="UserInfo">
                <h2>User Info</h2>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
            </div>

            <div className="Sidebar">
                <h2>Navigation</h2>
                <ul>
                    <li><Link to="/materials">Materials</Link></li>
                    <li><Link to="/favorites">Favorites</Link></li>
                </ul>
            </div>

            <div className="MainContent">
                <Routes>
                    <Route path="/materials" element={<Materials />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </div>
        </div>
    );
}

export default Dashboard;
