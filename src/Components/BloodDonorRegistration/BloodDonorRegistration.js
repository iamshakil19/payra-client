import React, { useState } from 'react';
import Header from '../Header/Header';
import donorImg from '../../Resources/blood-img-1.png'
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import PageTitle from '../Shared/PageTitle';
import Footer from '../Shared/Footer/Footer';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';
import { useEffect } from 'react';
import swal from 'sweetalert';


const BloodDonorRegistration = () => {

    const { register, formState: { errors }, handleSubmit, getValues, reset } = useForm();

    const [selectedDivision, setSelectedDivision] = useState("")
    const [selectedDistrict, setSelectedDistrict] = useState("")
    const [selectedUpazila, setSelectedUpazila] = useState("")
    const [selectedUnion, setSelectedUnion] = useState("")

    const status = "pending"

    const onSubmit = data => {
        const division = data?.division.split(',')[1]
        const district = data?.district.split(',')[1]
        const upazila = data?.upazila.split(',')[1]
        const union = data?.union.split(',')[1]
        const newData = { ...data, division, district, upazila, union, status }


        fetch('http://localhost:5000/donor-request', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    swal({
                    title: "Good job bravo!",
                    text: "Your submission has been sent",
                    icon: "success",
                    });
                    reset()
                } else {
                    toast.error("Submission failed")
                }
            })
    };
    useEffect(() => {
        toast.error("বিভাগ সিলেক্টে বিভাগ না পেলে ৩০ সেকেন্ড পরে আবার ট্রাই করুন।")
    }, [])

    const { data: divisionData, divisionIsLoading } = useQuery(['allDivisions'], () => fetch('http://localhost:5000/divisions', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    const { data: districtData, districtIsLoading } = useQuery(['allDistricts'], () => fetch('http://localhost:5000/districts', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    const { data: upazilaData, upazilaIsLoading } = useQuery(['allUpazilas'], () => fetch('http://localhost:5000/upazilasForForm', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    const { data: unionData, unionIsLoading } = useQuery(['allunions'], () => fetch('http://localhost:5000/unionsForForm', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    const { data: villageData, villageIsLoading } = useQuery(['allvillage'], () => fetch('http://localhost:5000/villagesForForm', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))


    const districtFilter = districtData?.districts?.filter((singleDistrict) => Number(singleDistrict.division_id) === Number(selectedDivision.split(",")[0]))
    const upazilaFilter = upazilaData?.upazilas?.filter((singleUpazila) => Number(singleUpazila.district_id) === Number(selectedDistrict.split(",")[0]))
    const unionFilter = unionData?.unions?.filter((singleUnion) => Number(singleUnion.upazila_id) === Number(selectedUpazila.split(",")[0]))
    const villageFilter = villageData?.villages?.filter((singleVillage) => Number(singleVillage.union_id) === Number(selectedUnion.split(",")[0]))

    if (divisionIsLoading || districtIsLoading || upazilaIsLoading || unionIsLoading || villageIsLoading) {
        return <Loading />
    }

    return (
        <div className='donor-registration-bg min-h-screen'>
            <Header></Header>
            <PageTitle title={"Blood Donor Registration"}></PageTitle>

            <div className="hero lg:mt-8">
                <div className="hero-content flex-col lg:flex-row">
                    <div className='lg:mr-3'>
                        <img src={donorImg} className="max-w-lg rounded-lg shadow-2xl hidden lg:block" alt='' />
                    </div>

                    <div className='lg:ml-3'>
                        <h1 className="text-4xl font-bold bangla-font text-white tracking-wide sm:text-5xl text-center">আপনার তথ্য দিন</h1>

                        <form onSubmit={handleSubmit(onSubmit)} autocomplete="off" >
                            <div className="form-control w-full max-w-xs lg:max-w-full">
                                <label className="label">
                                    <span className="label-text text-white bangla-font text-[16px]">আপনার নাম <span className='text-red-500 font-extrabold'>*</span></span>
                                </label>
                                <input type="text" placeholder="আপনার নাম লিখুন" className={`input input-sm input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.name && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Name is required"
                                        }
                                    })}
                                />
                                {
                                    errors.name && <label className="label">
                                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                    </label>
                                }
                            </div>

                            <div className='lg:flex'>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-white bangla-font text-[16px]">আপনার রক্তের গ্রুপ <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <select className={`select select-bordered select-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.bloodGroup && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("bloodGroup", {
                                            required: {
                                                value: true,
                                                message: "Blood Group is required"
                                            }
                                        })}
                                    >
                                        <option className='poppins-font' selected disabled value={""}>--Select Your Group--</option>
                                        <option className='poppins-font' value={"oPositive"}>O+</option>
                                        <option className='poppins-font' value={"oNegative"}>O-</option>
                                        <option className='poppins-font' value={"aPositive"}>A+</option>
                                        <option className='poppins-font' value={"aNegative"}>A-</option>
                                        <option className='poppins-font' value={"bPositive"}>B+</option>
                                        <option className='poppins-font' value={"bNegative"}>B-</option>
                                        <option className='poppins-font' value={"abPositive"}>AB+</option>
                                        <option className='poppins-font' value={"abNegative"}>AB-</option>
                                    </select>
                                    {
                                        errors?.bloodGroup && <label className="label">
                                            {errors.bloodGroup?.type === 'required' && <span className="label-text-alt text-red-500">{errors.bloodGroup.message}</span>}
                                        </label>
                                    }
                                </div>

                                <div className="form-control w-full max-w-xs lg:max-w-full lg:ml-5">
                                    <label className="label">
                                        <span className="label-text text-white bangla-font text-[16px]">জন্ম <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <input type="date" placeholder="Your Age" className={`input input-sm input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.age && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("age", {
                                            required: {
                                                value: true,
                                                message: "Age is required"
                                            }
                                        })}
                                    />
                                    {
                                        errors?.age && <label className="label">
                                            {errors.age?.type === 'required' && <span className="label-text-alt text-red-500">{errors.age.message}</span>}
                                        </label>
                                    }
                                </div>
                            </div>



                            <div className='lg:flex'>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-white bangla-font text-[16px]">ফোন নাম্বার <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <input type="number" name='number1' placeholder="EX: 01834567890" className={`input input-sm input-bordered w-full max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.number1 && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("number1", {
                                            required: {
                                                value: true,
                                                message: "Number is required"
                                            },
                                            minLength: {
                                                value: 11,
                                                message: 'Minimum length 11'
                                            },
                                            maxLength: {
                                                value: 11,
                                                message: 'Maximum length 11'
                                            }
                                        })}
                                    />
                                    {
                                        errors?.number1 && <label className="label">
                                            {errors?.number1 && <span className="label-text-alt text-red-500">{errors.number1.message}</span>}
                                        </label>
                                    }
                                </div>
                                <div className="form-control w-full max-w-xs lg:ml-5">
                                    <label className="label">
                                        <span className="label-text text-white bangla-font text-[16px]">দ্বিতীয় ফোন নাম্বার</span>
                                    </label>
                                    <input type="number" placeholder="(অপশনাল)" className={`input input-sm input-bordered w-full max-w-xs focus:ring-blue-500 focus:ring-1 ${errors.number2 && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("number2", {
                                            minLength: {
                                                value: 11,
                                                message: 'Minimum length 11'
                                            },
                                            maxLength: {
                                                value: 11,
                                                message: 'Maximum length 11'
                                            }
                                        })}
                                    />
                                    {
                                        errors?.number2 && <label className="label">
                                            {errors?.number2 && <span className="label-text-alt text-red-500">{errors.number2.message}</span>}
                                        </label>
                                    }
                                </div>
                            </div>

                            <div className="form-control w-full max-w-xs lg:max-w-full ">
                                <label className="label">
                                    <span className="label-text text-white bangla-font text-[16px]">লিঙ্গ <span className='text-red-500 font-extrabold'>*</span></span>
                                </label>
                                <select className={`select select-bordered select-sm focus:ring-blue-500 focus:ring-1 ${errors.gender && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                    {...register("gender", {
                                        required: {
                                            value: true,
                                            message: "Gender is required"
                                        }
                                    })}
                                >
                                    <option className='poppins-font' disabled selected value={""}>--Select Your Gender--</option>
                                    <option className='bangla-font' value={"পুরুষ"}>পুরুষ</option>
                                    <option className='bangla-font' value={"মহিলা"}>মহিলা</option>
                                    <option className='bangla-font' value={"তৃতীয়"}>তৃতীয় লিঙ্গ</option>
                                    <option className='bangla-font' value={"অজানা"}>বলতে চাই না</option>
                                </select>
                                {
                                    errors?.gender && <label className="label">
                                        {errors?.gender && <span className="label-text-alt text-red-500">{errors.gender.message}</span>}
                                    </label>
                                }
                            </div>

                            <p className='text-white mt-4 font-bold bangla-font text-[17px]'>ঠিকানা</p>

                            <div className='lg:flex'>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-white bangla-font text-[16px]">বিভাগ <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>

                                    <select defaultValue={selectedDivision} className={`bangla-font select select-bordered select-sm focus:ring-blue-500 focus:ring-1 ${errors.division && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("division", {
                                            required: {
                                                value: true,
                                                message: "Division is required"
                                            },
                                            onChange: (e) => setSelectedDivision(e.target.value)
                                        })}
                                    >
                                        <option className='poppins-font' disabled selected value={""}>--Select Your Division--</option>
                                        {divisionData?.divisions.map((division, index) =>
                                            <option className='bangla-font' key={index} value={[division.division_id, division.bn_name]}>{division.bn_name}</option>)}
                                    </select>
                                    {
                                        errors?.division && <label className="label">
                                            {errors?.division && <span className="label-text-alt text-red-500">{errors.division.message}</span>}
                                        </label>
                                    }
                                </div>

                                <div className="form-control w-full max-w-xs lg:ml-5">
                                    <label className="label">
                                        <span className="label-text text-white bangla-font text-[16px]">জেলা <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>

                                    <select defaultValue={selectedDistrict} className={`bangla-font select select-bordered select-sm focus:ring-blue-500 focus:ring-1 ${errors.district && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`} name='district'
                                        {...register("district", {
                                            required: {
                                                value: true,
                                                message: "District is required"
                                            },
                                            onChange: (e) => setSelectedDistrict(e.target.value)
                                        })}
                                    >
                                        <option className='poppins-font' disabled selected value={""}>--Select Your District--</option>
                                        {districtFilter?.map((district, index) =>
                                            <option className='bangla-font' key={index} value={[district.district_id, district.bn_name]}>{district.bn_name}</option>)
                                        }
                                    </select>
                                    {
                                        errors?.district && <label className="label">
                                            {errors?.district && <span className="label-text-alt text-red-500">{errors.district.message}</span>}
                                        </label>
                                    }
                                </div>
                            </div>

                            <div className="form-control w-full max-w-xs lg:max-w-full">
                                <label className="label">
                                    <span className="label-text text-white bangla-font text-[16px]">উপজেলা <span className='text-red-500 font-extrabold'>*</span></span>
                                </label>

                                <select defaultValue={selectedUpazila} className={`bangla-font select select-bordered select-sm focus:ring-blue-500 focus:ring-1 ${errors.upazila && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                    {...register("upazila", {
                                        required: {
                                            value: true,
                                            message: "Upazila Station is required"
                                        },
                                        onChange: (e) => setSelectedUpazila(e.target.value)
                                    })}
                                >
                                    <option className='poppins-font' disabled selected value={""}>--Select Your Upazila--</option>
                                    {upazilaFilter?.map((upazila, index) =>
                                        <option className='bangla-font' key={index} value={[upazila.upazila_id, upazila.bn_name]}>{upazila.bn_name}</option>)
                                    }
                                </select>
                                {
                                    errors?.upazila && <label className="label">
                                        {errors?.upazila && <span className="label-text-alt text-red-500">{errors.upazila.message}</span>}
                                    </label>
                                }
                            </div>

                            <div className='lg:flex'>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-white bangla-font text-[16px]">ইউনিয়ন <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>

                                    <select className={`bangla-font select select-bordered select-sm focus:ring-blue-500 focus:ring-1 ${errors.union && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("union", {
                                            required: {
                                                value: true,
                                                message: "Union is required"
                                            },
                                            onChange: (e) => setSelectedUnion(e.target.value)
                                        })}
                                    >
                                        <option className='poppins-font' disabled selected value={""}>--Select Your Union--</option>
                                        {unionFilter?.map((union, index) =>
                                            <option className='bangla-font' key={index} value={[union.union_id, union.bn_name]}>{union.bn_name}</option>)
                                        }
                                    </select>
                                    {
                                        errors?.union && <label className="label">
                                            {errors?.union && <span className="label-text-alt text-red-500">{errors.union.message}</span>}
                                        </label>
                                    }
                                </div>

                                <div className="form-control w-full max-w-xs lg:ml-5">
                                    <label className="label">
                                        <span className="label-text text-white bangla-font text-[16px]">গ্রাম <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>

                                    <select className={`bangla-font select select-bordered select-sm focus:ring-blue-500 focus:ring-1 ${errors.village && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`} name='village'
                                        {...register("village", {
                                            required: {
                                                value: true,
                                                message: "Village is required"
                                            }
                                        })}
                                    >
                                        <option className='poppins-font' disabled selected value={""}>--Select Your Village--</option>

                                        {villageFilter?.map((village, index) =>
                                            <option className='bangla-font' key={index} value={village.bn_name}>{village.bn_name}</option>)
                                        }
                                    </select>
                                    {
                                        errors?.village && <label className="label">
                                            {errors?.village && <span className="label-text-alt text-red-500">{errors.village.message}</span>}
                                        </label>
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
            <Footer />
        </div>
    );
};

export default BloodDonorRegistration;