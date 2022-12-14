import React from 'react';
import { MdDelete, MdEdit } from "react-icons/md";

const VillageRow = ({ village, index, setVillageDeleteData, setVillageEditData }) => {
    const { name, bn_name, union_id } = village
    return (
        <tr className='hover'>
            <th className='p-2 pl-4 poppins-font w-7 '>{index}</th>
            <td className='poppins-font p-2 '>{name}</td>
            <td className='bangla-font p-2 '>{bn_name}</td>
            <td className='poppins-font p-2 '>{union_id}</td>
            <td className='p-2'>
                <label onClick={() => { setVillageEditData(village) }} htmlFor="edit-village-modal" className=' w-8 h-8 text-center bg-indigo-200 text-xl text-indigo-800 border border-indigo-300 rounded-md cursor-pointer flex justify-center items-center hover:bg-indigo-500 hover:text-white hover:border-indigo-600 transition-all ease-in-out duration-200 mr-2'><span className=''><MdEdit /></span></label>
            </td>
            <td className='p-2'>
                <label onClick={() => setVillageDeleteData(village)} htmlFor="village-delete-modal" className='ml-2 w-8 h-8 text-center bg-red-200 text-xl text-red-500 border border-red-300 rounded-md cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white hover:border-red-600 transition-all ease-in-out duration-200'><span className=''><MdDelete /></span></label>
            </td>
        </tr>
    );
};

export default VillageRow;