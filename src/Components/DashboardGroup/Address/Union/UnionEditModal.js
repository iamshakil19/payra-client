import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const UnionEditModal = ({ setUnionEditData, refetch, unionEditData }) => {

    const { bn_name, name, upazila_id, union_id, _id } = unionEditData
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
        const upazilaIdNum = Number(data.upazila_id)
        const unionIdNum = Number(data.union_id)
        const newData = { ...data, upazila_id: upazilaIdNum, union_id: unionIdNum }

        fetch(`http://localhost:5000/unions/${_id}`, {
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
                    setUnionEditData(null)
                    toast.success("Union Info Updated")
                }
            })
    };

    const handleUpazilaUpdateData = () => {
        setUnionEditData(null)
    }
    return (
        <div>
            <input type="checkbox" id="edit-union-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label onClick={handleUpazilaUpdateData} htmlFor="edit-union-modal" className="btn btn-sm btn-circle bg-[#0F1631] absolute right-2 top-2">✕</label>
                    <h2 className="font-bold text-lg">Update Upazila Info</h2>

                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className=''>
                                <div className="form-control w-full mx-auto max-w-xs ">
                                    <label className="label">
                                        <span className="label-text text-[#141C39] poppins-font">Union Name (English) <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <input defaultValue={name} type="text" placeholder="Type Upazila Name (English)" className={`input h-10 input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.name && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: "Union is required"
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
                                        <span className="label-text text-[#141C39] poppins-font">Union Name (Bangla)  <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <input defaultValue={bn_name} type="text" placeholder="Type Upazila Name (Bangla)" className={`input h-10 input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.bn_name && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("bn_name", {
                                            required: {
                                                value: true,
                                                message: "Union Bangla name is required"
                                            }
                                        })}
                                    />
                                    {
                                        errors.bn_name && <label className="label">
                                            {errors.bn_name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.bn_name.message}</span>}
                                        </label>
                                    }
                                </div>

                                <div className="form-control mx-auto w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-[#141C39] poppins-font">Union ID <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <input defaultValue={union_id} type="number" placeholder="Type your Number" className={`input h-10 input-bordered w-full max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.union_id && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("union_id", {

                                            required: {
                                                value: true,
                                                message: "Union id required"
                                            }
                                        })}
                                    />
                                    {
                                        errors?.union_id && <label className="label">
                                            {errors?.union_id && <span className="label-text-alt text-red-500">{errors.union_id.message}</span>}
                                        </label>
                                    }
                                </div>

                                <div className="form-control mx-auto w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-[#141C39] poppins-font">Upazila ID <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <input defaultValue={upazila_id} type="number" placeholder="( Optional )" className={`input h-10 input-bordered w-full max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.upazila_id && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("upazila_id", {
                                            required: {
                                                value: true,
                                                message: "Upazila id required"
                                            }
                                        })}
                                    />
                                    {
                                        errors?.upazila_id && <label className="label">
                                            {errors?.upazila_id && <span className="label-text-alt text-red-500">{errors.upazila_id.message}</span>}
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

export default UnionEditModal;