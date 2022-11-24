import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import ContactCardRow from './ContactCardRow';
import ContactDeleteModal from './ContactDeleteModal';
import ContactUpdateModal from './ContactUpdateModal';

const AddContactCard = ({ isFormSubmit }) => {

    const [contactDeleteData, setContactDeleteData] = useState(null)
    const [contactUpdateData, setContactUpdateData] = useState(null)

    const { data: contacts, isLoading, refetch } = useQuery('contact', () => fetch('https://payra.onrender.com/contacts/dashboard', {
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

    if (isFormSubmit) {
        refetch()
    }

    return (
        <div>
            <h2 className='text-[#141C39] font-semibold text-xl mb-3 mt-10 sm:mt-5 poppins-font text-center sm:text-start'>Added Contact</h2>
            <section className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {
                    contacts?.map(contact => <ContactCardRow
                        key={contact._id}
                        contact={contact}
                        setContactDeleteData={setContactDeleteData}
                        setContactUpdateData={setContactUpdateData}
                    ></ContactCardRow>)
                }
            </section>
            {
                contactDeleteData && <ContactDeleteModal
                    contactDeleteData={contactDeleteData}
                    setContactDeleteData={setContactDeleteData}
                    refetch={refetch}
                ></ContactDeleteModal>
            }
            {
                contactUpdateData && <ContactUpdateModal
                    contactUpdateData={contactUpdateData}
                    setContactUpdateData={setContactUpdateData}
                    refetch={refetch}
                ></ContactUpdateModal>
            }
        </div>
    );
};

export default AddContactCard;