import React from 'react';
import toast from 'react-hot-toast';

const DonorRequestProfileModal = ({ profileDonorRequest, setProfileDonorRequest, refetch }) => {

    const { _id, profileImg, name, bloodGroup, age, number1, number2, gender, division, district, policeStation, union, village, status } = profileDonorRequest
    // const handleDeleteRequest = () => {
    //     const url = `http://localhost:5000/donorRequest/${_id}`;
    //     fetch(url, {
    //         method: "DELETE"
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.deletedCount > 0) {
    //                 refetch()
    //                 setProfileDonorRequest(null)
    //                 toast.success('Donor Request Deleted')
    //             }
    //         })
    // }

    return (
        <div>
            <input type="checkbox" id="donor-request-profile-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box">
                    <label for="donor-request-profile-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div class="avatar w-full">
                        <div class="w-16 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2 text-center mx-auto">
                            <img src={profileImg} alt=''/>
                        </div>
                    </div>
                    <h2 className='text-center poppins-font mt-3 text-lg'><span className='font-bold'>{name}</span> <span className='capitalize text-red-500 font-bold ml-3'>({bloodGroup})</span></h2>
                </div>
            </div>
        </div>
    );
};

export default DonorRequestProfileModal;