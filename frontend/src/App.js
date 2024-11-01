import React, { useState, useEffect } from 'react';
import { fetchData } from './api/api';
import Sidebar from './sidebar';
import Home from './home';

function App() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [updateTrigger, setUpdateTrigger] = useState(false);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleUserUpdate = () => {
        setUpdateTrigger(!updateTrigger);
    };

    const handleUserDelete = () => {
        setSelectedUser(null);
        setUpdateTrigger(!updateTrigger);
    };

    useEffect(() => {
        console.log('Fetching users...');
        const getUsers = async () => {
            try {
                console.log('Fetching users...');
                const data = await fetchData();
                setUsers(data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        getUsers();
    }, [updateTrigger]); //()re)fetching data when triggered by initial render (or update/delete)

    return (
        <div className="flex">
            <Sidebar onUserClick={handleUserClick} users={users} />;
            <div className="flex-grow">
                <Home user={selectedUser} onUserUpdate={handleUserUpdate} onUserDelete={handleUserDelete} />;
            </div>
            v
        </div>
    );
}

export default App;
