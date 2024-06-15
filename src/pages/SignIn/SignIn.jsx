import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.user);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login({ username, password }))
            .unwrap()
            .then(() => {
                navigate('/user'); // Navigate to user dashboard after successful login
            })
            .catch((error) => console.error('Failed login:', error));
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Username"
                        type="text"
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <InputField
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button className="sign-in-button" type="submit" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Sign In'}
                    </Button>
                    {error && <p className="error">{error}</p>}
                </form>
            </section>
        </main>
    );
};

export default SignIn;
