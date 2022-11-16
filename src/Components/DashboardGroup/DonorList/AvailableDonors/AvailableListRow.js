import React, { useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import avatarImg from '../../../../Resources/avatarImage.jpg'

const AvailableListRow = ({ donorSingleData, index, setAvailableDonorData, setAvailableDonorProfileData, refetch }) => {
    const { donationCount, name, age, gender, number1, bloodGroup, upazila, union, village, _id } = donorSingleData

    const handleDonate = () => {
        const date = new Date(new Date().getTime() + (90 * 24 * 60 * 60 * 1000));
        const donateTime = date.toLocaleDateString();

        const donateButtonClickTime = new Date()

        const bloodRequestStatusInfo = {
            donateTime: donateTime,
            donateButtonClickTime: donateButtonClickTime
        }
        fetch(`https://payra.onrender.com/donationCount/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(bloodRequestStatusInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch()
                toast.success('Blood Donation Counted')
            })
    }

    return (
        <tr className='hover'>
            <th className='p-2 pl-4 poppins-font w-7'>{index}</th>
            <td className='p-2 pt-3 pb-1.5'>
                <div class="avatar cursor-pointer">
                    <div class="w-9 rounded-full ring ring-green-500 ring-offset-[#F5F7FF] ring-offset-2">
                        <label onClick={() => setAvailableDonorProfileData(donorSingleData)} for="available-donor-profile-modal" className='cursor-pointer'>
                            <img src={avatarImg} alt="" />
                        </label>
                    </div>
                </div>
            </td>
            <td className='poppins-font p-2'>{name}</td>
            {bloodGroup === "oPositive" &&
                <td className='poppins-font uppercase p-2 '>O+</td>
            }
            {bloodGroup === "oNegative" &&
                <td className='poppins-font uppercase p-2 '>O-</td>
            }
            {bloodGroup === "aPositive" &&
                <td className='poppins-font uppercase p-2 '>A+</td>
            }
            {bloodGroup === "aNegative" &&
                <td className='poppins-font uppercase p-2 '>A-</td>
            }
            {bloodGroup === "bPositive" &&
                <td className='poppins-font uppercase p-2 '>B+</td>
            }
            {bloodGroup === "bNegative" &&
                <td className='poppins-font uppercase p-2 '>B-</td>
            }
            {bloodGroup === "abPositive" &&
                <td className='poppins-font uppercase p-2 '>AB+</td>
            }
            {bloodGroup === "abNegative" &&
                <td className='poppins-font uppercase p-2 '>AB-</td>
            }
            <td className='poppins-font p-2'>{age}</td>
            <td className='bangla-font p-2'>{gender}</td>
            <td className='poppins-font p-2'>{number1}</td>
            <td className='bangla-font p-2'>{upazila}</td>
            <td className='bangla-font p-2'>{union}</td>
            <td className='bangla-font p-2'>{village}</td>
            <td className='bangla-font p-2'>{donationCount} বার</td>
            <td className='bangla-font p-2'><span onClick={() => handleDonate()} className='btn btn-sm'>Donate</span></td>
            <td className='p-2'>
                <label onClick={() => { setAvailableDonorData(donorSingleData) }} for="donor-delete-modal" className=' w-8 h-8 text-center bg-red-200 text-xl text-red-500 border border-red-300 rounded-md cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white hover:border-red-600 transition-all ease-in-out duration-200'><span className=''><MdDelete /></span></label>
            </td>
        </tr>
    );
};

export default AvailableListRow;