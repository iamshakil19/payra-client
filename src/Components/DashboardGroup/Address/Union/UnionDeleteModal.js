import React from 'react';
import toast from 'react-hot-toast';

const UnionDeleteModal = ({ refetch, unionDeleteData, setUnionDeleteData }) => {
    const { _id, name } = unionDeleteData

    const handleDeleteData = () => {
        const url = `https://payra.onrender.com/unions/${_id}`;
        fetch(url, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    setUnionDeleteData(null)
                    toast.error('Super Admin Can Only Delete Union')
                }
                return res.json()
            })
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    setUnionDeleteData(null)
                    toast.success('Union Successfully Deleted')
                }
            })
    }
    return (
        <div className=''>
            <input type="checkbox" id="union-delete-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box bg-[#F5F7FF]">
                    <h3 class="font-bold text-lg text-red-500">Are you sure you want to delete <span className='text-black'>{name}</span> union ?</h3>
                    <p class="py-4 text-red-500 font-semibold">Once you delete it, you can,t bring it back.</p>
                    <div class="modal-action">
                        <button onClick={() => handleDeleteData(_id)} className='btn bg-red-500 border-0 hover:bg-red-600'>Delete</button>
                        <label for="union-delete-modal" class="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnionDeleteModal;