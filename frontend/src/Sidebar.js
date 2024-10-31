import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/sidebar.css';
import logo from './styles/syyclops.png';

export default function Sidebar({ onUserClick, users }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div
            className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center  custom-sidebar-bg ${
                isSidebarOpen ? '' : 'hidden'
            } lg:block`}
        >
            <div className="text-gray-100 text-xl">
                <div className="p-2.5 mt-1 flex items-center">
                    <img src={logo} alt="Logo" className="w-25 h-20 px-2 py-1 rounded-md" />
                    <h1 className="font-bold text-gray-200 text-[15px] ml-3">Syyclops Users</h1>
                    <i className="bi bi-x cursor-pointer ml-28 lg:hidden" onClick={() => setIsSidebarOpen(false)}></i>
                </div>
                <div className="my-2 bg-gray-600 h-[1px]"></div>
            </div>
            <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold" id="submenu">
                {users.map((user) => (
                    <h1
                        key={user.id}
                        className="cursor-pointer p-2 custom-hover rounded-md mt-1"
                        onClick={() => onUserClick(user)}
                    >
                        {user.firstName} {user.lastName}
                    </h1>
                ))}
            </div>
        </div>
    );
}
