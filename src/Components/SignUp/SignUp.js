import React from 'react';
import Header from '../Header/Header';
import loginImg from '../../Resources/login.png'
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import or from '../../Resources/divider.png'
import googleLogo from '../../Resources/Logos/google2.png'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';

const SignUp = () => {
    const navigate = useNavigate()
    const navigateToLogin = () => {
        navigate("/login")
    }
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
      const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const { register, formState: { errors }, handleSubmit, getValues } = useForm();

    let loginError;

    if (loading || googleLoading || updating) {
        return <Loading />
    }

    if (error || googleError || updateError) {
        loginError = <p className='text-red-500 text-sm ml-2 mb-1'>{error?.message || googleError?.message || updateError?.message}</p>
    }

    if (user || googleUser) {
        console.log(user || googleUser);
    }

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName: data.name });
        console.log("update done");
        navigate("/")
    };
    
    return (
        <div>
            <Header />
            <div>
                <div class="hero min-h-screen bg-[#F5F7FF]">
                    <div class="hero-content flex-col lg:flex-row">
                        <img src={loginImg} class="max-w-lg rounded-lg hidden lg:block" alt='' />

                        <div className='shadow-slate-600 shadow-2xl py-5 pb-8 px-7 rounded-xl md:w-96'>
                            <h1 class="text-4xl font-bold text-center">Sign Up</h1>

                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div class="form-control w-full max-w-xs mx-auto">
                                    <label class="label">
                                        <span class="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Type your Name" class="input input-bordered w-full max-w-xs"
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: "Name is required"
                                            }
                                        })}
                                    />
                                    <label class="label">
                                        {errors.name?.type === 'required' && <span class="label-text-alt text-red-500">{errors.name.message}</span>}
                                        
                                    </label>
                                </div>
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

                                {loginError}

                                <input className='bg-[#303640] w-full mt-2 rounded-full btn' type="submit" value="Sign Up" />
                            </form>
                            <p className='text-[15px] ml-2 mt-3'>Already a user ? <span className='text-blue-600 cursor-pointer' onClick={navigateToLogin} >Login</span></p>

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

export default SignUp;