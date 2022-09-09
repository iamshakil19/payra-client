import React from 'react';
import Loading from '../Shared/Loading/Loading';
import { useQuery } from 'react-query';
import ContactCardRow from './ContactCardRow';

const AddContactCard = () => {
    const { data: contacts, isLoading, refetch } = useQuery('contact', () => fetch('http://localhost:5000/contacts', {
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
        <div>
            <h2 className='text-[#141C39] font-semibold text-xl mb-3 mt-10 sm:mt-5 poppins-font text-center sm:text-start'>Added Contact</h2>
            <section className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {
                    contacts.map(contact => <ContactCardRow
                        key={contact._id}
                        contact={contact}
                    ></ContactCardRow>)
                }
            </section>
        </div>
    );
};

export default AddContactCard;