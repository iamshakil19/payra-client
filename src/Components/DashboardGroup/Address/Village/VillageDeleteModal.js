import React from 'react';
import toast from 'react-hot-toast';

const VillageDeleteModal = ({ refetch, setVillageDeleteData, villageDeleteData }) => {
    const { _id, name } = villageDeleteData

    const handleDeleteData = () => {
        const url = `http://localhost:5000/villages/${_id}`;
        fetch(url, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    setVillageDeleteData(null)
                    toast.error('Super Admin Can Only Delete Village')
                }
                return res.json()
            })
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    setVillageDeleteData(null)
                    toast.success('Village Successfully Deleted')
                }
            })
    }

    return (
        <div className=''>
            <input type="checkbox" id="village-delete-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#F5F7FF]">
                    <h3 className="font-bold text-lg text-red-500">Are you sure you want to delete <span className='text-black'>{name}</span> village ?</h3>
                    <p className="py-4 text-red-500 font-semibold">Once you delete it, you can,t bring it back.</p>
                    <div className="modal-action">
                        <button onClick={() => handleDeleteData(_id)} className='btn bg-red-500 border-0 hover:bg-red-600'>Delete</button>
                        <label htmlFor="village-delete-modal" className="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default VillageDeleteModal;