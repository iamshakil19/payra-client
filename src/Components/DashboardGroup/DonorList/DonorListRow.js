import React from 'react';

const DonorListRow = ({ donorSingleData, refetch, index, setDonorData }) => {
    const { _id, name, profileImg, age, gender, number1, bloodGroup, policeStation, union, village } = donorSingleData

    return (
        <tr className='hover'>
            <th className='p-2 pl-4 poppins-font w-7'>{index}</th>
            <td className='p-2 pt-3 pb-1.5'>
                <div class="avatar cursor-pointer">
                    <div class="w-9 rounded-full ring ring-green-500 ring-offset-[#F5F7FF] ring-offset-2">
                        <label for="donor-request-profile-modal" className='cursor-pointer'>
                            <img src={profileImg} alt="" />
                        </label>
                    </div>
                </div>
            </td>
            <td className='poppins-font p-2'>{name}</td>
            <td className='poppins-font uppercase p-2'>{bloodGroup}</td>
            <td className='poppins-font p-2'>{age}</td>
            <td className='bangla-font p-2'>{gender}</td>
            <td className='poppins-font p-2'>{number1}</td>
            <td className='bangla-font p-2'>{policeStation}</td>
            <td className='bangla-font p-2'>{union}</td>
            <td className='bangla-font p-2'>{village}</td>
            <td className='bangla-font p-2'>{"3 বার"}</td>
            <td className='bangla-font p-2'>{"11 দিন আগে"}</td>
            <td className='p-2'>
                <label onClick={() => setDonorData(donorSingleData)} for="donor-request-delete-modal" className='btn btn-sm w-16 bg-red-500 border-0 hover:bg-red-600'>Delete</label>
            </td>
        </tr>
    );
};

export default DonorListRow;