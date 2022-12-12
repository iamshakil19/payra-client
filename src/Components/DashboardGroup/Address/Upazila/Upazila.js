import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { useQuery } from 'react-query';
import Loading from '../../../Shared/Loading/Loading';
import UpazilaRow from './UpazilaRow';

const Upazila = () => {
    const [upazilaSearchData, setUpazilaSearchData] = useState("")
    const [upazilaLimit, setUpazilaLimit] = useState(5)
    const [upazilaPageNumber, setUpazilaPageNumber] = useState(0)


    const { data, isLoading, refetch } = useQuery(['upazila', upazilaLimit, upazilaPageNumber, upazilaSearchData], () => fetch(`https://payra.onrender.com/upazilas?upazilaLimit=${upazilaLimit}&upazilaPageNumber=${upazilaPageNumber}&upazilaSearchData=${upazilaSearchData}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    const handlePageClick = (event) => {
        setUpazilaPageNumber(event.selected)
    };

    const skipIndex = (upazilaLimit * upazilaPageNumber) + 1

    return (
        <div className='mb-5'>
            <h2 className='text-xl font-semibold poppins-font mb-4 text-[#17203F] text-center'>All Upazila</h2>

            <div className='hidden lg:flex items-center justify-between mb-3'>
                <div>
                    <form action="" className='search-bar'>
                        <input onChange={(e) => setUpazilaSearchData(e.target.value)} autoComplete='off' type="text" placeholder='Search upazila' name='donorSearchText' />
                        <button disabled type=''><span className='search-icon cursor-pointer'> <FaSearch /> </span></button>
                    </form>
                </div>

                <div className='inline'>
                    <span className='poppins-font'>Show : </span>
                    <select onChange={(e) => setUpazilaLimit(e.target.value)} defaultValue={upazilaLimit} className="py-1 px-1 bg-slate-200 font-semibold outline-none rounded-sm poppins-font">
                        <option selected className='font-semibold' value="5">5</option>
                        <option className='font-semibold' value="10">10</option>
                        <option className='font-semibold' value="15">15</option>
                        <option className='font-semibold' value="25">25</option>
                        <option className='font-semibold' value="50">50</option>
                        <option className='font-semibold' value="100">100</option>
                    </select>
                </div>

            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th className='poppins-font text-[15px] '>SL</th>
                            <th className='poppins-font text-[15px] pl-2'>English Name</th>
                            <th className='poppins-font text-[15px] pl-2'>Bangla Name</th>
                            <th className='poppins-font text-[15px] pl-2'>Upazila Id</th>
                            <th className='poppins-font text-[15px] pl-2'>District Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.upazilas?.map((upazila, index) => <UpazilaRow
                                key={upazila._id}
                                upazila={upazila}
                                refetch={refetch}
                                index={index + skipIndex}
                            ></UpazilaRow>)
                        }
                    </tbody>
                </table>
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

export default Upazila;