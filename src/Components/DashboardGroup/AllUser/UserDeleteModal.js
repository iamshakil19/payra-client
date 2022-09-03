import React from 'react';
import toast from 'react-hot-toast';

const UserDeleteModal = ({userData, setUserData, refetch}) => {

    const { _id } = userData
    const handleDeleteData = () => {
        const url = `http://localhost:5000/deleteUser/${_id}`;
        fetch(url, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    setUserData(null)
                    toast.success('User Deleted')
                }
            })
    }


    return (
        <div className=''>
            <input type="checkbox" id="user-delete-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box bg-[#F5F7FF]">
                    <h3 class="font-bold text-lg text-red-500">Are you sure you want to delete this user ?</h3>
                    <p class="py-4 text-red-500 font-semibold">Once you delete it, you can,t bring it back.</p>
                    <div class="modal-action">
                        <button onClick={() => handleDeleteData(_id)} className='btn bg-red-500 border-0 hover:bg-red-600'>Delete</button>
                        <label for="user-delete-modal" class="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDeleteModal;