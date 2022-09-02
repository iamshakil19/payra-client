import React from 'react';

const AllUserRow = ({user, refetch, setUserData, index}) => {
    const {email,} = user


    return (
        <tr className='hover'>
            <th className='p-2 pl-4 poppins-font w-7'>{index}</th>
            <td className='poppins-font p-2'>{email}</td>
            <td className='p-2'><button className='btn btn-sm w-16 bg-green-600 border-0 hover:bg-green-700'>Admin</button></td>
            <td className='p-2'>
                <label onClick={() => setUserData(user)} for="blood-request-delete-modal" className='btn btn-sm w-16 bg-red-500 border-0 hover:bg-red-600'>Delete</label>
            </td>
        </tr>
    );
};

export default AllUserRow;