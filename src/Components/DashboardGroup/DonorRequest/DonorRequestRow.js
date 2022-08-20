import React from 'react';

const DonorRequestRow = ({donorRequest, index, setDeleteDonorRequest, refetch}) => {
const {_id, name, age, gender, number1, bloodGroup, village} = donorRequest
    return (
        <tr className='hover'>
            <th>{index}</th>
            <td><button>View Profile</button></td>
            <td className='poppins-font'>{name}</td>
            <td className='poppins-font'>{age}</td>
            <td className='bangla-font'>{gender}</td>
            <td className='poppins-font'>{number1}</td>
            <td className='poppins-font uppercase'>{bloodGroup}</td>
            <td className='bangla-font'>{village}</td>
            <td>Approve</td>
            <td>Delete</td>
        </tr>
    );
};

export default DonorRequestRow;