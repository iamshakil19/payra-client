import React from 'react';
import Union from './Union/Union';
import Upazila from './Upazila/Upazila';
import Village from './Village/Village';

const Address = () => {
    return (
        <div>
            <div>
                <Upazila/>
            </div>
            <div>
                <Union/>
            </div>
            <div>
                <Village/>
            </div>
        </div>
    );
};

export default Address;