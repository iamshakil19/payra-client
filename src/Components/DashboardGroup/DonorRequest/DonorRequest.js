import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import DonorRequestDeleteModal from './DonorRequestDeleteModal';
import DonorRequestProfileModal from './DonorRequestProfileModal';
import DonorRequestRow from './DonorRequestRow';

const DonorRequest = () => {
    const [donorData, setDonorData] = useState(null)
    const [profileDonorRequest, setProfileDonorRequest] = useState(null)
    const { data: allDonorRequest, isLoading, refetch } = useQuery('donorRequest', () => fetch('http://localhost:5000/donor-request')
        .then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h2 className='text-xl font-semibold poppins-font mb-4 text-[#17203F] text-center'>All Blood Donor Requests</h2>
            <div className="overflow-x-auto">
                <table className="table w-full ">

                    <thead>
                        <tr>
                            <th className='bangla-font text-[15px] '>সিরিয়াল</th>
                            <th className='bangla-font text-[15px] pl-2'>প্রোফাইল</th>
                            <th className='bangla-font text-[15px] pl-2'>নাম</th>
                            <th className='bangla-font text-[15px] pl-2'>গ্রুপ</th>
                            <th className='bangla-font text-[15px] pl-2'>বয়স</th>
                            <th className='bangla-font text-[15px] pl-2'>লিঙ্গ</th>
                            <th className='bangla-font text-[15px] pl-2'>নাম্বার</th>
                            <th className='bangla-font text-[15px] pl-2'>ইউনিয়ন</th>
                            <th className='bangla-font text-[15px] pl-2'>গ্রাম</th>
                            <th className='bangla-font text-[15px] pl-2'>স্টাটাস</th>
                            <th className='bangla-font text-[15px] pl-2'>অ্যাকশন</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            allDonorRequest?.map((donorRequest, index) => <DonorRequestRow
                                key={donorRequest._id}
                                donorRequest={donorRequest}
                                refetch={refetch}
                                index={index + 1}
                                setDonorData={setDonorData}
                                setProfileDonorRequest={setProfileDonorRequest}
                            ></DonorRequestRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                donorData && <DonorRequestDeleteModal
                    donorData={donorData}
                    setDonorData={setDonorData}
                    refetch={refetch}
                ></DonorRequestDeleteModal>
            }
            {
                profileDonorRequest && <DonorRequestProfileModal
                    profileDonorRequest={profileDonorRequest}
                    setProfileDonorRequest={setProfileDonorRequest}
                    setDonorData={setDonorData}
                    refetch={refetch}
                ></DonorRequestProfileModal>
            }
        </div>
    );
};

export default DonorRequest;