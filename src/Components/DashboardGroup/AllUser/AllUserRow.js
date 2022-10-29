import React from 'react';
import { MdDelete } from "react-icons/md";
const AllUserRow = ({ user, refetch, setUserData, index, setAdminConfirmationData }) => {
    const { email, name, role } = user


    return (
        <tr className='hover'>
            <th className='p-2 pl-4 poppins-font w-7 '>{index}</th>
            <td className='poppins-font p-2 '>{name}</td>
            <td className='poppins-font p-2 '>{email}</td>
            <td className='p-2'>
                { (role !== 'admin' && role !== 'superAdmin') &&
                    <label onClick={() => setAdminConfirmationData(user)} for="admin-confirmation-modal" className='btn btn-sm w-16 bg-green-600 border-0 hover:bg-green-700'>Admin</label>
                }
            </td>
            <td className='p-2'>
                { email !== "shakilahmed.pure@gmail.com" ?
                    <label onClick={() => setUserData(user)} for="user-delete-modal" className=' w-8 h-8 text-center bg-red-200 text-xl text-red-500 border border-red-300 rounded-md cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white hover:border-red-600 transition-all ease-in-out duration-200'><span className=''><MdDelete/></span></label>
                    :
                    <p className='py-4'></p>
                }
            </td>
        </tr>
    );
};

export default AllUserRow;