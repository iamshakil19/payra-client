import React, { useState } from 'react';
import Header from '../Header/Header';
import './BloodDonorRegistration.css'
import donorImg from '../../Resources/blood-img-1.png'
import toast from 'react-hot-toast';

const BloodDonorRegistration = () => {

    const [customGenderError, setCustomGenderError] = useState({
        genderError: ""

    })
    const [customBloodGroupError, setCustomBloodGroupError] = useState({
        bloodGroupError: ""
    })

    const donorInfo = event => {
        event.preventDefault()
        const name = event.target.name.value
        const age = event.target.age.value
        const number = event.target.number.value
        const location = event.target.location.value
        const gender = event.target.gender.value
        const bloodGroup = event.target.bloodGroup.value

        if (gender === "noGender") {
            setCustomGenderError({ ...customGenderError, genderError: "Select your gender" })
            toast.error("Your submission failed")
            return
        }
        else {
            setCustomGenderError({ ...customGenderError, genderError: "" })
        }

        if (bloodGroup === "nothing") {
            setCustomBloodGroupError({ ...customBloodGroupError, bloodGroupError: "Select your blood group" })
            toast.error("Your submission failed")
            return
        }
        else {
            setCustomBloodGroupError({ ...customBloodGroupError, bloodGroupError: "" })
        }

        console.log({ name, age, number, location, gender, bloodGroup });
        toast.success("Your submission has been sent")
        event.target.reset()
    }
    return (
        <div className='donor-registration-bg'>
            <Header></Header>

            <div class="hero min-h-screen">
                <div class="hero-content flex-col lg:flex-row">
                    <div>
                        <img src={donorImg} class="max-w-lg rounded-lg shadow-2xl hidden lg:block" alt=''/>
                    </div>
                    <div>
                        <h1 class="text-4xl font-bold my-font text-white tracking-wide sm:text-5xl text-center">আপনার তথ্য দিন</h1>
                        <form onSubmit={donorInfo}>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text text-white">What is your name ?</span>
                                </label>
                                <input type="text" name='name' placeholder="Your Name" class="input input-sm input-bordered w-full max-w-xs" required />
                            </div>

                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text text-white">What is your age ?</span>
                                </label>
                                <input type="number" name='age' placeholder="Your Age" class="input input-sm input-bordered w-full max-w-xs" required />
                            </div>

                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text text-white">What is your Number ?</span>
                                </label>
                                <input type="number" name='number' placeholder="EX: 0123456789" class="input input-sm input-bordered w-full max-w-xs" required />
                            </div>

                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text text-white">What is your Location ?</span>
                                </label>
                                <input type="text" name='location' placeholder="Your Location" class="input input-sm input-bordered w-full max-w-xs" required />
                            </div>

                            <div class="form-control w-full max-w-xs ">
                                <label class="label">
                                    <span class="label-text text-white">What is your gender</span>
                                </label>
                                <select class="select select-bordered select-sm" name='gender'>
                                    <option disabled selected value={"noGender"}>Select your gender</option>
                                    <option value={"male"}>Male</option>
                                    <option value={"female"}>Female</option>
                                    <option value={"3rd"}>Rather not say</option>
                                </select>
                                {
                                    customGenderError?.genderError && <p className='text-red-500 mt-1 text-sm'>{customGenderError?.genderError}</p>
                                }
                            </div>

                            <div class="form-control w-full max-w-xs ">
                                <label class="label">
                                    <span class="label-text text-white">Your Blood Group</span>
                                </label>
                                <select class="select select-bordered select-sm" name='bloodGroup'>
                                    <option disabled selected value={"nothing"}>Select your blood group</option>
                                    <option value={"o+"}>O+</option>
                                    <option value={"o-"}>O-</option>
                                    <option value={"a+"}>A+</option>
                                    <option value={"a-"}>A-</option>
                                    <option value={"b+"}>B+</option>
                                    <option value={"b-"}>B-</option>
                                    <option value={"ab+"}>AB+</option>
                                    <option value={"ab-"}>AB-</option>
                                </select>
                                {
                                    customBloodGroupError?.bloodGroupError && <p className='text-red-500 mt-1 text-sm'>{customBloodGroupError.bloodGroupError}</p>
                                }
                            </div>
                            <div>
                                <input className='btn w-full max-w-xs mt-5 bg-white text-black font-bold hover:bg-[#FE3C47] hover:text-white transition-all duration-300 ease-in-out' type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BloodDonorRegistration;