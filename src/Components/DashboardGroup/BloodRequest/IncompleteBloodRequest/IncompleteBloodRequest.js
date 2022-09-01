import React, { useState } from 'react';
import Loading from '../../../Shared/Loading/Loading';
import { useQuery } from 'react-query';
import IncompleteRequestRow from './IncompleteRequestRow';

const IncompleteBloodRequest = () => {
    const [bloodRequestData, setBloodRequestData] = useState(null)
    const [bloodRequestProfileData, setBloodRequestProfileData] = useState(null)

    const { data: incompleteBloodRequestList, isLoading, refetch } = useQuery('incompleteBloodList', () => fetch('http://localhost:5000/incomplete-blood-request')
        .then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">

                <thead>
                    <tr>
                        <th className='bangla-font text-[15px] '>সিরিয়াল</th>
                        <th className='bangla-font text-[15px] pl-2'>প্রোফাইল</th>
                        <th className='bangla-font text-[15px] pl-2'>নাম</th>
                        <th className='bangla-font text-[15px] pl-2'>গ্রুপ</th>
                        <th className='bangla-font text-[15px] pl-2'>বয়স</th>
                        <th className='bangla-font text-[15px] pl-2'>নাম্বার</th>
                        <th className='bangla-font text-[15px] pl-2'>থানা</th>
                        <th className='bangla-font text-[15px] pl-2'>ইউনিয়ন</th>
                        <th className='bangla-font text-[15px] pl-2'>গ্রাম</th>
                        <th className='bangla-font text-[15px] pl-2'>মোট রক্তদান</th>
                        <th className='bangla-font text-[15px] pl-2'>স্টাটাস</th>
                        <th className='bangla-font text-[15px] pl-2'>অ্যাকশন</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        incompleteBloodRequestList?.map((incompleteSingleBloodRequest, index) => <IncompleteRequestRow
                            key={incompleteSingleBloodRequest._id}
                            incompleteSingleBloodRequest={incompleteSingleBloodRequest}
                            refetch={refetch}
                            index={index + 1}
                            setBloodRequestData={setBloodRequestData}
                            setBloodRequestProfileData={setBloodRequestProfileData}
                        ></IncompleteRequestRow>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default IncompleteBloodRequest;