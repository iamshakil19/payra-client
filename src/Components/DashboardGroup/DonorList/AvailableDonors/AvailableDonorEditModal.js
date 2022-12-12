import React from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

const AvailableDonorEditModal = ({ refetch, editDonorData, setEditDonorData }) => {
    const { donationCount, name, number2, gender, number1, bloodGroup, _id } = editDonorData

    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
        const donationNum = Number(data.donationCount)
        const newData = { ...data, donationCount: donationNum }
        fetch(`https://payra.onrender.com/donorInfo/${_id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    refetch()
                    setEditDonorData(null)
                    toast.success("Donor Info Updated")
                }
            })
    };

    const handleContactUpdateData = () => {
        setEditDonorData(null)
    }

    return (
        <div>
            <input type="checkbox" id="edit-donor-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label onClick={handleContactUpdateData} htmlFor="edit-donor-modal" className="btn btn-sm btn-circle bg-[#0F1631] absolute right-2 top-2">✕</label>
                    <h2 className="font-bold text-lg">Update Donor Info</h2>

                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className=''>
                                <div className="form-control w-full mx-auto max-w-xs ">
                                    <label className="label">
                                        <span className="label-text text-[#141C39] poppins-font"> Your Name <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <input defaultValue={name} type="text" placeholder="Type your name" className={`input h-10 input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.name && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
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
                                <div className="form-control w-full mx-auto max-w-xs ">
                                    <label className="label">
                                        <span className="label-text text-[#141C39] poppins-font"> Blood Group <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <select defaultValue={bloodGroup} id="" className={`input h-10 input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.bloodGroup && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("bloodGroup", {
                                            required: {
                                                value: true,
                                                message: "Blood Group is required"
                                            }
                                        })}
                                    >
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
                                        errors.bloodGroup && <label className="label">
                                            {errors.bloodGroup?.type === 'required' && <span className="label-text-alt text-red-500">{errors.bloodGroup.message}</span>}
                                        </label>
                                    }
                                </div>

                                <div className="form-control w-full mx-auto max-w-xs ">
                                    <label className="label">
                                        <span className="label-text text-[#141C39] poppins-font"> Gender <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <select defaultValue={gender} id="" className={`input h-10 input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.gender && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("gender", {
                                            required: {
                                                value: true,
                                                message: "Gender is required"
                                            }
                                        })}
                                    >
                                        <option className='bangla-font' value={"পুরুষ"}>পুরুষ</option>
                                        <option className='bangla-font' value={"মহিলা"}>মহিলা</option>
                                        <option className='bangla-font' value={"তৃতীয়"}>তৃতীয় লিঙ্গ</option>
                                        <option className='bangla-font' value={"অজানা"}>বলতে চাই না</option>
                                    </select>
                                    {
                                        errors.gender && <label className="label">
                                            {errors.gender?.type === 'required' && <span className="label-text-alt text-red-500">{errors.gender.message}</span>}
                                        </label>
                                    }
                                </div>

                                <div className="form-control mx-auto w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-[#141C39] poppins-font">Phone Number <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <input defaultValue={number1} type="number" placeholder="Type your Number" className={`input h-10 input-bordered w-full max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.number1 && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
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
                                            },

                                        })}
                                    />
                                    {
                                        errors?.number1 && <label className="label">
                                            {errors?.number1 && <span className="label-text-alt text-red-500">{errors.number1.message}</span>}
                                        </label>
                                    }
                                </div>

                                <div className="form-control mx-auto w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-[#141C39] poppins-font">Second Phone Number </span>
                                    </label>
                                    <input defaultValue={number2} type="number" placeholder="( Optional )" className={`input h-10 input-bordered w-full max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.number2 && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
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

                                <div className="form-control mx-auto w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-[#141C39] poppins-font">Total Donation </span>
                                    </label>
                                    <input defaultValue={donationCount} min={0} type="number" className={`input h-10 input-bordered w-full max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.number2 && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("donationCount", {
                                            required: {
                                                value: true,
                                                message: "Donation Count is required"
                                            }
                                        })}
                                    />
                                    {
                                        errors?.donationCount && <label className="label">
                                            {errors?.donationCount && <span className="label-text-alt text-red-500">{errors.donationCount.message}</span>}
                                        </label>
                                    }
                                </div>



                                <div className='w-full text-center sm:text-start sm:flex justify-end'>
                                    <input className='border cursor-pointer border-black rounded-lg sm:mt-9 w-full sm:w-28 max-w-xs lg:max-w-full mt-5 font-bold bg-[#0F1631] h-9 text-white transition-all duration-300 ease-in-out' type="submit" value="Update" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailableDonorEditModal;