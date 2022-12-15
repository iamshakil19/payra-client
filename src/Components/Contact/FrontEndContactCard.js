import React from 'react';
import { FiPhoneCall } from "react-icons/fi";

const FrontEndContactCard = ({ contact }) => {
    const { name, number1, number2, img } = contact
    return (
        <div className="card max-w-md shadow-xl image-full mx-auto h-56">
            <figure><img className='object-right-bottom' src={img} alt="" /></figure>

            <div className="card-body">
                <div className="avatar mx-auto">
                    <div className="w-20 rounded-full">
                        <img src={img} alt="" />
                    </div>
                </div>

                <h2 className="card-title px-2 flex justify-center poppins-font">{name}</h2>
                <div className='flex justify-center items-center'>
                    <div>
                        <p className='text-2xl'> <FiPhoneCall /> </p>
                    </div>
                    <div>
                        <p className='px-3 text-start poppins-font'> {number1}</p>
                        {number2 ?
                            <p className='px-3 text-start poppins-font'> {number2}</p>
                            :
                            <p className='px-3 text-start'> ... </p>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FrontEndContactCard;