import React, { useState } from 'react';

const Login = ({setUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const data = {
        "email": "test@email.com",
        "password": "password"
    }

    const handleLogin = async (evt) => {
        evt.preventDefault();
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const newData = await response.json();
        setUser(newData._id)
        return response;
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
    
    return (
        <section className="login">
            <h2>Login</h2>
            {/* login form */}
            <form onSubmit={handleLogin}>
                <input onChange={handleChange} name='email' placeholder='email' value={email}></input>
                <input onChange={handleChange} name='password' placeholder='password' value={password}></input>
                <button type='submit'>Login</button>
            </form>
            {/* state variables */}
            <div className='test-info'>
                <p>Email: <span>{email}</span></p>
                <p>Password: <span>{password}</span></p>
            </div>
        </section>
    )
};

export default Login;