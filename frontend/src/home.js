import React, { useState, useEffect } from 'react';
import { updateData } from './api/api';
import '../src/styles/home.css';
/* 
Potential changes:
    Use .map to render the user data fields
*/
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
            <h1 className="custom-heading">Home</h1>
            {user ? (
                <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold">
                    <div className="mb-4">
                        <label className="block text-black">ID</label>
                        <input
                            type="text"
                            name="id"
                            value={editedUser?.id || ''}
                            readOnly={!isEditing}
                            onChange={handleChange}
                            className="custom-input"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={editedUser?.firstName || ''}
                            readOnly={!isEditing}
                            onChange={handleChange}
                            className="custom-input"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={editedUser?.lastName || ''}
                            readOnly={!isEditing}
                            onChange={handleChange}
                            className="custom-input"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black">Age</label>
                        <input
                            type="text"
                            name="age"
                            value={editedUser?.age || ''}
                            readOnly={!isEditing}
                            onChange={handleChange}
                            className="custom-input"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black">Gender</label>
                        <input
                            type="text"
                            name="gender"
                            value={editedUser?.gender || ''}
                            readOnly={!isEditing}
                            onChange={handleChange}
                            className="custom-input"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={editedUser?.email || ''}
                            readOnly={!isEditing}
                            onChange={handleChange}
                            className="custom-input"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={editedUser?.phone || ''}
                            readOnly={!isEditing}
                            onChange={handleChange}
                            className="custom-input"
                        />
                    </div>
                    {isEditing ? (
                        <div>
                            <button onClick={handleSaveClick} className="custom-button custom-button-save mr-2">
                                Save
                            </button>
                            <button onClick={handleResetClick} className="custom-button custom-button-reset">
                                Reset
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleEditClick} className="custom-button custom-button-save">
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
