import React from 'react';
import toast from 'react-hot-toast';
import Header from '../Header/Header';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';
import FrontEndContactCard from './FrontEndContactCard';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import PageTitle from '../Shared/PageTitle';

const Contact = () => {
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit, getValues } = useForm();
    const status = "incomplete"

    const { data: contacts, isLoading, refetch } = useQuery('contacts', () => fetch('http://localhost:5000/contacts', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }
    const top4Data = contacts.slice(0, 4)

    const onSubmit = data => {
        const newData = { ...data, status }

        fetch('http://localhost:5000/blood-request', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success("Your request has been sent")
                }
            })
    };

    const navigateToAllContact = () => {
        navigate('/all-contact')
    }

    return (
        <div className='donor-registration-bg min-h-screen'>
            <Header />
            <PageTitle title={"Contact For Blood"}></PageTitle>
            <div className="hero lg:mt-8">
                <div className="hero-content flex-col lg:flex-row">

                    <section>
                        <div className='lg:mr-3 mb-5'>

                            <h1 className="text-4xl font-bold bangla-font text-white tracking-wide sm:text-5xl text-center mb-3">জরুরি প্রয়োজনে কল করুন</h1>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>

                                {
                                    top4Data?.map(contact => <FrontEndContactCard
                                        key={contact._id}
                                        contact={contact}
                                    ></FrontEndContactCard>)
                                }
                            </div>
                            {contacts?.length > 4 &&
                                <div className='flex justify-center'>
                                    <button onClick={navigateToAllContact} className=' h-11 w-32 rounded-full mt-5 bg-white text-black font-bold hover:bg-[#FE3C47] hover:text-white transition-all duration-300 ease-in-out flex items-center justify-center'>
                                        <span className='poppins-font mr-1'>See More</span>
                                        <span className='ml-1'> <FaArrowRight /> </span>
                                    </button>
                                </div>
                            }
                        </div>
                    </section>

                    <section>
                        <div className='lg:ml-3'>
                            <h1 className="text-4xl font-bold bangla-font text-white tracking-wide sm:text-5xl text-center mb-3">রোগীর তথ্য দিন</h1>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control w-full max-w-xs lg:max-w-full">
                                    <label className="label">
                                        <span className="label-text text-white">রোগীর নাম <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <input type="text" placeholder="রোগীর নাম লিখুন" className={`input input-sm input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.patient_name && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("patient_name", {
                                            required: {
                                                value: true,
                                                message: "Patient name is required"
                                            }
                                        })}
                                    />
                                    {
                                        errors.patient_name && <label className="label">
                                            {errors.patient_name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.patient_name.message}</span>}
                                        </label>
                                    }
                                </div>

                                <div className='lg:flex'>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text text-white">রক্তের গ্রুপ <span className='text-red-500 font-extrabold'>*</span></span>
                                        </label>
                                        <select className={`select select-bordered select-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.requested_bloodGroup && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                            {...register("requested_bloodGroup", {
                                                required: {
                                                    value: true,
                                                    message: "Blood Group is required"
                                                }
                                            })}
                                        >
                                            <option selected disabled value={""}>--Select Blood Group--</option>
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
                                            errors?.requested_bloodGroup && <label className="label">
                                                {errors.requested_bloodGroup?.type === 'required' && <span className="label-text-alt text-red-500">{errors.requested_bloodGroup.message}</span>}
                                            </label>
                                        }
                                    </div>

                                    <div className="form-control w-full max-w-xs lg:max-w-full lg:ml-5">
                                        <label className="label">
                                            <span className="label-text text-white">রক্তদানের তারিখ ও সময় <span className='text-red-500 font-extrabold'>*</span></span>
                                        </label>
                                        <input type="datetime-local" placeholder="Your Age" className={`input input-sm input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.date && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                            {...register("date", {
                                                required: {
                                                    value: true,
                                                    message: "Date & time is required"
                                                }
                                            })}
                                        />
                                        {
                                            errors?.date && <label className="label">
                                                {errors.date?.type === 'required' && <span className="label-text-alt text-red-500">{errors.date.message}</span>}
                                            </label>
                                        }
                                    </div>
                                </div>

                                <div className='lg:flex'>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text text-white">রক্তের পরিমাণ <span className='text-red-500 font-extrabold'>*</span></span>
                                        </label>
                                        <select className={`select select-bordered select-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.blood_quantity && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                            {...register("blood_quantity", {
                                                required: {
                                                    value: true,
                                                    message: "Blood Bag quantity is required"
                                                }
                                            })}
                                        >
                                            <option selected disabled value={""}>--Blood Bag Quantity--</option>
                                            <option value={"1"}>1 ব্যাগ </option>
                                            <option value={"2"}>2 ব্যাগ</option>
                                            <option value={"3"}>3 ব্যাগ</option>
                                            <option value={"4"}>4 ব্যাগ</option>
                                            <option value={"5"}>5 ব্যাগ</option>
                                            <option value={"6"}>6 ব্যাগ</option>
                                            <option value={"6+"}>6+ ব্যাগ</option>
                                        </select>
                                        {
                                            errors?.blood_quantity && <label className="label">
                                                {errors.blood_quantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.blood_quantity.message}</span>}
                                            </label>
                                        }
                                    </div>
                                    <div className="form-control w-full max-w-xs lg:ml-5">
                                        <label className="label">
                                            <span className="label-text text-white">হিমোগ্লোবিন</span>
                                        </label>
                                        <input type="text" placeholder="(অপশনাল)" className={`input input-sm input-bordered w-full max-w-xs focus:ring-blue-500 focus:ring-1`}
                                            {...register("hemoglobin", {

                                            })}
                                        />
                                    </div>
                                </div>

                                <div className="form-control w-full max-w-xs lg:max-w-full">
                                    <label className="label">
                                        <span className="label-text text-white">সংক্ষেপে রোগীর সমস্যা লিখুন </span>
                                    </label>
                                    <input type="text" placeholder="(অপশনাল)" className={`input input-sm input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.patient_problem && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("patient_problem", {
                                            maxLength: {
                                                value: 20,
                                                message: 'Maximum length 20'
                                            }
                                        })}
                                    />
                                    {
                                        errors.patient_problem && <label className="label">
                                            {errors.patient_problem && <span className="label-text-alt text-red-500">{errors.patient_problem.message}</span>}
                                        </label>
                                    }
                                </div>

                                <p className='text-white mt-4 font-bold'>ঠিকানা</p>

                                <div className="form-control w-full max-w-xs lg:max-w-full">
                                    <label className="label">
                                        <span className="label-text text-white">রক্তদানের স্থান <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <input type="text" placeholder="রক্তদানের স্থানের নাম লিখুন" className={`input input-sm input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.donation_place && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("donation_place", {
                                            required: {
                                                value: true,
                                                message: "Blood donation place is required"
                                            },
                                            maxLength: {
                                                value: 30,
                                                message: 'Maximum length 30'
                                            }
                                        })}
                                    />
                                    {
                                        errors.donation_place && <label className="label">
                                            {errors.donation_place && <span className="label-text-alt text-red-500">{errors.donation_place.message}</span>}
                                        </label>
                                    }
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

                                <div>
                                    <input className='btn w-full max-w-xs lg:max-w-full mt-5 bg-white text-black font-bold hover:bg-[#FE3C47] hover:text-white transition-all duration-300 ease-in-out' type="submit" value="Submit" />
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Contact;