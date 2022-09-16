import React from 'react';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";

const DonorRequestRow = ({ donorRequest, index, setDonorData, setProfileDonorRequest, refetch }) => {
    const { _id, name, profileImg, age, gender, number1, bloodGroup, union, village } = donorRequest

    let newStatus = "verified"

    const handleStatus = () => {
        const donorStatusInfo = {
            status: newStatus
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
                toast.success('Donor Verified')
            })
    }


    return (
        <tr className='hover'>
            <th className='p-2 pl-4 poppins-font w-7 '>{index}</th>
            <td className='p-2 pt-3 pb-1.5'>
                <div class="avatar cursor-pointer">
                    <div class="w-9 rounded-full ring ring-green-500 ring-offset-[#F5F7FF] ring-offset-2">
                        <label onClick={() => setProfileDonorRequest(donorRequest)} for="donor-request-profile-modal" className='cursor-pointer'>
                            <img src={profileImg} alt="" />
                        </label>
                    </div>
                </div>
            </td>
            <td className='poppins-font p-2 '>{name}</td>
            <td className='poppins-font uppercase p-2 '>{bloodGroup}</td>
            <td className='poppins-font p-2 '>{age}</td>
            <td className='bangla-font p-2 '>{gender}</td>
            <td className='poppins-font p-2 '>{number1}</td>
            <td className='bangla-font p-2 '>{union}</td>
            <td className='bangla-font p-2 '>{village}</td>
            <td className='p-2'><button onClick={handleStatus} className='btn btn-sm w-16 bg-green-600 border-0 hover:bg-green-700'>Accept</button></td>
            <td className='p-2'>
                <label onClick={() => setDonorData(donorRequest)} for="donor-request-delete-modal" className=' w-8 h-8 text-center bg-red-200 text-xl text-red-500 border border-red-300 rounded-md cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white hover:border-red-600 transition-all ease-in-out duration-200'><span className=''><MdDelete /></span></label>
            </td>
        </tr>
    );
};

export default DonorRequestRow;