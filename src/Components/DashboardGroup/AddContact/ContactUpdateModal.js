import React from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

const ContactUpdateModal = ({ contactUpdateData, setContactUpdateData, refetch }) => {

    const { _id, name, number1, number2 } = contactUpdateData

    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
        fetch(`http://localhost:5000/contact/${_id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {

                if (data.success) {
                    refetch()
                    setContactUpdateData(null)
                    toast.success("Contact Updated")
                }
            })
    };

    const handleContactUpdateData = () => {
        setContactUpdateData(null)
    }

    return (
        <div>
            <input type="checkbox" id="contact-update-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label onClick={handleContactUpdateData} htmlFor="contact-update-modal" className="btn btn-sm btn-circle bg-[#0F1631] absolute right-2 top-2">✕</label>
                    <h2 className="font-bold text-lg">Update Your Contact Info</h2>

                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className=''>
                                <div className="form-control w-full mx-auto max-w-xs ">
                                    <label className="label">
                                        <span className="label-text text-[#141C39]"> Your Name <span className='text-red-500 font-extrabold'>*</span></span>
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
                                <div className="form-control mx-auto w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-[#141C39]">Phone Number <span className='text-red-500 font-extrabold'>*</span></span>
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
                                        <span className="label-text text-[#141C39]">Second Phone Number </span>
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

export default ContactUpdateModal;