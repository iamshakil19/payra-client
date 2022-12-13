import React, { useEffect, useRef, useState } from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import toast from 'react-hot-toast';
import maleUser from '../../../../Resources/male-user.png'
import femaleUser from '../../../../Resources/female-user.png'
import user from '../../../../Resources/user.png'

const UnavailableListRow = ({ donorSingleData, index, setUnavailableDonorData, setUnavailableDonorProfileData, refetch, setDaysProfile, setHoursProfile, setEditUnavailableDonor }) => {

    const { donationCount, name, age, gender, number1, bloodGroup, upazila, union, village, _id, time, note } = donorSingleData

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
                <div className="avatar cursor-pointer">
                    <div className="w-9 rounded-full ring ring-orange-500 ring-offset-[#F5F7FF] ring-offset-2">
                        <label onClick={() => setUnavailableDonorProfileData(donorSingleData)} htmlFor="available-donor-profile-modal" className='cursor-pointer'>
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
            <td className='bangla-font p-2'>{gender}</td>
            <td className='poppins-font p-2'>{number1}</td>
            <td className='bangla-font p-2'>{upazila}</td>
            <td className='bangla-font p-2'>{union}</td>
            <td className='bangla-font p-2'>{village}</td>
            <td className='bangla-font p-2'>{donationCount} বার</td>
            <td className='bangla-font p-2'>
                <label onClick={() => setEditUnavailableDonor(donorSingleData)} htmlFor="edit-unavailableDonor-modal" className=' w-8 h-8 text-center bg-indigo-200 text-xl text-indigo-800 border border-indigo-300 rounded-md cursor-pointer flex justify-center items-center hover:bg-indigo-500 hover:text-white hover:border-indigo-600 transition-all ease-in-out duration-200'><span className=''><MdEdit /></span></label>
            </td>
            <td className='bangla-font p-2'>{days} D : {hours} H : {minutes} M</td>
            <td className='bangla-font p-2 relative'><button onClick={handleDonate} className='btn btn-sm bg-red-500 hover:bg-red-700 border-0'>Done</button>
                {note > 0 &&
                    <div className="badge poppins-font absolute -left-3 top-0">{note}</div>}
            </td>
            <td className='p-2'>
                <label onClick={() => setUnavailableDonorData(donorSingleData)} htmlFor="donor-delete-modal" className=' w-8 h-8 text-center bg-red-200 text-xl text-red-500 border border-red-300 rounded-md cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white hover:border-red-600 transition-all ease-in-out duration-200'><span className=''><MdDelete /></span></label>
            </td>
        </tr>
    );
};

export default UnavailableListRow;