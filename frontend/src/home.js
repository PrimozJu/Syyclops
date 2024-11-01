import React, { useState, useEffect } from 'react';
import { updateData, deleteData } from './api/api';
import '../src/styles/home.css';

const allowedFields = [
    { name: 'id', label: 'ID' },
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'age', label: 'Age' },
    { name: 'gender', label: 'Gender' },
    { name: 'email', label: 'Email' },
    { name: 'phone', label: 'Phone' },
];

const Home = ({ user, onUserUpdate, onUserDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    const handleSaveClick = async () => {
        setIsEditing(false);
        console.log('Saving user:', editedUser);
        try {
            const response = await updateData(`/user/${editedUser.id}`, editedUser);
            console.log('User updated:', response);
            onUserUpdate();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteClick = async () => {
        console.log('Deleting user:', editedUser);
        try {
            const response = await deleteData(editedUser.id);
            console.log('User deleted:', response);
            onUserDelete();
        } catch (error) {
            console.error('Error deleting user:', error);
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
                    {allowedFields.map(
                        (field) =>
                            user[field.name] !== undefined && (
                                <div className="mb-4" key={field.name}>
                                    <label className="block text-black">{field.label}</label>
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={editedUser?.[field.name] || ''}
                                        readOnly={!isEditing}
                                        onChange={handleChange}
                                        className="custom-input"
                                    />
                                </div>
                            )
                    )}
                    <div className="flex justify-end">
                        <button className="custom-button custom-button-reset mr-2" onClick={handleResetClick}>
                            Reset
                        </button>
                        <button
                            className="custom-button custom-button-save mr-2"
                            onClick={isEditing ? handleSaveClick : () => setIsEditing(true)}
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                        <button className="custom-button custom-button-delete " onClick={handleDeleteClick}>
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <p>Please select a user from the sidebar.</p>
            )}
        </div>
    );
};

export default Home;
