import React from 'react';
import Header from '../Header/Header';
import loginImg from '../../Resources/login.png'
import auth from '../../firebase.init';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const Login = () => {

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    if(googleUser){
        console.log(googleUser?.user);
    }

    return (
        <div>
            <Header />
            <div>
                <div class="hero min-h-screen bg-[#F5F7FF]">
                    <div class="hero-content flex-col lg:flex-row">
                        <img src={loginImg} class="max-w-lg rounded-lg hidden lg:block" alt=''/>
                        <div>
                            <h1 class="text-5xl font-bold text-center">Login</h1>
                            <p class="py-6">Lorem ipsum dolor sit amet.</p>
                            <button class="btn btn-primary">Get Started</button>
                            <br />
                            <button onClick={ () => signInWithGoogle()} className='btn'>Continue With Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;