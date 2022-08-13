import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate()
    const navigateToHome = () => {
        navigate("/")
    }
    return (
        <div className='text-center font-mono mt-28 sm:mt-40 px-5'>
            <p className='text-lg'>OOPS! Page Not Found</p>
            <h2 className='font-extrabold text-6xl sm:text-8xl'>404</h2>
            <p className='text-lg'>We're sorry, The page you requested could not be found <br /> Please go back to the homepage.</p>
            <button className='btn rounded-full btn-sm mt-4' onClick={navigateToHome}>Go Home</button>
        </div>
    );
};

export default NotFound;