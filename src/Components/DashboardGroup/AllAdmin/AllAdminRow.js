import React from 'react';
import { FaSuperpowers } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';

const AllAdminRow = ({ admin, refetch, index, setAdminDeleteData }) => {
    const { email, name, role } = admin

    const handlePromotion = () => {
        const adminPromotionInfo = {
            role: "superAdmin"
        }
        fetch(`https://payra.onrender.com/admin/accessibility/${email}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(adminPromotionInfo)
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Super Admin Can Only Create Super Admin')
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success(`Congratulations ${email} Is Now Super Admin`)
                }
            })
    }

    const handleDemotion = () => {
        const adminPromotionInfo = {
            role: "admin"
        }
        fetch(`https://payra.onrender.com/admin/accessibility/${email}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(adminPromotionInfo)
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Super Admin Can Only Demote To Admin')
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success(`Successfully ${email} Is Demote To Admin`)
                }
            })
    }


    return (
        <tr className='hover'>
            <th className='p-2 pl-4 poppins-font w-7 '>{index}</th>
            <td className='poppins-font p-2 '>{name}</td>
            <td className='poppins-font p-2 '>{email}</td>
            {role === "superAdmin" ?
                <td className='poppins-font p-2 capitalize flex items-center'> Super Admin <span className='text-lg ml-2 text-orange-600 py-2'> <FaSuperpowers /> </span></td>
                :
                <td className='poppins-font p-2 capitalize'>{role}</td>
            }
            <td className='p-2'>
                {role !== 'superAdmin' ?
                    <label onClick={handlePromotion} for="admin-confirmation-modal" className='btn btn-sm w-20 bg-green-600 border-0 hover:bg-green-700'>Promote</label>
                    :
                    email !== "shakilahmed.pure@gmail.com" && <label onClick={handleDemotion} for="admin-confirmation-modal" className='btn btn-sm w-20 bg-yellow-400 border-0 hover:bg-yellow-500'>Demote</label>
                }
            </td>
            <td className='p-2'>
                {email !== "shakilahmed.pure@gmail.com" && <label onClick={() => setAdminDeleteData(admin)} for="admin-delete-modal" className=' w-8 h-8 text-center bg-red-200 text-xl text-red-500 border border-red-300 rounded-md cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white hover:border-red-600 transition-all ease-in-out duration-200'><span className=''><MdDelete /></span></label>
                }
            </td>
        </tr>
    );
};

export default AllAdminRow;