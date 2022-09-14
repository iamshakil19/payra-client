import React from 'react';
import Header from '../Header/Header';
import loginImg from '../../Resources/login.png'
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import or from '../../Resources/divider.png'
import googleLogo from '../../Resources/Logos/google2.png'
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';
import useToken from '../Hooks/useToken';

const Login = () => {

    const navigate = useNavigate()
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit, getValues } = useForm();
    const [token] = useToken(user || googleUser)
    const navigateToRegister = () => {
        navigate("/registration")
    }

    let loginError;
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if (loading || googleLoading) {
        return <Loading />
    }

    if (error || googleError) {
        loginError = <p className='text-red-500 text-sm ml-2 mb-1'>{error?.message || googleError?.message}</p>
    }

    if (token) {
        navigate(from, { replace: true })
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    };

    return (
        <div>
            <Header />
            <div>
                <div className="hero custom-height bg-[#F5F7FF]">
                    <div className="hero-content flex-col lg:flex-row">
                        <img src={loginImg} className="max-w-lg rounded-lg hidden lg:block" alt='' />

                        <div className='shadow-slate-600 shadow-2xl py-5 pb-8 px-7 rounded-xl md:w-96'>
                            <h1 className="text-4xl font-bold text-center">Login</h1>




                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-control w-full max-w-xs mx-auto">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="Type your email" className="input input-bordered w-full max-w-xs"
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
                                    <label className="label">
                                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    </label>
                                </div>

                                <div className="form-control w-full max-w-xs mx-auto">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="Type your password" className="input input-bordered w-full max-w-xs"
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
                                    <label className="label">
                                        {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                        {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    </label>
                                </div>

                                {loginError}

                                <input className='bg-[#303640] w-full mt-2 rounded-full btn' type="submit" value="Login" />
                            </form>
                            <p className='text-[15px] ml-2 mt-3'>Need an account ? <span className='text-blue-600 cursor-pointer' onClick={navigateToRegister} >Sign Up</span></p>
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