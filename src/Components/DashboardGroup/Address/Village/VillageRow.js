import React from 'react';
import { MdDelete } from "react-icons/md";

const VillageRow = ({ village, index, refetch, setVillageDeleteData }) => {
    const { name, bn_name, union_id } = village
    return (
        <tr className='hover'>
            <th className='p-2 pl-4 poppins-font w-7 '>{index}</th>
            <td className='poppins-font p-2 '>{name}</td>
            <td className='bangla-font p-2 '>{bn_name}</td>
            <td className='poppins-font p-2 '>{union_id}</td>
            <td className='p-2'>
                <label onClick={() => setVillageDeleteData(village)} htmlFor="village-delete-modal" className=' w-8 h-8 text-center bg-red-200 text-xl text-red-500 border border-red-300 rounded-md cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white hover:border-red-600 transition-all ease-in-out duration-200'><span className=''><MdDelete /></span></label>
            </td>

        </tr>
    );
};

export default VillageRow;