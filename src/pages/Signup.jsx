import React,{useEffect} from 'react'
import { Signup as SignupComponent } from '../components/index';


const Signup = () => {
    
    useEffect(() => console.log("signup component rendered."), []);

    return (
        <div className='py-8'>
            <SignupComponent />
        </div>
    )
}

export default Signup
