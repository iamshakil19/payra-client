import { signOut } from 'firebase/auth';
import React from 'react';
import { TbActivityHeartbeat } from "react-icons/tb";
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';


const AdminActivity = () => {
    const navigate = useNavigate()
    const { data: recentAdmins, isLoading } = useQuery('recentAdmins', () => fetch('https://payra.onrender.com/all-admin', {
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

    const latest5Admins = recentAdmins.slice(0, 5)

    return (
        <div className='border border-gray-300 rounded-xl p-4 mt-5 w-lg shadow-lg'>
            <p className='text-[#141C39] text-xl poppins-font font-semibold mb-4 flex items-center'> <span className='mr-3 text-red-500 text-2xl'><TbActivityHeartbeat /> </span>Admin activity</p>

            {
                latest5Admins?.map(singleAdmin => <div className='grid grid-cols-2 border-b py-1.5'>
                    {singleAdmin.email.length > 18 ?
                        <p className='poppins-font'>{singleAdmin.email.slice(0, 18)}...</p>
                        :
                        <p className='poppins-font'>{singleAdmin.email}</p>
                    }
                    {singleAdmin.role === "superAdmin" ?
                        <p className='capitalize poppins-font text-red-500 font-bold text-center'>Super Admin</p>
                        :
                        <p className='capitalize poppins-font text-red-500 font-bold text-center'>{singleAdmin.role}</p>
                    }
                </div>)
            }
        </div>
    );
};

export default AdminActivity;