import React, { useState } from 'react';
import Loading from '../../../Shared/Loading/Loading';
import { useQuery } from 'react-query';
import IncompleteRequestRow from './IncompleteRequestRow';
import IncompleteBloodDeleteModal from './IncompleteBloodDeleteModal';
import { signOut } from 'firebase/auth';
import auth from '../../../../firebase.init';
import { useNavigate } from 'react-router-dom';

const IncompleteBloodRequest = () => {
    const navigate = useNavigate()
    const [bloodRequestData, setBloodRequestData] = useState(null)
    const [bloodRequestProfileData, setBloodRequestProfileData] = useState(null)

    const { data: incompleteBloodRequestList, isLoading, refetch } = useQuery('incompleteBloodList', () => fetch('https://payra.onrender.com/incomplete-blood-request', {
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

            {
                bloodRequestData && <IncompleteBloodDeleteModal
                    bloodRequestData={bloodRequestData}
                    setBloodRequestData={setBloodRequestData}
                    refetch={refetch}
                ></IncompleteBloodDeleteModal>
            }

        </div>
    );
};

export default IncompleteBloodRequest;