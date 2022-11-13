import React from 'react';

const UnionAddModal = () => {
    return (
        <div>
            <input type="checkbox" id="union-add-button" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                <label htmlFor="union-add-button" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn">Yay!</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnionAddModal;