import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const UpazilaEditModal = ({ upazilaEditData, refetch, setUpazilaEditData }) => {
    const {_id, upazila_id, district_id, name, bn_name} = upazilaEditData
    console.log(upazilaEditData);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
        const upazilaIdNum = Number(data.upazila_id)
        const districtIdNum = Number(data.district_id)
        const newData = { ...data, upazila_id: upazilaIdNum, district_id: districtIdNum }

        fetch(`http://localhost:5000/upazilas/${_id}`, {
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
                    setUpazilaEditData(null)
                    toast.success("Upazila Info Updated")
                }
            })
    };


    const handleUpazilaUpdateData = () => {
        setUpazilaEditData(null)
    }

    return (
        <div>
            <input type="checkbox" id="edit-upazila-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label onClick={handleUpazilaUpdateData} htmlFor="edit-upazila-modal" className="btn btn-sm btn-circle bg-[#0F1631] absolute right-2 top-2">✕</label>
                    <h2 className="font-bold text-lg">Update Upazila Info</h2>

                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className=''>
                                <div className="form-control w-full mx-auto max-w-xs ">
                                    <label className="label">
                                        <span className="label-text text-[#141C39] poppins-font">Upazila Name (English) <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <input defaultValue={name} type="text" placeholder="Type Upazila Name (English)" className={`input h-10 input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.name && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
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
                                        <span className="label-text text-[#141C39] poppins-font">Upazila Name (Bangla)  <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <input defaultValue={bn_name} type="text" placeholder="Type Upazila Name (Bangla)" className={`input h-10 input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.bn_name && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("bn_name", {
                                            required: {
                                                value: true,
                                                message: "Name is required"
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
                                        <span className="label-text text-[#141C39] poppins-font">Upazila ID <span className='text-red-500 font-extrabold'>*</span></span>
                                    </label>
                                    <input defaultValue={upazila_id} type="number" placeholder="Type your Number" className={`input h-10 input-bordered w-full max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.upazila_id && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("upazila_id", {

                                            required: {
                                                value: true,
                                                message: "Number is required"
                                            }
                                        })}
                                    />
                                    {
                                        errors?.upazila_id && <label className="label">
                                            {errors?.upazila_id && <span className="label-text-alt text-red-500">{errors.upazila_id.message}</span>}
                                        </label>
                                    }
                                </div>

                                <div className="form-control mx-auto w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-[#141C39] poppins-font">District ID </span>
                                    </label>
                                    <input defaultValue={district_id} type="number" placeholder="( Optional )" className={`input h-10 input-bordered w-full max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.district_id && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                        {...register("district_id", {
                                            required: {
                                                value: true,
                                                message: "Number is required"
                                            }
                                        })}
                                    />
                                    {
                                        errors?.district_id && <label className="label">
                                            {errors?.district_id && <span className="label-text-alt text-red-500">{errors.district_id.message}</span>}
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

export default UpazilaEditModal;