import React from 'react';
import { FiPhoneCall } from "react-icons/fi";
import toast from 'react-hot-toast';
import maleUser from '../../../../Resources/male-user.png'
import femaleUser from '../../../../Resources/female-user.png'
import user from '../../../../Resources/user.png'

const UnavailableProfileModal = ({ unavailableDonorProfileData, setUnavailableDonorProfileData, refetch, daysProfile, hoursProfile }) => {

    const { donationCount, name, age, gender, number1, number2, bloodGroup, upazila, union, village, division, district, available, _id } = unavailableDonorProfileData

    const handleDonate = () => {
        fetch(`https://payra.onrender.com/handleAvailability/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                setUnavailableDonorProfileData(null)
                toast.success(`${name} is now available for Donation`)
            })
    }


    return (
        <div className=''>
            <input type="checkbox" id="available-donor-profile-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box bg-[#F5F7FF]">
                    <label for="available-donor-profile-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div class="avatar w-full">
                        <div class="w-16 rounded-full ring ring-orange-500 ring-offset-base-100 ring-offset-2 text-center mx-auto">
                            {gender === "পুরুষ" &&
                                <img src={maleUser} alt="" />
                            }
                            {gender === "মহিলা" &&
                                <img src={femaleUser} alt="" />
                            }
                            {gender === "তৃতীয়" &&
                                <img src={user} alt="" />
                            }
                            {gender === "অজানা" &&
                                <img src={user} alt="" />
                            }
                        </div>
                    </div>
                    <h2 className='text-center poppins-font mt-2 text-lg'> <span className='bangla-font'>নাম: </span>
                        <span className='font-bold text-green-600'>{name}</span>
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
                            <p className='mb-1 bangla-font'>ইউনিয়ন:  <span className='font-bold'>{union}</span></p>
                            <p className='mb-1'><span className='bangla-font'>গ্রাম: </span> <span className='bangla-font font-bold'>{village}</span></p>
                        </div>

                        <div className='text-right'>
                            <p className='mb-1 bangla-font'>লিঙ্গ: <span className='font-bold text-green-600'>{gender}</span></p>
                            <p className='mb-1 bangla-font'>মোট রক্তদান:  <span className='font-bold'>{donationCount} বার</span></p>
                            <p className='mb-1 bangla-font'>সময় বাকি: <span className='font-bold'>{daysProfile} D</span></p>
                            <p className='mb-1 bangla-font'>সম্পূর্ণ: <button onClick={handleDonate} className='btn btn-xs ml-4'>Done</button></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnavailableProfileModal;