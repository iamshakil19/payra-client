import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import { useQuery } from 'react-query';
import DonorListRow from './DonorListRow';
import DonorListDeleteModal from './DonorListDeleteModal';

const DonorList = () => {
    const [donorData, setDonorData] = useState(null)

    const { data: allDonorList, isLoading, refetch } = useQuery('donorList', () => fetch('http://localhost:5000/verified-donor')
        .then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h2 className='text-xl font-semibold poppins-font mb-4 text-[#17203F]'>All Blood Donor List</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th className='bangla-font text-[15px] '>সিরিয়াল</th>
                            <th className='bangla-font text-[15px] pl-2'>প্রোফাইল</th>
                            <th className='bangla-font text-[15px] pl-2'>নাম</th>
                            <th className='bangla-font text-[15px] pl-2'>বয়স</th>
                            <th className='bangla-font text-[15px] pl-2'>লিঙ্গ</th>
                            <th className='bangla-font text-[15px] pl-2'>নাম্বার</th>
                            <th className='bangla-font text-[15px] pl-2'>গ্রুপ</th>
                            <th className='bangla-font text-[15px] pl-2'>থানা</th>
                            <th className='bangla-font text-[15px] pl-2'>ইউনিয়ন</th>
                            <th className='bangla-font text-[15px] pl-2'>গ্রাম</th>
                            <th className='bangla-font text-[15px] pl-2'>মোট রক্তদান</th>
                            <th className='bangla-font text-[15px] pl-2'>শেষ রক্তদান</th>
                            <th className='bangla-font text-[15px] pl-2'>অ্যাকশন</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            allDonorList?.map((donorSingleData, index) => <DonorListRow
                                key={donorSingleData._id}
                                donorSingleData={donorSingleData}
                                refetch={refetch}
                                index={index + 1}
                                setDonorData={setDonorData}
                            ></DonorListRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                donorData && <DonorListDeleteModal
                    donorData={donorData}
                    setDonorData={setDonorData}
                    refetch={refetch}
                ></DonorListDeleteModal>
            }
        </div>
    );
};

export default DonorList;