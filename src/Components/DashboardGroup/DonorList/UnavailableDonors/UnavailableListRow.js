import React, { useEffect, useRef, useState } from 'react';
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';


const UnavailableListRow = ({ donorSingleData, index, setUnavailableDonorData, setUnavailableDonorProfileData, refetch, setDaysProfile, setHoursProfile }) => {

    const { donationCount, name, profileImg, age, gender, number1, bloodGroup, policeStation, union, village, _id, time } = donorSingleData

    const handleDonate = () => {
        fetch(`http://localhost:5000/handleAvailability/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                toast.success(`${name} is now available for Donation`)
            })
    }

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {

        const target = new Date(time)
        const interval = setInterval(() => {
            const now = new Date()
            const difference = target.getTime() - now.getTime()

            const d = Math.floor(difference / (1000 * 60 * 60 * 24))
            setDays(d)
            setDaysProfile(d)
            const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            setHours(h)
            setHoursProfile(h)
            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
            setMinutes(m)
            const s = Math.floor((difference % (1000 * 60)) / 1000)
            setSeconds(s)

            if (d <= 0 && h <= 0 && m <= 0 && s <= m) {
                handleDonate()
                return clearInterval(interval)
            }
        }, 1000)
        return () => clearInterval(interval)

    }, [])


    return (
        <tr className='hover'>
            <th className='p-2 pl-4 poppins-font w-7'>{index}</th>
            <td className='p-2 pt-3 pb-1.5'>
                <div class="avatar cursor-pointer">
                    <div class="w-9 rounded-full ring ring-orange-500 ring-offset-[#F5F7FF] ring-offset-2">
                        <label onClick={() => setUnavailableDonorProfileData(donorSingleData)} for="available-donor-profile-modal" className='cursor-pointer'>
                            <img src={profileImg} alt="" />
                        </label>
                    </div>
                </div>
            </td>
            <td className='poppins-font p-2'>{name}</td>
            <td className='poppins-font uppercase p-2'>{bloodGroup}</td>
            <td className='poppins-font p-2'>{age}</td>
            <td className='bangla-font p-2'>{gender}</td>
            <td className='poppins-font p-2'>{number1}</td>
            <td className='bangla-font p-2'>{policeStation}</td>
            <td className='bangla-font p-2'>{union}</td>
            <td className='bangla-font p-2'>{village}</td>
            <td className='bangla-font p-2'>{donationCount} বার</td>
            <td className='bangla-font p-2'>{days} D : {hours} H : {minutes} M : {seconds} S</td>
            <td className='bangla-font p-2'><button onClick={handleDonate} className='btn btn-sm'>Done</button></td>
            <td className='p-2'>
                <label onClick={() => setUnavailableDonorData(donorSingleData)} for="donor-delete-modal" className=' w-8 h-8 text-center bg-red-200 text-xl text-red-500 border border-red-300 rounded-md cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white hover:border-red-600 transition-all ease-in-out duration-200'><span className=''><MdDelete /></span></label>
            </td>
        </tr>
    );
};

export default UnavailableListRow;