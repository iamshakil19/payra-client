import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { useQuery } from 'react-query';
import Loading from '../../../Shared/Loading/Loading';
import UnionAddModal from './UnionAddModal';
import UnionDeleteModal from './UnionDeleteModal';
import UnionRow from './UnionRow';

const Union = () => {
    const [unionSearchData, setUnionSearchData] = useState("")
    const [unionLimit, setunionLimit] = useState(5)
    const [unionPageNumber, setUnionPageNumber] = useState(0)
    const [isUnionAddModal, setIsUnionAddModal] = useState(false)
    const [unionDeleteData, setUnionDeleteData] = useState(null)

    const { data, isLoading, refetch } = useQuery(['union', unionLimit, unionPageNumber, unionSearchData], () => fetch(`https://payra.onrender.com/unions?unionLimit=${unionLimit}&unionPageNumber=${unionPageNumber}&unionSearchData=${unionSearchData}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    const handlePageClick = (event) => {
        setUnionPageNumber(event.selected)
    };

    const skipIndex = (unionLimit * unionPageNumber) + 1

    return (
        <div className='mb-5'>
            <h2 className='text-xl font-semibold poppins-font mb-4 text-[#17203F] text-center'>All Union</h2>

            <div className='hidden lg:flex items-center justify-between mb-3'>
                <div>
                    <form action="" className='search-bar'>
                        <input onChange={(e) => setUnionSearchData(e.target.value)} autoComplete='off' type="text" placeholder='Search union' name='donorSearchText' />
                        <button disabled type=''><span className='search-icon cursor-pointer'> <FaSearch /> </span></button>
                    </form>
                </div>

                <div>
                    <div className='inline'>
                        <label htmlFor="union-add-button" onClick={() => setIsUnionAddModal(true)} className="btn btn-sm mr-5 bg-[#17203F] poppins-font">Add Union</label>
                    </div>
                    <div className='inline'>
                        <span className='poppins-font'>Show : </span>
                        <select onChange={(e) => setunionLimit(e.target.value)} defaultValue={unionLimit} className="py-1 px-1 bg-slate-200 font-semibold outline-none rounded-sm poppins-font">
                            <option selected className='font-semibold' value="5">5</option>
                            <option className='font-semibold' value="10">10</option>
                            <option className='font-semibold' value="15">15</option>
                            <option className='font-semibold' value="25">25</option>
                            <option className='font-semibold' value="50">50</option>
                            <option className='font-semibold' value="100">100</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th className='poppins-font text-[15px] '>SL</th>
                            <th className='poppins-font text-[15px] pl-2'>English Name</th>
                            <th className='poppins-font text-[15px] pl-2'>Bangla Name</th>
                            <th className='poppins-font text-[15px] pl-2'>Union Id</th>
                            <th className='poppins-font text-[15px] pl-2'>Upazila Id</th>
                            <th className='poppins-font text-[15px] pl-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.unions?.map((union, index) => <UnionRow
                                key={union._id}
                                union={union}
                                refetch={refetch}
                                index={index + skipIndex}
                                setUnionDeleteData={setUnionDeleteData}
                            ></UnionRow>)
                        }
                    </tbody>
                </table>
            </div>

            {
                isUnionAddModal && <UnionAddModal
                    setIsUnionAddModal={setIsUnionAddModal}
                    refetch={refetch}
                ></UnionAddModal>
            }

            {
                unionDeleteData && <UnionDeleteModal
                    refetch={refetch}
                    unionDeleteData={unionDeleteData}
                    setUnionDeleteData={setUnionDeleteData}
                ></UnionDeleteModal>
            }

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

export default Union;