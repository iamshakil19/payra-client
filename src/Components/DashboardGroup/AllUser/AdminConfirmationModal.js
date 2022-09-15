import React from 'react';
import toast from 'react-hot-toast';

const AdminConfirmationModal = ({ adminConfirmationData, setAdminConfirmationData, refetch }) => {
    const { email } = adminConfirmationData

    const makeAdmin = () => {
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if(res.status === 403){
                    setAdminConfirmationData(null)
                    toast.error('Super Admin Can Only Create Admin')
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    setAdminConfirmationData(null)
                    refetch()
                    toast.success(`Congratulations ${email} Is Promoted To Admin`)
                }
            })
    }
    return (
        <div className=''>
            <input type="checkbox" id="admin-confirmation-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box bg-[#F5F7FF]">
                    <h3 class="font-bold text-lg ">Are you sure you want to make <span className='text-green-600'>{adminConfirmationData.email}</span> as an admin ?</h3>
                    <p class="pt-3 font-semibold text-orange-400">He will get access to your dashboard !</p>
                    <div class="modal-action">
                        <button onClick={makeAdmin} className='btn w-20 bg-green-600 hover:bg-green-700 border-0'>YES</button>
                        <label for="admin-confirmation-modal" class="btn w-20">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminConfirmationModal;