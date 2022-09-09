import React from 'react';
import { FiPhoneCall } from "react-icons/fi";

const FrontEndContactCard = ({ contact }) => {
    const { name, number1, number2, img } = contact
    return (
        <div class="card max-w-md shadow-xl image-full mx-auto h-56">
            <figure><img className='object-right-bottom' src={img} alt="" /></figure>

            <div class="card-body">
                <div class="avatar mx-auto">
                    <div class="w-20 rounded-full">
                        <img src={img} alt="" />
                    </div>
                </div>

                <h2 class="card-title px-5 flex justify-center">{name}</h2>
                <div className='flex justify-center items-center'>
                    <div>
                        <p className='text-2xl'> <FiPhoneCall/> </p>
                    </div>
                    <div>
                        <p className='px-3 text-start'> {number1}</p>
                        { number2 ?
                            <p className='px-3 text-start'> {number2}</p>
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