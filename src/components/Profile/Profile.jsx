import React, { useEffect, useState } from 'react';
import authService from '../../appwrite/auth';


const Profile = () => {
    const [currentUser, setCorrentUser] = useState(null);


    useEffect(() => {
        authService.getCurrentUser().then((response) => {
            setCorrentUser(response);
        })
    }, [])


    return (
        <div className='my-10'>
            {
                (currentUser) ?
                    <div className='w-full py-5 my-5 flex'>
                        <label className='font-bold text-2xl'>Name -     </label>
                        <p className='font-bold text-2xl capitalize mx-2'> { currentUser.name}</p>
                    </div> : <p className='text-center text-violet-600 my-7'>There is no user Login</p>
            }
        </div>
    )
}

export default Profile
