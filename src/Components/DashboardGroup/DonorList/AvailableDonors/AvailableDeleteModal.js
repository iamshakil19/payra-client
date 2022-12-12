import React from 'react';
import toast from 'react-hot-toast';

const AvailableDeleteModal = ({ availableDonorData, setAvailableDonorData, refetch }) => {

    const { _id } = availableDonorData
    const handleDeleteData = () => {
        const url = `https://payra.onrender.com/donorRequest/${_id}`;
        fetch(url, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    setAvailableDonorData(null)
                    toast.success('Donor Data Deleted')
                }
            })
    }
    return (
        <div className=''>
            <input type="checkbox" id="donor-delete-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#F5F7FF]">
                    <h3 className="font-bold text-lg text-red-500">Are you sure you want to delete this donor ?</h3>
                    <p className="py-4 text-red-500 font-semibold">Once you delete it, you can,t bring it back.</p>
                    <div className="modal-action">
                        <button onClick={() => handleDeleteData(_id)} className='btn bg-red-500 border-0 hover:bg-red-600'>Delete</button>
                        <label htmlFor="donor-delete-modal" className="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AvailableDeleteModal;