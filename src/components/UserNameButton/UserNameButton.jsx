import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername } from '../../redux/reducers/userSlice';

import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import "./UserNameButton.scss";

const UserNameButton = () => {
    const { data } = useSelector(state => state.user);
    const [isEditing, setIsEditing] = useState(false);
    const [newUsername, setNewUsername] = useState(data ? data.userName : '');
    const dispatch = useDispatch();
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newUsername) {
            dispatch(updateUsername({ newUsername }));
            setIsEditing(false);
        }
    };

    return (
        <div>
            {isEditing ? (
                <form className="edit-form" onSubmit={handleSubmit}>
                    <InputField
                        label="New Username"
                        id="newUsername"
                        type="text"
                        
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <InputField
                        label="First Name"
                        id="firstName"
                        type="text"
                        value={data ? data.firstName : ''}
                        disabled={true}
                    />
                    <InputField
                        label="Last Name"
                        id="lastName"
                        type="text"
                        value={data ? data.lastName : ''}
                        disabled={true}
                    />
                    <Button className="edit-button" type="submit">Save</Button>
                    <Button className="edit-button" type="button" onClick={() => setIsEditing(false)}>Cancel</Button>
                </form>
            ) : (
                <Button className="edit-button" onClick={() => setIsEditing(true)}>Edit Username</Button>
            )}
        </div>
    );
};

export default UserNameButton;
