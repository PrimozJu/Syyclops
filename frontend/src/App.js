import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Home from './home';

function App() {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="flex">
            <Sidebar onUserClick={handleUserClick} />;
            <div className="flex-grow">
                <Home user={selectedUser} />;
            </div>
            v
        </div>
    );
}

export default App;
