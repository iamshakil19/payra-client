import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import AvailableListRow from './AvailableListRow';
import AvailableDeleteModal from './AvailableDeleteModal';
import AvailableProfileModal from './AvailableProfileModal';
import Loading from '../../../Shared/Loading/Loading';
import auth from '../../../../firebase.init';

const AvailableDonor = () => {
    const navigate = useNavigate()
    const [availableDonorData, setAvailableDonorData] = useState(null)
    const [availableDonorProfileData, setAvailableDonorProfileData] = useState(null)

    const { data: availableDonorList, isLoading, refetch } = useQuery('availableDonorList', () => fetch('https://payra.onrender.com/available-donor', {
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
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th className='bangla-font text-[15px] '>সিরিয়াল</th>
                            <th className='bangla-font text-[15px] pl-2'>প্রোফাইল</th>
                            <th className='bangla-font text-[15px] pl-2'>নাম</th>
                            <th className='bangla-font text-[15px] pl-2'>গ্রুপ</th>
                            <th className='bangla-font text-[15px] pl-2'>বয়স</th>
                            <th className='bangla-font text-[15px] pl-2'>লিঙ্গ</th>
                            <th className='bangla-font text-[15px] pl-2'>নাম্বার</th>
                            <th className='bangla-font text-[15px] pl-2'>থানা</th>
                            <th className='bangla-font text-[15px] pl-2'>ইউনিয়ন</th>
                            <th className='bangla-font text-[15px] pl-2'>গ্রাম</th>
                            <th className='bangla-font text-[15px] pl-2'>মোট রক্তদান</th>
                            <th className='bangla-font text-[15px] pl-2'>উপস্থিতি</th>
                            <th className='bangla-font text-[15px] pl-2'>অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            availableDonorList?.map((donorSingleData, index) => <AvailableListRow
                                key={donorSingleData._id}
                                donorSingleData={donorSingleData}
                                refetch={refetch}
                                index={index + 1}
                                setAvailableDonorData={setAvailableDonorData}
                                setAvailableDonorProfileData={setAvailableDonorProfileData}
                            ></AvailableListRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                availableDonorData && <AvailableDeleteModal
                    availableDonorData={availableDonorData}
                    setAvailableDonorData={setAvailableDonorData}
                    refetch={refetch}
                ></AvailableDeleteModal>
            }

            {
                availableDonorProfileData && <AvailableProfileModal
                    key={availableDonorProfileData._id}
                    availableDonorProfileData={availableDonorProfileData}
                    setAvailableDonorProfileData={setAvailableDonorProfileData}
                    refetch={refetch}
                ></AvailableProfileModal>
            }
        </div>
    );
};

export default AvailableDonor;