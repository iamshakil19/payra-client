import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { MdCloudUpload } from "react-icons/md";

const AddContactForm = ({setIsFormSubmit}) => {
    const [fileError, setFileError] = useState(null)
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const imgStorageKey = '4d9a97f41d4a0d0b543b11f89f06f093';

    const onSubmit = data => {
        console.log(data);
        const fileSize = data?.image[0].size
        if (fileSize > 1000000) {
            setFileError('Maximum file size: 1 MB')
            return
        }
        else {
            setFileError(null)
            const image = data?.image[0];
            const formData = new FormData();
            formData.append('image', image);
            const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`

            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(result => {
                    if (result.success) {
                        const img = result.data.url;
                        const adminContact = {
                            name: data.name,
                            number1: data.number1,
                            number2: data.number2,
                            img: img
                        }
                        fetch('http://localhost:5000/admin-contact', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                authorization: `Bearer ${localStorage.getItem('accessToken')}`
                            },
                            body: JSON.stringify(adminContact)
                        })
                            .then(res => res.json())
                            .then(inserted => {
                                if (inserted.insertedId) {
                                    toast.success('Admin contact added successfully')
                                    reset();
                                    setIsFormSubmit(true)
                                }
                            })
                    }
                })
        }

    };
    return (
        <div>
            <h2 className='text-[#141C39] font-semibold text-xl mb-3 mt-5 poppins-font text-center sm:text-start'>Add Contact</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-3'>
                    <div className="form-control w-full mx-auto max-w-xs lg:max-w-full">
                        <label className="label">
                            <span className="label-text text-[#141C39]"> নাম <span className='text-red-500 font-extrabold'>*</span></span>
                        </label>
                        <input type="text" placeholder="নাম লিখুন" className={`input h-10 input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.name && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
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
                            <span className="label-text text-[#141C39]">ফোন নাম্বার <span className='text-red-500 font-extrabold'>*</span></span>
                        </label>
                        <input type="number" placeholder="EX: 01834567890" className={`input h-10 input-bordered w-full max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.number1 && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
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

                    <div className="form-control mx-auto w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-[#141C39]">দ্বিতীয় ফোন নাম্বার </span>
                        </label>
                        <input type="number" placeholder="(অপশনাল)" className={`input h-10 input-bordered w-full max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.number2 && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
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


                    <div className="form-control w-full xl:w-40 mx-auto xl:mx-0 max-w-xs lg:max-w-full">
                        <label htmlFor="img" className='bg-[#141C39] text-center h-10 border border-[#141C39] rounded-lg cursor-pointer mt-5 xl:mt-9'>
                            <span className='flex justify-center items-center mt-2 text-white'>
                                <span className='text-xl mx-1'><MdCloudUpload /></span> <span className='mx-1 font-semibold poppins-font text-sm'>Upload Image</span>
                            </span>
                        </label>

                        <input type="file" id='img' name='image'
                            accept="image/jpeg"
                            className={`input hidden h-10 input-bordered w-full max-w-xs lg:max-w-full `}
                            {...register("image", {
                                required: {
                                    value: true,
                                    message: "Image is required"
                                }
                            })}
                        />
                        {
                            errors.image && <label className="label">
                                {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                            </label>
                        }
                        {
                            fileError && <label className="label">
                                <span className="label-text-alt text-red-500">{fileError}</span>
                            </label>
                        }
                    </div>

                    <div className='w-full text-center sm:text-start'>
                        <input className='border cursor-pointer border-black rounded-lg xl:mt-9 w-full sm:w-40 max-w-xs lg:max-w-full mt-5 bg-white text-black font-bold hover:bg-[#0F1631] h-10 hover:text-white transition-all duration-300 ease-in-out' type="submit" value="Add" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddContactForm;