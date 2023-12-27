import React, { useEffect, useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';



const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError('');
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUserData = await authService.getCurrentUser();
                if (currentUserData) {
                    dispatch(login(currentUserData));
                    navigate('/');
                }
            }

        } catch (error) {
            setError(error.message);
        }

    }

    useEffect(()=>console.log("signup component rendered."),[]);

    return (
        <div className='flex items-center justify-center'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl border border-black/10`}>
                <div className='mb-2 flex justify-center '>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2>Sign in to create account</h2>
                <p className='mt-2 text-center text-base text-black/50'>
                    Already have an account?&nbsp;
                    <Link to={'/login'} className='font-medium text-primary transition-all duration-200 hover:underline'>Sign In</Link>
                </p>
                {
                    error && <p className='text-red-500 text-center mt-8'>{error}</p>
                }
                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Name:"
                            placeholder="Your Name"
                            {...register("name", {
                                required: true
                            })} />

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
                        <Button type='submit' className="w-full">Create account</Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup
