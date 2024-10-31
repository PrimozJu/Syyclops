import React, { useState, useEffect } from 'react';
import { updateData } from './api/api';

const Home = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);
        console.log('Saving user:', editedUser);
        try {
            const response = await updateData(`/user/${editedUser.id}`, editedUser);
            console.log('User updated:', response);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleResetClick = () => {
        setEditedUser(user);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <div className="p-4 ml-[300px]">
            <h1>Home</h1>
            {user ? (
                <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold">
                    <div className="mb-4">
                        <label className="block text-gray-400">ID</label>
                        <input
                            type="text"
                            name="id"
                            value={editedUser?.id || ''}
                            readOnly={!isEditing}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={editedUser?.firstName || ''}
                            readOnly={!isEditing}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={editedUser?.lastName || ''}
                            readOnly={!isEditing}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400">Age</label>
                        <input
                            type="text"
                            name="age"
                            value={editedUser?.age || ''}
                            readOnly={!isEditing}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400">Gender</label>
                        <input
                            type="text"
                            name="gender"
                            value={editedUser?.gender || ''}
                            readOnly={!isEditing}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={editedUser?.email || ''}
                            readOnly={!isEditing}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={editedUser?.phone || ''}
                            readOnly={!isEditing}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md"
                        />
                    </div>
                    {isEditing ? (
                        <div>
                            <button
                                onClick={handleSaveClick}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2"
                            >
                                Save
                            </button>
                            <button onClick={handleResetClick} className="px-4 py-2 bg-gray-600 text-white rounded-md">
                                Reset
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleEditClick} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                            Edit
                        </button>
                    )}
                </div>
            ) : (
                <p>Please select a user from the sidebar</p>
            )}
        </div>
    );
};

export default Home;
