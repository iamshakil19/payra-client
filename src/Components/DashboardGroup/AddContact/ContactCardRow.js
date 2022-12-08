import React from 'react';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const ContactCardRow = ({ contact, setContactDeleteData, setContactUpdateData }) => {
    const { name, number1, number2, img } = contact
    return (
        <div className=''>
            <div className="card max-w-sm h-24 bg-base-100 shadow-xl mx-auto">
                <div className="card-body p-2">
                    <div className='flex justify-between'>
                        <div className="avatar">
                            <div className="w-20 rounded-xl">
                                <img src={img} alt={`${name}`} />
                            </div>
                        </div>
                        <div>
                            <p className='poppins-font font-bold mb-2'>{name}</p>
                            <p className='poppins-font '>{number1}</p>
                            <p className='poppins-font '>{number2}</p>
                        </div>
                        <div className=''>
                            <label onClick={() => setContactUpdateData(contact)} htmlFor="contact-update-modal" className='text-[#141C39] cursor-pointer text-lg mb-9 block'><FiEdit /></label>

                            <label onClick={() => setContactDeleteData(contact)} htmlFor="contact-delete-modal" className='text-[#141C39] cursor-pointer text-2xl'><MdDelete /></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCardRow;