import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import AllUserRow from './AllUserRow';
import UserDeleteModal from './UserDeleteModal';

const AllUser = () => {
    const navigate = useNavigate
    const [userData, setUserData] = useState(null)
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/users', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
            <h2 className='text-xl font-semibold poppins-font mb-4 text-[#17203F] text-center'>Blood Donor List</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th className='poppins-font text-[15px] '>SL</th>
                            <th className='poppins-font text-[15px] pl-2'>Email</th>
                            <th className='poppins-font text-[15px] pl-2'>Make Admin</th>
                            <th className='poppins-font text-[15px] pl-2'>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <AllUserRow
                                key={user._id}
                                user={user}
                                refetch={refetch}
                                index={index + 1}
                                setUserData={setUserData}
                            ></AllUserRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                userData && <UserDeleteModal
                    userData={userData}
                    setUserData={setUserData}
                    refetch={refetch}
                ></UserDeleteModal>
            }
        </div>
    );
};

export default AllUser;