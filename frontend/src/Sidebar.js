import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { fetchData } from './api/api';

export default function Sidebar({ onUserClick }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                console.log('Fetching users...');
                const data = await fetchData();
                setUsers(data.users); // Assuming the API response has a 'users' field
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        getUsers();
    }, []);
    console.log(users);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div
            className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 ${
                isSidebarOpen ? '' : 'hidden'
            } lg:block`}
        >
            <div className="text-gray-100 text-xl">
                <div className="p-2.5 mt-1 flex items-center">
                    <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
                    <h1 className="font-bold text-gray-200 text-[15px] ml-3">Users</h1>
                    <i className="bi bi-x cursor-pointer ml-28 lg:hidden" onClick={() => setIsSidebarOpen(false)}></i>
                </div>
                <div className="my-2 bg-gray-600 h-[1px]"></div>
            </div>
            <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold" id="submenu">
                {users.map((user) => (
                    <h1
                        key={user.id}
                        className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1"
                        onClick={() => onUserClick(user)}
                    >
                        {user.firstName} {user.lastName}
                    </h1>
                ))}
            </div>
        </div>
    );
}
