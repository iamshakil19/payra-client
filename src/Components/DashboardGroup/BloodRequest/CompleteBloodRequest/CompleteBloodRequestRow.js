import React from 'react';
import avatarImg from '../../../../Resources/avatarImage.jpg'
import { BsCheckCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const CompleteBloodRequestRow = ({completeSingleBloodRequest, refetch, index, setBloodRequestDeleteData, setBloodRequestProfileData}) => {
    
    const { _id, patient_name, date, blood_quantity, number1, number2, requested_bloodGroup, hemoglobin, patient_problem, donation_place } = completeSingleBloodRequest

    return (
        <tr className='hover'>
            <th className='p-2 pl-4 poppins-font w-7 '>{index}</th>
            <td className='p-2 pt-3 pb-1.5'>
                <div class="avatar cursor-pointer">
                    <div class="w-9 rounded-full ring ring-green-500 ring-offset-[#F5F7FF] ring-offset-2">
                        <label onClick={() => setBloodRequestProfileData(completeSingleBloodRequest)} for="complete-blood-profile-modal" className='cursor-pointer'>
                            <img src={avatarImg} alt="" />
                        </label>
                    </div>
                </div>
            </td>
            <td className='poppins-font p-2 '>{patient_name}</td>
            <td className='poppins-font uppercase p-2 '>{requested_bloodGroup}</td>
            <td className='poppins-font p-2 '>{blood_quantity} <span className='bangla-font'>ব্যাগ</span> </td>
            <td className='poppins-font p-2 '>{hemoglobin ? hemoglobin : <span className='bangla-font'>জানা নেই</span> }</td>
            <td className='bangla-font p-2 '>{date}</td>
            <td className='bangla-font p-2 '>{number1}</td>
            <td className='bangla-font p-2 '>{patient_problem}</td>
            <td className='bangla-font p-2 '>{donation_place}</td>
            <td className='p-2 text-xl text-green-600'> <BsCheckCircleFill/> </td>
            <td className='p-2'>
                <label onClick={() => setBloodRequestDeleteData(completeSingleBloodRequest)} for="complete-blood-request-delete-modal" className=' w-8 h-8 text-center bg-red-200 text-xl text-red-500 border border-red-300 rounded-md cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white hover:border-red-600 transition-all  ease-in-out duration-200'><span className=''><MdDelete/></span></label>
            </td>
        </tr>
    );
};

export default CompleteBloodRequestRow;