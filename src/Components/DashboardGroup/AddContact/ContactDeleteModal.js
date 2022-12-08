import React from 'react';
import toast from 'react-hot-toast';

const ContactDeleteModal = ({ contactDeleteData, setContactDeleteData, refetch }) => {

    const { _id } = contactDeleteData

    const handleDeleteData = () => {
        const url = `http://localhost:5000/delete-contact/${_id}`;
        fetch(url, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    setContactDeleteData(null)
                    toast.error('Super Admin Can Only Delete Contact')
                }
                return res.json()
            })
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    setContactDeleteData(null)
                    toast.success('Contact Deleted')
                }
            })
    }

    return (
        <div className=''>
            <input type="checkbox" id="contact-delete-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-[#F5F7FF]">
                    <h3 className="font-bold text-lg text-red-500">Are you sure you want to delete this contact ?</h3>
                    <p className="py-4 text-red-500 font-semibold">Once you delete it, you can,t bring it back.</p>
                    <div className="modal-action">
                        <button onClick={() => handleDeleteData(_id)} className='btn bg-red-500 border-0 hover:bg-red-600'>Delete</button>
                        <label htmlFor="contact-delete-modal" className="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ContactDeleteModal;