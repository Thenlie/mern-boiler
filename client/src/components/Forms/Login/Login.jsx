import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../../utils/mutations';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const Login = ({setUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [login] = useMutation(LOGIN);

    const handleLogin = async (evt) => {
        evt.preventDefault();
        // const response = await fetch('/auth/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         "email": email,
        //         "password": password,
        //     })
        // })
        // const data = await response.json();
        const { data } = await login({
            variables: {
                "email": email,
                "password": password,
            }
        })
        setUser(data.login._id)
        return data;
    };

    const handleChange = (evt) => {
        switch (evt.target.name) {
            case 'email': 
                setEmail(evt.target.value);
                return ;
            case 'password': 
                setPassword(evt.target.value);
                return ;
            default: 
                return;
        }
    };

    const togglePasswordVisible = () => {
        if (passwordVisible) {
            setPasswordVisible(false);
            document.getElementById('login-password').type = 'password';
        } else {
            setPasswordVisible(true);
            document.getElementById('login-password').type = 'text';
        }
    }
    
    return (
        <section className="p-4 m-4 w-1/3 text-center bg-slate-100 rounded-md">
            <h2 className='font-bold text-lg mb-2'>Login</h2>
            {/* login form */}
            <form onSubmit={handleLogin} className='flex flex-col'>
                <input className='m-2 p-2 rounded-sm' onChange={handleChange} name='email' placeholder='email' type='email' value={email}></input>
                <div className='flex items-center'><input className='m-2 p-2 rounded-sm grow mr-0' onChange={handleChange} name='password' placeholder='password' type='password' id='login-password' value={password}></input><div onClick={togglePasswordVisible} className='bg-white p-2'>{passwordVisible ? (<EyeIcon width={25} className='stroke-slate-500'/>) : (<EyeOffIcon width={25} className='stroke-slate-500'/>)}</div></div>
                <button type='submit' className='w-1/4 m-auto p-2 rounded-lg bg-slate-300 hover:bg-slate-400'>Login</button>
            </form>
            {/* state variables */}
            <div className='test-info'>
                <p className='font-bold text-left'>Email: <span className='font-normal'>{email}</span></p>
                <p className='font-bold text-left'>Password: <span className='font-normal'>{password}</span></p>
            </div>
        </section>
    )
};

export default Login;