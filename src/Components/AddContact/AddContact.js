import { useState } from 'react';
import AddContactCard from './AddContactCard';
import AddContactForm from './AddContactForm';

const AddContact = () => {

    const [isFormSubmit, setIsFormSubmit] = useState(false)

    return (
        <div>
            <AddContactForm
            setIsFormSubmit={setIsFormSubmit}
            ></AddContactForm>

            <AddContactCard
            isFormSubmit={isFormSubmit}
            ></AddContactCard>
        </div>
    );
};

export default AddContact;