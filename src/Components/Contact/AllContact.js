import React from 'react';
import Header from '../Header/Header';
import Loading from '../Shared/Loading/Loading';
import { useQuery } from 'react-query';
import FrontEndContactCard from './FrontEndContactCard';

const AllContact = () => {

    const { data: allContacts, isLoading } = useQuery('allContacts', () => fetch('http://localhost:5000/contacts', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }


    return (
        <div className='donor-registration-bg min-h-screen'>
            <Header />

            <div className='lg:mr-3 py-5 px-5'>
                <h1 className="text-4xl font-bold bangla-font text-white tracking-wide sm:text-5xl text-center mb-5">জরুরি প্রয়োজনে কল করুন</h1>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>

                    {
                        allContacts?.map(contact => <FrontEndContactCard
                            key={contact._id}
                            contact={contact}
                        ></FrontEndContactCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllContact;