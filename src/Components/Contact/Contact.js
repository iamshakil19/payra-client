import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Header from '../Header/Header';
import donorImg from '../../Resources/blood-img-1.png'

const Contact = () => {

    const { register, formState: { errors }, handleSubmit, getValues } = useForm();

    const status = "pending"
    const profileImg = "https://i.ibb.co/SJQGfx9/male.jpg"

    const onSubmit = data => {
        const newData = { ...data, status, profileImg }

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
                    toast.success("Your submission has been sent")
                } else {
                    toast.error("Submission failed")
                }
            })
    };

    return (
        <div className='donor-registration-bg min-h-screen'>
            <Header />
            <div className="hero lg:mt-8">
                <div className="hero-content flex-col lg:flex-row">
                    <div className='lg:mr-3'>
                        <img src={donorImg} className="max-w-lg rounded-lg shadow-2xl hidden lg:block" alt='' />
                    </div>

                    <div className='lg:ml-3'>
                        <h1 className="text-4xl font-bold bangla-font text-white tracking-wide sm:text-5xl text-center">আপনার তথ্য দিন</h1>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full max-w-xs lg:max-w-full">
                                <label className="label">
                                    <span className="label-text text-white">আপনার নাম <span className='text-red-500 font-extrabold'>*</span></span>
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
                                        <span className="label-text text-white">আপনার রক্তের গ্রুপ <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <select className={`select select-bordered select-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.bloodGroup && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("bloodGroup", {
                                            required: {
                                                value: true,
                                                message: "Blood Group is required"
                                            }
                                        })}
                                    >
                                        <option selected disabled value={""}>--Select Your Group--</option>
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
                                        errors?.bloodGroup && <label className="label">
                                            {errors.bloodGroup?.type === 'required' && <span className="label-text-alt text-red-500">{errors.bloodGroup.message}</span>}
                                        </label>
                                    }
                                </div>

                                <div className="form-control w-full max-w-xs lg:max-w-full lg:ml-5">
                                    <label className="label">
                                        <span className="label-text text-white">জন্ম <span className='text-red-500 font-extrabold'>*</span></span>
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
                                        <span className="label-text text-white">ফোন নাম্বার <span className='text-red-500 font-extrabold'>*</span></span>
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
                                        <span className="label-text text-white">দ্বিতীয় ফোন নাম্বার</span>
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
                                    <span className="label-text text-white">লিঙ্গ <span className='text-red-500 font-extrabold'>*</span></span>
                                </label>
                                <select className={`select select-bordered select-sm focus:ring-blue-500 focus:ring-1 ${errors.gender && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                    {...register("gender", {
                                        required: {
                                            value: true,
                                            message: "Gender is required"
                                        }
                                    })}
                                >
                                    <option disabled selected value={""}>--Select Your Gender--</option>
                                    <option value={"পুরুষ"}>পুরুষ</option>
                                    <option value={"মহিলা"}>মহিলা</option>
                                    <option value={"হিজড়া"}>বলতে চাই না</option>
                                </select>
                                {
                                    errors?.gender && <label className="label">
                                        {errors?.gender && <span className="label-text-alt text-red-500">{errors.gender.message}</span>}
                                    </label>
                                }
                            </div>

                            <p className='text-white mt-4 font-bold'>Address</p>

                            <div className='lg:flex'>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-white">বিভাগ <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>

                                    <select className={`select select-bordered select-sm focus:ring-blue-500 focus:ring-1 ${errors.division && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("division", {
                                            required: {
                                                value: true,
                                                message: "Division is required"
                                            }
                                        })}
                                    >
                                        <option disabled selected value={""}>--Select Your Division--</option>
                                        <option value={"বরিশাল"}>বরিশাল</option>
                                    </select>
                                    {
                                        errors?.division && <label className="label">
                                            {errors?.division && <span className="label-text-alt text-red-500">{errors.division.message}</span>}
                                        </label>
                                    }
                                </div>

                                <div className="form-control w-full max-w-xs lg:ml-5">
                                    <label className="label">
                                        <span className="label-text text-white">জেলা <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>

                                    <select className={`select select-bordered select-sm focus:ring-blue-500 focus:ring-1 ${errors.district && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`} name='district'
                                        {...register("district", {
                                            required: {
                                                value: true,
                                                message: "District is required"
                                            }
                                        })}
                                    >
                                        <option disabled selected value={""}>--Select Your District--</option>
                                        <option value={"বরিশাল"}>বরিশাল</option>
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
                                    <span className="label-text text-white">থানা <span className='text-red-500 font-extrabold'>*</span></span>
                                </label>

                                <select className={`select select-bordered select-sm focus:ring-blue-500 focus:ring-1 ${errors.policeStation && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                    {...register("policeStation", {
                                        required: {
                                            value: true,
                                            message: "Police Station is required"
                                        }
                                    })}
                                >
                                    <option disabled selected value={""}>--Select Your Police Station--</option>
                                    <option value={"আগৈলঝাড়া"}>আগৈলঝাড়া</option>
                                </select>
                                {
                                    errors?.policeStation && <label className="label">
                                        {errors?.policeStation && <span className="label-text-alt text-red-500">{errors.policeStation.message}</span>}
                                    </label>
                                }
                            </div>

                            <div className='lg:flex'>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-white">ইউনিয়ন <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>

                                    <select className={`select select-bordered select-sm focus:ring-blue-500 focus:ring-1 ${errors.union && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("union", {
                                            required: {
                                                value: true,
                                                message: "Union is required"
                                            }
                                        })}
                                    >
                                        <option disabled selected value={""}>--Select Your Union--</option>
                                        <option value={"বাগধা"}>বাগধা</option>
                                        <option value={"বাকাল"}>বাকাল</option>
                                        <option value={"গৈলা"}>গৈলা</option>
                                        <option value={"রাজিহার"}>রাজিহার</option>
                                        <option value={"রত্নপুর"}>রত্নপুর</option>
                                    </select>
                                    {
                                        errors?.union && <label className="label">
                                            {errors?.union && <span className="label-text-alt text-red-500">{errors.union.message}</span>}
                                        </label>
                                    }
                                </div>

                                <div className="form-control w-full max-w-xs lg:ml-5">
                                    <label className="label">
                                        <span className="label-text text-white">গ্রাম <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>

                                    <select className={`select select-bordered select-sm focus:ring-blue-500 focus:ring-1 ${errors.village && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`} name='village'
                                        {...register("village", {
                                            required: {
                                                value: true,
                                                message: "Village is required"
                                            }
                                        })}
                                    >
                                        <option disabled selected value={""}>--Select Your Village--</option>
                                        <option value={"জয়রামপট্টি"}>জয়রামপট্টি</option>
                                        <option value={"আমবৌলা"}>আমবৌলা</option>
                                        <option value={"খাজুরিয়া"}>খাজুরিয়া</option>
                                        <option value={"নিমারপাড়"}>নিমারপাড়</option>
                                        <option value={"বাগধা"}>বাগধা</option>
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
        </div>
    );
};

export default Contact;