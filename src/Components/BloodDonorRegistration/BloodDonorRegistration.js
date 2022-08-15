import React, { useState } from 'react';
import Header from '../Header/Header';
import './BloodDonorRegistration.css'
import donorImg from '../../Resources/blood-img-1.png'
import toast from 'react-hot-toast';

const BloodDonorRegistration = () => {

    const [customBloodGroupError, setCustomBloodGroupError] = useState({
        bloodGroupError: ""
    })
    const [customGenderError, setCustomGenderError] = useState({
        genderError: ""
    })
    const [customDivisionError, setCustomDivisionError] = useState({
        divisionError: ""
    })
    const [customDistrictError, setCustomDistrictError] = useState({
        districtError: ""
    })
    const [customPoliceError, setCustomPoliceError] = useState({
        policeError: ""
    })
    const [customUnionError, setCustomUnionError] = useState({
        unionError: ""
    })
    const [customVillageError, setCustomVillageError] = useState({
        villageError: ""
    })



    const donorInfo = event => {
        event.preventDefault()
        const name = event.target.name.value
        const age = event.target.age.value
        const number1 = event.target.number1.value
        const number2 = event.target.number2.value
        const division = event.target.division.value
        const district = event.target.district.value
        const policeStation = event.target.policeStation.value
        const union = event.target.union.value
        const village = event.target.village.value
        const gender = event.target.gender.value
        const bloodGroup = event.target.bloodGroup.value

        if (bloodGroup === "empty") {
            setCustomBloodGroupError({ ...customBloodGroupError, bloodGroupError: "Select your blood group" })
            toast.error("Select your blood group")
            return
        }
        else {
            setCustomBloodGroupError({ ...customBloodGroupError, bloodGroupError: "" })
        }

        if (gender === "empty") {
            setCustomGenderError({ ...customGenderError, genderError: "Select your gender" })
            toast.error("Select your gender")
            return
        }
        else {
            setCustomGenderError({ ...customGenderError, genderError: "" })
        }

        if (division === "empty") {
            setCustomDivisionError({ ...customDivisionError, divisionError: "Select your division" })
            toast.error("Select your division")
            return
        }
        else {
            setCustomDivisionError({ ...customDivisionError, divisionError: "" })
        }

        if (district === "empty") {
            setCustomDistrictError({ ...customDistrictError, districtError: "Select your district" })
            toast.error("Select your district")
            return
        }
        else {
            setCustomDistrictError({ ...customDistrictError, districtError: "" })
        }

        if (policeStation === "empty") {
            setCustomPoliceError({ ...customPoliceError, policeError: "Select your police station" })
            toast.error("Select your police station")
            return
        }
        else {
            setCustomPoliceError({ ...customPoliceError, policeError: "" })
        }

        if (union === "empty") {
            setCustomUnionError({ ...customUnionError, unionError: "Select your union" })
            toast.error("Select your union")
            return
        }

        else {
            setCustomUnionError({ ...customUnionError, unionError: "" })
        }

        if (village === "empty") {
            setCustomVillageError({ ...customVillageError, villageError: "Select your village" })
            toast.error("Select your village")
            return
        }

        else {
            setCustomVillageError({ ...customVillageError, villageError: "" })
        }


        console.log({ name, age, number1, number2, gender, bloodGroup, division, district, policeStation, union, village });
        toast.success("Your submission has been sent")
        event.target.reset()
    }
    return (
        <div className='donor-registration-bg min-h-screen'>
            <Header></Header>

            <div class="hero lg:mt-8">
                <div class="hero-content flex-col lg:flex-row">
                    <div className='lg:mr-3'>
                        <img src={donorImg} class="max-w-lg rounded-lg shadow-2xl hidden lg:block" alt='' />
                    </div>

                    <div className='lg:ml-3'>
                        <h1 class="text-4xl font-bold my-font text-white tracking-wide sm:text-5xl text-center">আপনার তথ্য দিন</h1>

                        <form onSubmit={donorInfo}>
                            <div class="form-control w-full max-w-xs lg:max-w-full">
                                <label class="label">
                                    <span class="label-text text-white">Your Name <span className='text-red-500 font-extrabold'>*</span></span>
                                </label>
                                <input type="text" name='name' placeholder="Type Your Name" class="input input-sm input-bordered w-full max-w-xs lg:max-w-full" required />
                            </div>
                            <div className='lg:flex'>
                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text text-white">Your Blood Group <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <select class="select select-bordered select-sm" name='bloodGroup'>
                                        <option disabled selected value={"empty"}>Select Blood Group</option>
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

                                <div class="form-control w-full max-w-xs lg:max-w-full lg:ml-5">
                                    <label class="label">
                                        <span class="label-text text-white">Your Date Of Birth <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <input type="date" name='age' placeholder="Your Age" class="input input-sm input-bordered w-full max-w-xs lg:max-w-full" required />
                                </div>
                            </div>



                            <div className='lg:flex'>
                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text text-white">Your Phone Number <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <input type="number" name='number1' placeholder="EX: 01834567890" class="input input-sm input-bordered w-full max-w-xs" required />
                                </div>
                                <div class="form-control w-full max-w-xs lg:ml-5">
                                    <label class="label">
                                        <span class="label-text text-white">Your 2nd Phone Number</span>
                                    </label>
                                    <input type="number" name='number2' placeholder="(optional)" class="input input-sm input-bordered w-full max-w-xs" />
                                </div>
                            </div>

                            <div class="form-control w-full max-w-xs lg:max-w-full ">
                                <label class="label">
                                    <span class="label-text text-white">Your Gender <span className='text-red-500 font-extrabold'>*</span></span>
                                </label>
                                <select class="select select-bordered select-sm" name='gender'>
                                    <option disabled selected value={"empty"}>Select Your Gender</option>
                                    <option value={"male"}>Male</option>
                                    <option value={"female"}>Female</option>
                                    <option value={"3rd"}>Rather not say</option>
                                </select>
                                {
                                    customGenderError?.genderError && <p className='text-red-500 mt-1 text-sm'>{customGenderError?.genderError}</p>
                                }
                            </div>

                            <p className='text-white mt-4 font-bold'>Address</p>

                            <div className='lg:flex'>
                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text text-white">Your Division <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>

                                    <select class="select select-bordered select-sm" name='division'>
                                        <option disabled selected value={"empty"}>Select Your Division</option>
                                        <option value={"barisal"}>Barisal</option>
                                    </select>
                                    {
                                        customDivisionError?.divisionError && <p className='text-red-500 mt-1 text-sm'>{customDivisionError?.divisionError}</p>
                                    }
                                </div>
                                <div class="form-control w-full max-w-xs lg:ml-5">
                                    <label class="label">
                                        <span class="label-text text-white">Your District <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>

                                    <select class="select select-bordered select-sm" name='district'>
                                        <option disabled selected value={"empty"}>Select Your District</option>
                                        <option value={"barisal"}>Barisal</option>
                                    </select>
                                    {
                                        customDistrictError?.districtError && <p className='text-red-500 mt-1 text-sm'>{customDistrictError?.districtError}</p>
                                    }
                                </div>
                            </div>

                            <div class="form-control w-full max-w-xs lg:max-w-full">
                                <label class="label">
                                    <span class="label-text text-white">Your Police Station <span className='text-red-500 font-extrabold'>*</span></span>
                                </label>

                                <select class="select select-bordered select-sm" name='policeStation'>
                                    <option disabled selected value={"empty"}>Select Your Police Station</option>
                                    <option value={"agailjhara"}>Agailjhara</option>
                                </select>
                                {
                                    customPoliceError?.policeError && <p className='text-red-500 mt-1 text-sm'>{customPoliceError?.policeError}</p>
                                }
                            </div>

                            <div className='lg:flex'>
                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text text-white">Your Union <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>

                                    <select class="select select-bordered select-sm" name='union'>
                                        <option disabled selected value={"empty"}>Select Your Union</option>
                                        <option value={"bagdha"}>Bagdha</option>
                                        <option value={"bakal"}>Bakal</option>
                                        <option value={"goila"}>Goila</option>
                                        <option value={"rajihar"}>Rajihar</option>
                                        <option value={"ratnapur"}>Ratnapur</option>
                                    </select>
                                    {
                                        customUnionError?.unionError && <p className='text-red-500 mt-1 text-sm'>{customUnionError?.unionError}</p>
                                    }
                                </div>

                                <div class="form-control w-full max-w-xs lg:ml-5">
                                    <label class="label">
                                        <span class="label-text text-white">Your Village <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>

                                    <select class="select select-bordered select-sm" name='village'>
                                        <option disabled selected value={"empty"}>Select Your Village</option>
                                        <option value={"joyrampotty"}>Joyrampotty</option>
                                        <option value={"amboula"}>Amboula</option>
                                        <option value={"bagdha"}>Bagdha</option>
                                        <option value={"khajuria"}>Khajuria</option>
                                        <option value={"nimarpar"}>Nimarpar</option>
                                    </select>
                                    {
                                        customVillageError?.villageError && <p className='text-red-500 mt-1 text-sm'>{customVillageError?.villageError}</p>
                                    }
                                </div>
                            </div>

                            <div>
                                <input className='btn w-full max-w-xs lg:max-w-full mt-5 bg-white text-black font-bold hover:bg-[#FE3C47] hover:text-white transition-all duration-300 ease-in-out' type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BloodDonorRegistration;