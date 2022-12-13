import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const DonateModal = ({ setDonateModal, refetch, donateModal }) => {
    const { _id } = donateModal
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
        const date = new Date(new Date().getTime() + (90 * 24 * 60 * 60 * 1000));
        const donateTime = date.toLocaleDateString();
        const donateButtonClickTime = new Date()

        const bloodRequestStatusInfo = {
            donateTime: donateTime,
            donateButtonClickTime: donateButtonClickTime,
            note: Number(data.note)
        }

        fetch(`http://localhost:5000/donationCount/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(bloodRequestStatusInfo)
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                setDonateModal(null)
                toast.success('Blood Donation Counted')
            })
    }

    const handleContactUpdateData = () => {
        setDonateModal(null)
    }

    return (
        <div>
            <input type="checkbox" id="donate-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label onClick={handleContactUpdateData} htmlFor="donate-modal" className="btn btn-sm btn-circle bg-[#0F1631] absolute right-2 top-2">✕</label>
                    <h2 className="font-bold text-lg">Donate</h2>

                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className=''>
                                <div className="form-control w-full mx-auto max-w-xs ">
                                    <label className="label">
                                        <span className="label-text text-[#141C39]">Total Day After Donation </span>
                                    </label>
                                    <input defaultValue={0} min={0} type="number" className={`input h-10 input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1`}
                                        {...register("note")}
                                    />
                                </div>
                                <div className='w-full text-center sm:text-start sm:flex justify-end'>
                                    <input className='border cursor-pointer border-black rounded-lg sm:mt-9 w-full sm:w-28 max-w-xs lg:max-w-full mt-5 font-bold bg-[#0F1631] h-9 text-white transition-all duration-300 ease-in-out' type="submit" value="Donate" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonateModal;