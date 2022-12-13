import React, { useState } from 'react';
import Loading from '../../../Shared/Loading/Loading';
import { useQuery } from 'react-query';
import IncompleteRequestRow from './IncompleteRequestRow';
import IncompleteBloodDeleteModal from './IncompleteBloodDeleteModal';
import { signOut } from 'firebase/auth';
import auth from '../../../../firebase.init';
import { useNavigate } from 'react-router-dom';
import IncompleteBloodProfileModal from './IncompleteBloodProfileModal';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import ReactPaginate from 'react-paginate';

const IncompleteBloodRequest = () => {
    const navigate = useNavigate()
    const [bloodRequestData, setBloodRequestData] = useState(null)
    const [bloodRequestProfileData, setBloodRequestProfileData] = useState(null)
    const [limit, setLimit] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)

    const { data, isLoading, refetch } = useQuery(['incompleteBloodList', limit, pageNumber], () => fetch(`http://localhost:5000/incomplete-blood-request?limit=${limit}&pageNumber=${pageNumber}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth)
                localStorage.removeItem('accessToken')
                navigate('/')
            }
            return res.json()
        }))

    const handlePageClick = (event) => {
        setPageNumber(event.selected)
    };
    const skipIndex = (limit * pageNumber) + 1

    return (
        <div className='mb-5'>
            <div className="overflow-x-auto">
                <div className='mb-3 hidden lg:block'>
                    <p className='text-right'>
                        <span className='poppins-font'>Show : </span>
                        <select onChange={(e) => setLimit(e.target.value)} defaultValue={limit} className="py-1 px-1 bg-slate-200 font-semibold outline-none rounded-sm poppins-font">
                            <option selected className='font-semibold' value="10">10</option>
                            <option className='font-semibold' value="15">15</option>
                            <option className='font-semibold' value="25">25</option>
                            <option className='font-semibold' value="50">50</option>
                            <option className='font-semibold' value="100">100</option>
                        </select>
                    </p>
                </div>
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th className='bangla-font text-[15px] '>সিরিয়াল</th>
                            <th className='bangla-font text-[15px] pl-2'>প্রোফাইল</th>
                            <th className='bangla-font text-[15px] pl-2'>রোগীর নাম</th>
                            <th className='bangla-font text-[15px] pl-2'>রক্তের গ্রুপ</th>
                            <th className='bangla-font text-[15px] pl-2'>রক্তের পরিমাণ</th>
                            <th className='bangla-font text-[15px] pl-2'>হিমোগ্লোবিন</th>
                            <th className='bangla-font text-[15px] pl-2'>রক্তদানের তারিখ</th>
                            <th className='bangla-font text-[15px] pl-2'>ফোন নাম্বার</th>
                            <th className='bangla-font text-[15px] pl-2'>রোগীর সমস্যা</th>
                            <th className='bangla-font text-[15px] pl-2'>রক্তদানের স্থান</th>
                            <th className='bangla-font text-[15px] pl-2'>স্টাটাস</th>
                            <th className='bangla-font text-[15px] pl-2'>অ্যাকশন</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.incompleteBloodRequestList?.map((incompleteSingleBloodRequest, index) => <IncompleteRequestRow
                                key={incompleteSingleBloodRequest._id}
                                incompleteSingleBloodRequest={incompleteSingleBloodRequest}
                                refetch={refetch}
                                index={index + skipIndex}
                                setBloodRequestData={setBloodRequestData}
                                setBloodRequestProfileData={setBloodRequestProfileData}
                            ></IncompleteRequestRow>)
                        }
                    </tbody>
                </table>

                {
                    bloodRequestData && <IncompleteBloodDeleteModal
                        bloodRequestData={bloodRequestData}
                        setBloodRequestData={setBloodRequestData}
                        refetch={refetch}
                    ></IncompleteBloodDeleteModal>
                }
                {
                    bloodRequestProfileData && <IncompleteBloodProfileModal
                        bloodRequestProfileData={bloodRequestProfileData}
                        setBloodRequestProfileData={setBloodRequestProfileData}
                        setBloodRequestData={setBloodRequestData}
                        refetch={refetch}
                    ></IncompleteBloodProfileModal>
                }

            </div>

            <div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={data?.pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    breakClassName="hidden lg:block py-[8px] px-[15px] cursor-pointer rounded-sm"
                    containerClassName="list-none flex items-center justify-end poppins-font text-[17px] mt-5"
                    pageLinkClassName=' cursor-pointer border border-gray-300 border-collapse font-semibold hover:bg-indigo-50 hidden lg:block bg-white text-gray-500 px-4 py-2 text-sm'
                    previousLinkClassName='cursor-pointer border border-gray-300 border-collapse font-semibold hover:bg-indigo-50 lg:block bg-white text-gray-500 px-4 py-2 text-sm rounded-l-md mr-3 lg:mr-0 hover:border-indigo-500'
                    nextLinkClassName='cursor-pointer border border-gray-300 border-collapse font-semibold hover:bg-indigo-50 ml-3 lg:ml-0 lg:block bg-white text-gray-500 px-4 py-2 text-sm rounded-r-md hover:border-indigo-500'
                    activeLinkClassName='z-10 bg-indigo-100 border-indigo-500 text-indigo-600'
                />
            </div>
        </div>
    );
};

export default IncompleteBloodRequest;