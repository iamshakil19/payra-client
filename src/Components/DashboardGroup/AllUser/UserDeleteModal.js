import React from 'react';
import toast from 'react-hot-toast';

const UserDeleteModal = ({ userData, setUserData, refetch }) => {

    const { _id } = userData
    const handleDeleteData = () => {
        const url = `https://payra.onrender.com/deleteUser/${_id}`;
        fetch(url, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    setUserData(null)
                    toast.success('User Successfully Deleted')
                }
            })
    }


    return (
        <div className=''>
            <input type="checkbox" id="user-delete-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#F5F7FF]">
                    <h3 className="font-bold text-lg text-red-500">Are you sure you want to delete this user ?</h3>
                    <p className="py-4 text-red-500 font-semibold">Once you delete it, you can,t bring it back.</p>
                    <div className="modal-action">
                        <button onClick={() => handleDeleteData(_id)} className='btn bg-red-500 border-0 hover:bg-red-600'>Delete</button>
                        <label htmlFor="user-delete-modal" className="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default UserDeleteModal;