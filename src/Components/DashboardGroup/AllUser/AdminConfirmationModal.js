import React from 'react';

const AdminConfirmationModal = ({ adminConfirmationData, setAdminConfirmationData, refetch }) => {
    return (
        <div className=''>
            <input type="checkbox" id="admin-confirmation-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box bg-[#F5F7FF]">
                    <h3 class="font-bold text-lg ">Are you sure you want to make <span className='text-green-600'>{adminConfirmationData.email}</span> as an admin ?</h3>
                    <p class="pt-3 font-semibold text-orange-400">He will get access to your dashboard !</p>
                    <div class="modal-action">
                        <button  className='btn w-20 bg-green-600 hover:bg-green-700 border-0'>YES</button>
                        <label for="admin-confirmation-modal" class="btn w-20">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminConfirmationModal;