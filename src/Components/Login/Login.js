import React from 'react';
import Header from '../Header/Header';
import loginImg from '../../Resources/login.png'
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import or from '../../Resources/divider.png'
import googleLogo from '../../Resources/Logos/google2.png'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    const navigateToRegister = () => {
        navigate("/registration")
    }
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const { register, formState: { errors }, handleSubmit, getValues } = useForm();

    const onSubmit = data => {
        console.log(data)
    };

    if (googleUser) {
        console.log(googleUser?.user);
    }


    return (
        <div>
            <Header />
            <div>
                <div class="hero min-h-screen bg-[#F5F7FF]">
                    <div class="hero-content flex-col lg:flex-row">
                        <img src={loginImg} class="max-w-lg rounded-lg hidden lg:block" alt='' />

                        <div className='shadow-slate-600 shadow-2xl py-5 pb-8 px-7 rounded-xl md:w-96'>
                            <h1 class="text-4xl font-bold text-center">Login</h1>




                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div class="form-control w-full max-w-xs mx-auto">
                                    <label class="label">
                                        <span class="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="Type your email" class="input input-bordered w-full max-w-xs"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: "Email is required"
                                            },
                                            pattern: {
                                                value: /\S+@\S+\.\S+/,
                                                message: 'Provide a valid email'
                                            }
                                        })}
                                    />
                                    <label class="label">
                                        {errors.email?.type === 'required' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
                                        {errors.email?.type === 'pattern' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
                                    </label>
                                </div>

                                <div class="form-control w-full max-w-xs mx-auto">
                                    <label class="label">
                                        <span class="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="Type your password" class="input input-bordered w-full max-w-xs"
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message: "Password is required"
                                            },
                                            minLength: {
                                                value: 6,
                                                message: 'Must be 6 characters or longer'
                                            }
                                        })}
                                    />
                                    <label class="label">
                                        {errors.password?.type === 'required' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                                        {errors.password?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                                    </label>
                                </div>

                                <input className='bg-[#303640] w-full mt-2 rounded-full btn' type="submit" value="Login" />
                            </form>
                            <p className='text-[15px] ml-2 mt-3'>Need an account ? <span className='text-blue-600 cursor-pointer' onClick={navigateToRegister} >Register</span></p>
                            <p className='text-blue-600 ml-2 mt-1 cursor-pointer text-[15px]'>Forgot Password ?</p>





                            <div>
                                <img className='mx-auto my-1' src={or} alt="" />
                            </div>
                            <button onClick={() => signInWithGoogle()} className='flex items-center bg-[#303640] rounded-full w-full text-center btn'>
                                <img className='w-8 mr-2' src={googleLogo} alt="" />
                                Continue With Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;