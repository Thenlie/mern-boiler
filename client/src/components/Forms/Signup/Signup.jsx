import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleSignup = async (evt) => {
        evt.preventDefault();
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password,
            })
        });
        return response;
    };

    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'username': 
                setUsername(evt.target.value);
                return ;
            case 'email': 
                setEmail(evt.target.value);
                return ;
            case 'password': 
                setPassword(evt.target.value);
                return ;
            case 'confirmPassword': 
                setConfirmPassword(evt.target.value);
                return ;
            default: 
                return;
        }
    };

    const togglePasswordVisible = () => {
        if (passwordVisible) {
            setPasswordVisible(false);
        } else {
            setPasswordVisible(true);
        };
    };

    const toggleConfirmPasswordVisible = () => {
        if (confirmPasswordVisible) {
            setConfirmPasswordVisible(false);
        } else {
            setConfirmPasswordVisible(true);
        };
    };

    return (
        <section className="p-4 m-4 w-1/3 text-center bg-slate-100 rounded-md">
            <h2 className='font-bold text-lg mb-2'>Signup</h2>
            {/* signup form */}
            <form onSubmit={handleSignup} className='flex flex-col'>
                <input className='m-2 p-2 rounded-sm' onChange={handleChange} name='username' placeholder='username' type='text' value={username}></input>
                <input className='m-2 p-2 rounded-sm' onChange={handleChange} name='email' placeholder='email' type='email' value={email}></input>
                <input className='m-2 p-2 rounded-sm' onChange={handleChange} name='password' placeholder='password' type='password' value={password}></input><div onClick={togglePasswordVisible}>{passwordVisible ? (<EyeIcon width={25}/>) : (<EyeOffIcon width={25}/>)}</div>
                <input className='m-2 p-2 rounded-sm' onChange={handleChange} name='confirmPassword' placeholder='confirmPassword' type='confirmPassword' value={confirmPassword}></input><div onClick={toggleConfirmPasswordVisible}>{confirmPasswordVisible ? (<EyeIcon width={25}/>) : (<EyeOffIcon width={25}/>)}</div>
                <button type='submit' className='w-1/4 m-auto p-2 rounded-lg bg-slate-300 hover:bg-slate-400'>Signup</button>
            </form>
            {/* state variables */}
            <div className='test-info'>
                <p className='font-bold text-left'>Username: <span className='font-normal'>{username}</span></p>
                <p className='font-bold text-left'>Email: <span className='font-normal'>{email}</span></p>
                <p className='font-bold text-left'>Password: <span className='font-normal'>{password}</span></p>
                <p className='font-bold text-left'>Confirm Password: <span className='font-normal'>{confirmPassword}</span></p>
            </div>
        </section>
    )
};

export default Signup;