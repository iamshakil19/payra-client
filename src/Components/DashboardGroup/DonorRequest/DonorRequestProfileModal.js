import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { FiPhoneCall } from "react-icons/fi";
import { IncompleteBloodContext } from '../Dashboard/Dashboard';
import avatarImg from '../../../Resources/avatarImage.jpg'

const DonorRequestProfileModal = ({ profileDonorRequest, setProfileDonorRequest, refetch, setDonorData }) => {

    const { _id, name, bloodGroup, age, number1, number2, gender, division, district, upazila, union, village, status } = profileDonorRequest
    const [incompleteRefetch, setIncompleteRefetch] = useContext(IncompleteBloodContext)
    let newStatus = "verified"
    const acceptedTime = new Date()

    const handleProfileData = () => {
        setTimeout(() => {
            setProfileDonorRequest(null)
        }, 10)
    }

    const handleStatus = () => {
        const donorStatusInfo = {
            status: newStatus,
            acceptedTime: acceptedTime
        }
        fetch(`https://payra.onrender.com/donorStatus/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(donorStatusInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch()
                setIncompleteRefetch(current => !current)
                setProfileDonorRequest(null)
                toast.success('Donor Verified')
            })
    }

    return (
        <div className=''>
            <input type="checkbox" id="donor-request-profile-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box bg-[#F5F7FF]">
                    <label for="donor-request-profile-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div class="avatar w-full">
                        <div class="w-16 rounded-full ring ring-orange-500 ring-offset-base-100 ring-offset-2 text-center mx-auto">
                            <img src={avatarImg} alt='' />
                        </div>
                    </div>
                    <h2 className='text-center poppins-font mt-2 text-lg'> <span className='bangla-font'>নাম:
                    </span> <span className='font-bold text-green-600'>{name}</span>
                        {bloodGroup === "oPositive" &&
                            <span className='text-red-500 uppercase ml-2 font-bold'>(O+)</span>
                        }
                        {bloodGroup === "oNegative" &&
                            <span className='text-red-500 uppercase ml-2 font-bold'>(O-)</span>
                        }
                        {bloodGroup === "aPositive" &&
                            <span className='text-red-500 uppercase ml-2 font-bold'>(A+)</span>
                        }
                        {bloodGroup === "aNegative" &&
                            <span className='text-red-500 uppercase ml-2 font-bold'>(A-)</span>
                        }
                        {bloodGroup === "bPositive" &&
                            <span className='text-red-500 uppercase ml-2 font-bold'>(B+)</span>
                        }
                        {bloodGroup === "bNegative" &&
                            <span className='text-red-500 uppercase ml-2 font-bold'>(B-)</span>
                        }
                        {bloodGroup === "abPositive" &&
                            <span className='text-red-500 uppercase ml-2 font-bold'>(AB+)</span>
                        }
                        {bloodGroup === "abNegative" &&
                            <span className='text-red-500 uppercase ml-2 font-bold'>(AB-)</span>
                        }
                    </h2>
                    <p className='text-center'><span className='bangla-font'>বয়স:</span> <span className='font-semibold poppins-font'>{age}</span></p>

                    <div className='flex justify-center items-center mt-1 mb-2'>
                        <div>
                            <FiPhoneCall className='text-2xl text-right w-full mr-3 text-green-600 mt-1' />
                        </div>
                        <div className=' mt-1 ml-4 poppins-font'>
                            <p className='inline-block mr-2 font-bold'>{number1}, </p>
                            <p className='inline-block font-bold'>{number2 ? number2 : "..."}</p>
                        </div>
                    </div>

                    <div className='flex justify-around'>
                        <div>
                            <p className='mb-1 bangla-font'>বিভাগ: <span className='font-bold'>{division}</span></p>
                            <p className='mb-1 bangla-font'>জেলা: <span className='font-bold'>{district}</span></p>
                            <p className='mb-1 bangla-font'>উপজেলা: <span className='font-bold'>{upazila}</span></p>


                        </div>

                        <div className='text-right'>
                            <p className='mb-1 bangla-font'>লিঙ্গ: <span className='font-bold text-green-600'>{gender}</span></p>
                            <p className='mb-1 bangla-font'>ইউনিয়ন:  <span className='font-bold'>{union}</span></p>
                            <p className='mb-1'><span className='bangla-font'>গ্রাম: </span> <span className='bangla-font font-bold'>{village}</span></p>
                        </div>
                    </div>
                    <div className='flex justify-end mt-3'>
                        <label onClick={() => { setDonorData(profileDonorRequest); handleProfileData() }} for="donor-delete-modal" className='btn btn-sm bg-red-500 border-0 hover:bg-red-600'>Delete</label>

                        <label onClick={handleStatus} className='btn btn-sm  bg-green-600 border-0 hover:bg-green-700 ml-4'>Accept</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorRequestProfileModal;