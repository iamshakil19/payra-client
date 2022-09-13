import React from 'react';
import Loading from '../../../Shared/Loading/Loading';
import { useQuery } from 'react-query';
import CompleteBloodRequestRow from './CompleteBloodRequestRow';
import { useState } from 'react';
import CompleteDeleteModal from './CompleteDeleteModal';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../../firebase.init';

const CompleteBloodRequest = () => {
    const navigate = useNavigate()
    const [bloodRequestDeleteData, setBloodRequestDeleteData] = useState(null)
    const [bloodRequestProfileData, setBloodRequestProfileData] = useState(null)

    const { data: completeBloodRequestList, isLoading, refetch } = useQuery('completeBloodList', () => fetch('http://localhost:5000/complete-blood-request', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth)
                localStorage.removeItem('accessToken')
                navigate('/')
            }
            return res.json()
        }))

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
                        <th className='bangla-font text-[15px] pl-2'>রোগীর নাম</th>
                        <th className='bangla-font text-[15px] pl-2'>রক্তের গ্রুপ</th>
                        <th className='bangla-font text-[15px] pl-2'>রক্তের পরিমাণ</th>
                        <th className='bangla-font text-[15px] pl-2'>হিমোগ্লোবিন</th>
                        <th className='bangla-font text-[15px] pl-2'>রক্তদানের তারিখ</th>
                        <th className='bangla-font text-[15px] pl-2'>ফোন নাম্বার</th>
                        <th className='bangla-font text-[15px] pl-2'>রোগীর সমস্যা</th>
                        <th className='bangla-font text-[15px] pl-2'>রক্তদানের স্থান</th>
                        <th className='bangla-font text-[15px] pl-2'>স্টাটাস</th>
                        <th className='bangla-font text-[15px] pl-2'>অ্যাকশন</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        completeBloodRequestList?.map((completeSingleBloodRequest, index) => <CompleteBloodRequestRow
                            key={completeSingleBloodRequest._id}
                            completeSingleBloodRequest={completeSingleBloodRequest}
                            refetch={refetch}
                            index={index + 1}
                            setBloodRequestDeleteData={setBloodRequestDeleteData}
                            setBloodRequestProfileData={setBloodRequestProfileData}
                        ></CompleteBloodRequestRow>)
                    }
                </tbody>
            </table>

            {
                bloodRequestDeleteData && <CompleteDeleteModal
                    bloodRequestDeleteData={bloodRequestDeleteData}
                    setBloodRequestDeleteData={setBloodRequestDeleteData}
                    refetch={refetch}
                ></CompleteDeleteModal>
            }

        </div>
    );
};

export default CompleteBloodRequest;