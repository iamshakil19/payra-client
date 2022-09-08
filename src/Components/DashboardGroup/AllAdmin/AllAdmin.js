import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import { useQuery } from 'react-query';

const AllAdmin = () => {
    const navigate = useNavigate()

    const { data: admins, isLoading, refetch } = useQuery('admin', () => fetch('http://localhost:5000/all-admin', {
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
            <h2>all admin page: {admins?.length}</h2>
        </div>
    );
};

export default AllAdmin;