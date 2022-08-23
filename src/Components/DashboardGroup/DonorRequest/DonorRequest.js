import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import DonorRequestDeleteModal from './DonorRequestDeleteModal';
import DonorRequestProfileModal from './DonorRequestProfileModal';
import DonorRequestRow from './DonorRequestRow';

const DonorRequest = () => {
    const [deleteDonorRequest, setDeleteDonorRequest] = useState(null)
    const [profileDonorRequest, setProfileDonorRequest] = useState(null)
    const { data: allDonorRequest, isLoading, refetch } = useQuery('donorRequest', () => fetch('http://localhost:5000/donor-request')
        .then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h2 className='text-xl font-semibold poppins-font mb-4'>All Blood Donor Requests</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Number</th>
                            <th>Group</th>
                            <th>Village</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            allDonorRequest?.map((donorRequest, index) => <DonorRequestRow
                                key={donorRequest._id}
                                donorRequest={donorRequest}
                                refetch={refetch}
                                index={index + 1}
                                setDeleteDonorRequest={setDeleteDonorRequest}
                                setProfileDonorRequest={setProfileDonorRequest}
                            ></DonorRequestRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteDonorRequest && <DonorRequestDeleteModal
                    deleteDonorRequest={deleteDonorRequest}
                    setDeleteDonorRequest={setDeleteDonorRequest}
                    refetch={refetch}
                ></DonorRequestDeleteModal>
            }
            {
                profileDonorRequest && <DonorRequestProfileModal
                profileDonorRequest={profileDonorRequest}
                setProfileDonorRequest={setProfileDonorRequest}
                refetch={refetch}
                ></DonorRequestProfileModal>
            }
        </div>
    );
};

export default DonorRequest;