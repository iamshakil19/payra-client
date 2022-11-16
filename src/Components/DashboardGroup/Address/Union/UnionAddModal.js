import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const UnionAddModal = ({ refetch, setIsUnionAddModal }) => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        const union_id = Number(data.union_id)
        const upazila_id = Number(data.upazila_id)
        const newData = { ...data, union_id, upazila_id }

        fetch('https://payra.onrender.com/unions', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(newData)
        })
            .then(res => {
                if (res.status === 403) {
                    setIsUnionAddModal(false)
                    toast.error('Super Admin Can Only Add Union')
                    reset()
                }
                return res.json()
            })
            .then(data => {
                if (data.insertedId) {
                    toast.success("Union added successfully")
                    refetch()
                    setIsUnionAddModal(false)
                    reset()
                }
            })
    };

    return (
        <div>
            <input type="checkbox" id="union-add-button" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label htmlFor="union-add-button" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-center mb-4">Add New Union</h3>

                    <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
                        <div className="form-control max-w-xs mx-auto">
                            <label className="label">
                                <span className="label-text text-black poppins-font text-[14px]">Union Name (English) <span className='text-red-500 font-extrabold'>*</span></span>
                            </label>
                            <input type="text" placeholder="ইউনিয়নের নাম (ইংরেজিতে)" className={`input input-sm input-bordered max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.name && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Union name is required"
                                    }
                                })}
                            />
                            {
                                errors.name && <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            }
                        </div>

                        <div className="form-control max-w-xs mx-auto">
                            <label className="label">
                                <span className="label-text text-black poppins-font text-[14px] mt-2">Union Name (Bangla) <span className='text-red-500 font-extrabold'>*</span></span>
                            </label>
                            <input type="text" placeholder="ইউনিয়নের নাম (বাংলায়)" className={`input input-sm input-bordered max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.bn_name && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                {...register("bn_name", {
                                    required: {
                                        value: true,
                                        message: "Union name is required"
                                    }
                                })}
                            />
                            {
                                errors.bn_name && <label className="label">
                                    {errors.bn_name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.bn_name.message}</span>}
                                </label>
                            }
                        </div>

                        <div className="form-control max-w-xs mx-auto">
                            <label className="label">
                                <span className="label-text text-black poppins-font text-[14px] mt-2">Union ID <span className='text-red-500 font-extrabold'>*</span></span>
                            </label>
                            <input type="number" placeholder="Union id" min={0} className={`input input-sm input-bordered max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.union_id && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                {...register("union_id", {
                                    required: {
                                        value: true,
                                        message: "Union id is required"
                                    }
                                })}
                            />
                            {
                                errors.union_id && <label className="label">
                                    {errors.union_id?.type === 'required' && <span className="label-text-alt text-red-500">{errors.union_id.message}</span>}
                                </label>
                            }
                        </div>

                        <div className="form-control max-w-xs mx-auto">
                            <label className="label">
                                <span className="label-text text-black poppins-font text-[14px] mt-2">Upazila ID <span className='text-red-500 font-extrabold'>*</span></span>
                            </label>
                            <input type="number" placeholder="Upazila id" min={0} className={`input input-sm input-bordered max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.upazila_id && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                {...register("upazila_id", {
                                    required: {
                                        value: true,
                                        message: "Upazila id is required"
                                    }
                                })}
                            />
                            {
                                errors.upazila_id && <label className="label">
                                    {errors.upazila_id?.type === 'required' && <span className="label-text-alt text-red-500">{errors.upazila_id.message}</span>}
                                </label>
                            }
                        </div>

                        <div className='text-center mt-3'>
                            <input className='border h-10 rounded-md border-[#0E1530] cursor-pointer input-sm max-w-xs w-full mt-5 bg-white text-black font-bold hover:bg-[#0E1530] hover:text-white transition-all duration-300 ease-in-out poppins-font' type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UnionAddModal;