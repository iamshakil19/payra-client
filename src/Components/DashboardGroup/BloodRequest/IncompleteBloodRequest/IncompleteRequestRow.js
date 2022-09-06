import React from 'react';
import toast from 'react-hot-toast';
import avatarImg from '../../../../Resources/avatarImage.jpg'

const IncompleteRequestRow = ({ incompleteSingleBloodRequest, refetch, index, setBloodRequestData, setBloodRequestProfileData }) => {

    const { _id, patient_name, date, blood_quantity, number1, number2, requested_bloodGroup, hemoglobin, patient_problem, donation_place } = incompleteSingleBloodRequest

    let newStatus = "done"

    const handleStatus = () => {
        const bloodRequestStatusInfo = {
            status: newStatus
        }
        fetch(`http://localhost:5000/blood-request-status/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bloodRequestStatusInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch()
                toast.success('blood Donation Complete')
            })
    }

    return (
        <tr className='hover'>
            <th className='p-2 pl-4 poppins-font w-7'>{index}</th>
            <td className='p-2 pt-3 pb-1.5'>
                <div class="avatar cursor-pointer">
                    <div class="w-9 rounded-full ring ring-green-500 ring-offset-[#F5F7FF] ring-offset-2">
                        <label onClick={() => setBloodRequestProfileData(incompleteSingleBloodRequest)} for="donor-request-profile-modal" className='cursor-pointer'>
                            <img src={avatarImg} alt="" />
                        </label>
                    </div>
                </div>
            </td>
            <td className='poppins-font p-2'>{patient_name}</td>
            <td className='poppins-font uppercase p-2'>{requested_bloodGroup}</td>
            <td className='poppins-font p-2'>{blood_quantity} <span className='bangla-font'>ব্যাগ</span> </td>
            <td className='poppins-font p-2'>{hemoglobin ? hemoglobin : <span className='bangla-font'>জানা নেই</span> }</td>
            <td className='bangla-font p-2'>{date}</td>
            <td className='bangla-font p-2'>{number1}</td>
            <td className='bangla-font p-2'>{patient_problem}</td>
            <td className='bangla-font p-2'>{donation_place}</td>
            <td className='p-2'><button onClick={handleStatus} className='btn btn-sm w-20 bg-green-600 border-0 hover:bg-green-700'>Complete</button></td>
            <td className='p-2'>
                <label onClick={() => setBloodRequestData(incompleteSingleBloodRequest)} for="incomplete-blood-request-delete-modal" className='btn btn-sm w-20 bg-red-500 border-0 hover:bg-red-600'>Delete</label>
            </td>
        </tr>
    );
};

export default IncompleteRequestRow;