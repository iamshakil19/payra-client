import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import AllUserRow from './AllUserRow';
import UserDeleteModal from './UserDeleteModal';
import AdminConfirmationModal from './AdminConfirmationModal';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { UserContext } from '../Dashboard/Dashboard';
import ReactPaginate from 'react-paginate';

const AllUser = () => {
    const navigate = useNavigate()
    const userSearchData = useContext(UserContext)
    const [userData, setUserData] = useState(null)
    const [adminConfirmationData, setAdminConfirmationData] = useState(null)
    const [limit, setLimit] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)

    const { data, isLoading, refetch } = useQuery(['users', limit, pageNumber, userSearchData], () => fetch(`http://localhost:5000/users?limit=${limit}&pageNumber=${pageNumber}&userSearchData=${userSearchData}`, {
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

    return (
        <div className='mb-5'>
            <h2 className='text-xl font-semibold poppins-font mb-4 text-[#17203F] text-center'>All User List</h2>

            <div className="overflow-x-auto">

                <div className='mb-3 hidden lg:block'>
                    <div className='text-right'>
                        <span className='poppins-font'>Show : </span>
                        <select onChange={(e) => setLimit(e.target.value)} defaultValue={limit} className="py-1 px-1 bg-slate-200 font-semibold outline-none rounded-sm poppins-font">
                            <option selected className='font-semibold' value="10">10</option>
                            <option className='font-semibold' value="15">15</option>
                            <option className='font-semibold' value="25">25</option>
                            <option className='font-semibold' value="50">50</option>
                            <option className='font-semibold' value="100">100</option>
                        </select>
                    </div>
                </div>

                <table className="table w-full">

                    <thead>
                        <tr>
                            <th className='poppins-font text-[15px] '>SL</th>
                            <th className='poppins-font text-[15px] pl-2'>Name</th>
                            <th className='poppins-font text-[15px] pl-2'>Email</th>
                            <th className='poppins-font text-[15px] pl-2'>Make Admin</th>
                            <th className='poppins-font text-[15px] pl-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.users?.map((user, index) => <AllUserRow
                                key={user._id}
                                user={user}
                                refetch={refetch}
                                index={index + 1}
                                setUserData={setUserData}
                                setAdminConfirmationData={setAdminConfirmationData}
                            ></AllUserRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                userData && <UserDeleteModal
                    userData={userData}
                    setUserData={setUserData}
                    refetch={refetch}
                ></UserDeleteModal>
            }
            {
                adminConfirmationData && <AdminConfirmationModal
                    adminConfirmationData={adminConfirmationData}
                    setAdminConfirmationData={setAdminConfirmationData}
                    refetch={refetch}
                ></AdminConfirmationModal>
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

export default AllUser;