import React from 'react';

const UpazilaRow = ({upazila, index, refetch}) => {
    const {district_id, name, bn_name, upazila_id} = upazila
    return (
        <tr className='hover'>
            <th className='p-2 pl-4 poppins-font w-7 '>{index}</th>
            <td className='poppins-font p-2 '>{name}</td>
            <td className='bangla-font p-2 '>{bn_name}</td>
            <td className='poppins-font p-2 '>{upazila_id}</td>
            <td className='poppins-font p-2 '>{district_id}</td>
        </tr>
    );
};

export default UpazilaRow;