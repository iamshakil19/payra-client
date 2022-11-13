import React from 'react';

const UnionRow = ({ union, index, refetch }) => {
    const { union_id, name, bn_name, upazila_id } = union
    return (
        <tr className='hover'>
            <th className='p-2 pl-4 poppins-font w-7 '>{index}</th>
            <td className='poppins-font p-2 '>{name}</td>
            <td className='bangla-font p-2 '>{bn_name}</td>
            <td className='poppins-font p-2 '>{union_id}</td>
            <td className='poppins-font p-2 '>{upazila_id}</td>
            <td className='poppins-font p-2 '>
                <button className='btn btn-sm bg-[#17203F] poppins-font'>Edit</button>
            </td>

        </tr>
    );
};

export default UnionRow;