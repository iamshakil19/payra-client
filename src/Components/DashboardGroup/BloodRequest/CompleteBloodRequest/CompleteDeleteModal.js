import React from 'react';
import toast from 'react-hot-toast';

const CompleteDeleteModal = ({ bloodRequestDeleteData, setBloodRequestDeleteData, refetch }) => {

    const { _id } = bloodRequestDeleteData

    const handleDeleteData = () => {
        const url = `http://localhost:5000/deleteBloodRequest/${_id}`;
        fetch(url, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    setBloodRequestDeleteData(null)
                    toast.success('Complete Blood Request Data Deleted')
                }
            })
    }

    return (
        <div className=''>
            <input type="checkbox" id="complete-blood-request-delete-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#F5F7FF]">
                    <h3 className="font-bold text-lg text-red-500">Are you sure you want to delete this data ?</h3>
                    <p className="py-4 text-red-500 font-semibold">Once you delete it, you can,t bring it back.</p>
                    <div className="modal-action">
                        <button onClick={() => handleDeleteData(_id)} className='btn bg-red-500 border-0 hover:bg-red-600'>Delete</button>
                        <label htmlFor="complete-blood-request-delete-modal" className="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CompleteDeleteModal;