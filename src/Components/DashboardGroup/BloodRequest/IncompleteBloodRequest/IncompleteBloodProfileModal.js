import React, { useContext } from 'react';
import toast from 'react-hot-toast';

import { FiPhoneCall } from "react-icons/fi";
import { IncompleteBloodContext } from '../../Dashboard/Dashboard';
import user from '../../../../Resources/user.png'


const IncompleteBloodProfileModal = ({ bloodRequestProfileData, setBloodRequestProfileData, refetch, setBloodRequestData }) => {
    const { _id, patient_name, date, blood_quantity, number1, number2, requested_bloodGroup, hemoglobin, patient_problem, donation_place } = bloodRequestProfileData

    const [incompleteRefetch, setIncompleteRefetch] = useContext(IncompleteBloodContext)
    const newStatus = "done"
    const submissionTime = new Date()
    const handleProfileData = () => {
        setTimeout(() => {
            setBloodRequestProfileData(null)
        }, 10)
    }

    const handleStatus = () => {
        const bloodRequestStatusInfo = {
            status: newStatus,
            submissionTime: submissionTime
        }
        fetch(`https://payra.onrender.com/blood-request-status/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bloodRequestStatusInfo)
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                setIncompleteRefetch(current => !current)
                setBloodRequestProfileData(null)
                toast.success('Blood Donation Complete')
            })
    }


    return (
        <div className=''>
            <input type="checkbox" id="incomplete-blood-request-profile-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box bg-[#F5F7FF]">
                    <label htmlFor="incomplete-blood-request-profile-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="avatar w-full">
                        <div className="w-16 rounded-full ring ring-orange-500 ring-offset-base-100 ring-offset-2 text-center mx-auto">
                            <img src={user} alt='' />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='text-start'>
                            <h2 className=' poppins-font mt-2 text-lg'> <span className='bangla-font'>রোগীর নাম: </span> <span className='font-bold text-green-600'>{patient_name}</span></h2>
                            <p className=''><span className='bangla-font'>রক্তের গ্রুপ: </span>
                                {requested_bloodGroup === "oPositive" &&
                                    <span className='text-red-500 uppercase font-bold'>(O+)</span>
                                }
                                {requested_bloodGroup === "oNegative" &&
                                    <span className='text-red-500 uppercase font-bold'>(O-)</span>
                                }
                                {requested_bloodGroup === "aPositive" &&
                                    <span className='text-red-500 uppercase font-bold'>(A+)</span>
                                }
                                {requested_bloodGroup === "aNegative" &&
                                    <span className='text-red-500 uppercase font-bold'>(A-)</span>
                                }
                                {requested_bloodGroup === "bPositive" &&
                                    <span className='text-red-500 uppercase font-bold'>(B+)</span>
                                }
                                {requested_bloodGroup === "bNegative" &&
                                    <span className='text-red-500 uppercase font-bold'>(B-)</span>
                                }
                                {requested_bloodGroup === "abPositive" &&
                                    <span className='text-red-500 uppercase font-bold'>(AB+)</span>
                                }
                                {requested_bloodGroup === "abNegative" &&
                                    <span className='text-red-500 uppercase font-bold'>(AB-)</span>
                                }
                            </p>
                            <p className=''><span className='bangla-font'>রক্তদানের তারিখ:</span> <span className='font-semibold poppins-font'>{date}</span></p>

                            <div className='flex justify-center items-center mt-1 mb-2'>
                                <div>
                                    <FiPhoneCall className='text-2xl text-right w-full mr-3 text-green-600 mt-1' />
                                </div>
                                <div className=' mt-1 ml-4 poppins-font'>
                                    <p className='inline-block mr-2 font-bold'>{number1}, </p>
                                    <p className='inline-block font-bold'>{number2 ? number2 : "..."}</p>
                                </div>
                            </div>
                            <p className='mb-1 bangla-font'>রক্তের পরিমাণ: <span className='font-bold text-red-500 text-lg'>{blood_quantity}</span> <span className='font-bold'>ব্যাগ</span> </p>
                            <p className='mb-1 bangla-font'>রক্তদানের স্থান: <span className='font-bold'>{donation_place}</span></p>
                            <p className='mb-1 bangla-font'>হিমোগ্লোবিন: <span className='font-bold '> {hemoglobin ? hemoglobin : <span className='bangla-font'>জানা নেই</span>}</span></p>
                            <p className='mb-1 bangla-font'>রোগীর সমস্যা:  <span className='font-bold'>{patient_problem}</span></p>
                            <div className='mb-1 bangla-font flex'>স্টাটাস:
                                <div className="flex items-center justify-start ml-2">
                                    <div className="w-5 h-5 border-b-2 border-orange-600 rounded-full animate-spin"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end mt-3'>
                        <label onClick={() => { setBloodRequestData(bloodRequestProfileData); handleProfileData() }} htmlFor="incomplete-blood-request-delete-modal" className='btn btn-sm w-20 bg-red-500 border-0 hover:bg-red-600'>Decline</label>

                        <label onClick={handleStatus} className='btn btn-sm w-20 bg-green-600 border-0 hover:bg-green-700 ml-4'>Done</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default IncompleteBloodProfileModal;