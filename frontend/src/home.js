import React, { useState, useEffect } from 'react';
import { updateData, deleteData } from './api/api';
import '../src/styles/home.css';
/* Fields are displayed dynamically, one source displays all the fields, our backend only three as I did not want to modify users.py */
/* Added VERY simple validation, only for email and name to demonstrate the neccesity of it  */

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validateName = (name) => {
    const re = /^[a-zA-Z\s]+$/;
    return re.test(String(name));
};

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
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    const handleSaveClick = async () => {
        const validationErrors = {};
        if (!validateEmail(editedUser.email)) {
            validationErrors.email = 'Invalid email address';
        }
        if (!validateName(editedUser.firstName)) {
            validationErrors.firstName = 'Name cannot contain numbers';
        }
        if (!validateName(editedUser.lastName)) {
            validationErrors.lastName = 'Name cannot contain numbers';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsEditing(false);
        console.log('Saving user:', editedUser);

        try {
            const response = await updateData(editedUser.id, editedUser);
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
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
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
                                        readOnly={field.name === 'id' || !isEditing}
                                        onChange={handleChange}
                                        className="custom-input"
                                    />
                                    {errors[field.name] && (
                                        <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                                    )}
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
