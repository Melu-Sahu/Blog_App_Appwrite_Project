import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo, } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';

import { useForm } from 'react-hook-form';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');


    const login = async (data) => {
        setError("");
        try {
            const session =  authService.login(data);

            if (session) {
                const userData = await authService.getCurrentUser();
                console.log("user Data",userData);

                if (userData) {
                    dispatch(authLogin(userData));
                }
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl border border-black/10`}>
                <div className='mb-2 flex justify-center '>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-black/50'>
                    Don&apos;t have any account?&nbsp;
                    <Link to={'/signup'} className='font-medium text-primary transition-all duration-200 hover:underline'>Sign Up</Link>
                </p>
                {
                    error && <p className='text-red-500 text-center mt-8'>{error}</p>
                }
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email:"
                            placeholder="Your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || "Email must be valid."
                                }
                            })} />
                        <Input
                            label="Password:"
                            placeholder="Your password"
                            type="password"
                            {...register("password", {
                                required: true
                            })} />
                        <Button type='submit' className="w-full">Log in</Button>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default Login
