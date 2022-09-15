import { signOut } from 'firebase/auth';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import { useQuery } from 'react-query';
import AllAdminRow from './AllAdminRow';
import { useState } from 'react';


const AllAdmin = () => {
    const navigate = useNavigate()
    const [adminDeleteData, setAdminDeleteData] = useState(null)
    const [superAdminConfirmationData, setSuperAdminConfirmationData] = useState(null)

    const { data: admins, isLoading, refetch } = useQuery('admins', () => fetch('http://localhost:5000/all-admin', {
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
            <h2 className='text-[#141C39] font-semibold text-xl mb-3 mt-10 sm:mt-5 poppins-font text-center sm:text-start'>All Admins</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th className='poppins-font text-[15px] '>SL</th>
                            <th className='poppins-font text-[15px] pl-2'>Name</th>
                            <th className='poppins-font text-[15px] pl-2'>Email</th>
                            <th className='poppins-font text-[15px] pl-2'>Role</th>
                            <th className='poppins-font text-[15px] pl-2'>Accessibility</th>
                            <th className='poppins-font text-[15px] pl-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins?.map((admin, index) => <AllAdminRow
                                key={admin._id}
                                admin={admin}
                                refetch={refetch}
                                index={index + 1}
                                setAdminDeleteData={setAdminDeleteData}
                                setSuperAdminConfirmationData={setSuperAdminConfirmationData}
                            ></AllAdminRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllAdmin;