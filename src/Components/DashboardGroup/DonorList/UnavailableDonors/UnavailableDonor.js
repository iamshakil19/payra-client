import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import Loading from '../../../Shared/Loading/Loading';
import auth from '../../../../firebase.init';
import UnavailableListRow from './UnavailableListRow';
import UnavailableDeleteModal from './UnavailableDeleteModal';
import UnavailableProfileModal from './UnavailableProfileModal';

const UnavailableDonor = () => {
    const navigate = useNavigate()
    const [unavailableDonorData, setUnavailableDonorData] = useState(null)
    const [unavailableDonorProfileData, setUnavailableDonorProfileData] = useState(null)

    const { data: unavailableDonorList, isLoading, refetch } = useQuery('unavailableDonorList', () => fetch('https://payra.onrender.com/unavailable-donor', {
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
                            unavailableDonorList?.map((donorSingleData, index) => <UnavailableListRow
                                key={donorSingleData._id}
                                donorSingleData={donorSingleData}
                                refetch={refetch}
                                index={index + 1}
                                setUnavailableDonorData={setUnavailableDonorData}
                                setUnavailableDonorProfileData={setUnavailableDonorProfileData}
                            ></UnavailableListRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                unavailableDonorData && <UnavailableDeleteModal
                    unavailableDonorData={unavailableDonorData}
                    setUnavailableDonorData={setUnavailableDonorData}
                    refetch={refetch}
                ></UnavailableDeleteModal>
            }

            {
                unavailableDonorProfileData && <UnavailableProfileModal
                    key={unavailableDonorProfileData._id}
                    unavailableDonorProfileData={unavailableDonorProfileData}
                    setUnavailableDonorProfileData={setUnavailableDonorProfileData}
                    refetch={refetch}
                ></UnavailableProfileModal>
            }
        </div>
    );
};

export default UnavailableDonor;