import React from 'react';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const ContactCardRow = ({ contact }) => {
    const { name, number1, number2, img } = contact
    return (
        <div className=''>
            <div className="card max-w-sm h-24 bg-base-100 shadow-xl mx-auto">
                <div className="card-body p-2">
                    <div className='flex justify-between'>
                        <div className="avatar">
                            <div className="w-20 rounded-xl">
                                <img src={img} />
                            </div>
                        </div>
                        <div>
                            <p className='poppins-font font-bold mb-2'>{name}</p>
                            <p className='poppins-font '>{number1}</p>
                            <p className='poppins-font '>{number2}</p>
                        </div>
                        <div className=''>
                            <p className='text-[#141C39] cursor-pointer text-lg'> <FiEdit /> </p>
                            <p className='text-[#141C39] cursor-pointer text-2xl mt-9'> <MdDelete /> </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactCardRow;