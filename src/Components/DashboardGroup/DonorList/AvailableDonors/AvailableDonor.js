import React, { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import AvailableListRow from './AvailableListRow';
import AvailableDeleteModal from './AvailableDeleteModal';
import AvailableProfileModal from './AvailableProfileModal';
import Loading from '../../../Shared/Loading/Loading';
import auth from '../../../../firebase.init';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useContext } from 'react';
import { DonorContext } from '../../Dashboard/Dashboard';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


const AvailableDonor = () => {
    const navigate = useNavigate()
    const donorSearchData = useContext(DonorContext)

    const [availableDonorData, setAvailableDonorData] = useState(null)
    const [availableDonorProfileData, setAvailableDonorProfileData] = useState(null)
    const [limit, setLimit] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)
    const [sortByDonateCount, setSortByDonateCount] = useState("acceptedTime")
    const [policeStationFilterData, setPoliceStationFilterData] = useState("")
    const [unionFilterData, setUnionFilterData] = useState("")
    const [villageFilterData, setVillageFilterData] = useState("")
    const [bloodGroupFilterData, setBloodGroupFilterData] = useState("")
    const [genderFilterData, setGenderFilterData] = useState({ man: false, women: false })

    const { data, isLoading, refetch } = useQuery(['availableDonorList', limit, pageNumber, sortByDonateCount, donorSearchData, unionFilterData, villageFilterData, bloodGroupFilterData, policeStationFilterData], () => fetch(`http://localhost:5000/available-donor?limit=${limit}&pageNumber=${pageNumber}&sortByDonateCount=${sortByDonateCount}&donorSearchData=${donorSearchData}&unionFilterData=${unionFilterData}&villageFilterData=${villageFilterData}&bloodGroupFilterData=${bloodGroupFilterData}`, {
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

    if (isLoading) {
        return <Loading />
    }

    const handlePreviousButton = () => {
        if (pageNumber >= 1) {
            setPageNumber(pageNumber - 1)
        }
    }
    const handleNextButton = () => {
        if (pageNumber === data?.pageCount - 1) {
            return
        }
        setPageNumber(pageNumber + 1)
    }


    console.log(unionFilterData);


    return (
        <div>
            <div className='flex items-center justify-between mb-3'>
                <div className="z-50 w-56">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium bg-slate-200 border border-slate-500">
                                Filter
                                <ChevronDownIcon
                                    className="ml-2 -mr-1 h-5 w-5 "
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterTo="transform opacity-100 scale-100"
                            enterFrom="transform opacity-0 scale-95"

                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute left-0 mt-2 w-96 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-3 py-3 rounded-md shadow-md border border-gray-300">

                                    <section className='grid grid-cols-2 gap-3'>
                                        <div>
                                            <span className='poppins-font font-semibold ml-1 mb-1 inline-block'>Police Station</span>
                                            <select name="" id="union" onChange={(e) => setPoliceStationFilterData(e.target.value)} defaultValue={policeStationFilterData} className='w-full border border-gray-400 rounded-md py-0.5'>
                                                <option className='poppins-font' selected value="">Default</option>
                                                <option className='bangla-font' value="আগৈলঝাড়া">আগৈলঝাড়া</option>

                                            </select>
                                        </div>

                                        <div>
                                            <span className='poppins-font font-semibold ml-1 mb-1 inline-block'>Union</span>
                                            <select name="" id="union" onChange={(e) => setUnionFilterData(e.target.value)} defaultValue={unionFilterData} className='w-full border border-gray-400 rounded-md py-0.5'>
                                                <option className='poppins-font' selected value="">Default</option>
                                                <option className='bangla-font' value="বাগধা">বাগধা</option>
                                                <option className='bangla-font' value="বাকাল">বাকাল</option>
                                                <option className='bangla-font' value="গৈলা">গৈলা</option>
                                                <option className='bangla-font' value="রাজিহার">রাজিহার</option>
                                                <option className='bangla-font' value="রত্নপুর">রত্নপুর</option>
                                            </select>
                                        </div>

                                        <div>
                                            <span className='poppins-font font-semibold ml-1 mb-1 inline-block'>Village</span>
                                            <select name="" id="union" onChange={(e) => setVillageFilterData(e.target.value)} defaultValue={villageFilterData} className='w-full border border-gray-400 rounded-md py-0.5'>
                                                <option className='poppins-font' selected value="">Default</option>
                                                <option className='bangla-font' value="জয়রামপট্টি">জয়রামপট্টি</option>
                                                <option className='bangla-font' value="আমবৌলা">আমবৌলা</option>
                                                <option className='bangla-font' value="নিমারপাড়">নিমারপাড়</option>
                                                <option className='bangla-font' value="আষ্কর">আষ্কর</option>
                                                <option className='bangla-font' value="জোবারপাড়">জোবারপাড়</option>
                                                <option className='bangla-font' value="কালিবাড়ি">কালিবাড়ি</option>
                                                <option className='bangla-font' value="নাঘিরপাড়">নাঘিরপাড়</option>
                                            </select>
                                        </div>

                                        <div>
                                            <span className='poppins-font font-semibold ml-1 mb-1 inline-block'>Blood Group</span>
                                            <select name="" id="union" onChange={(e) => setBloodGroupFilterData(e.target.value)} defaultValue={bloodGroupFilterData} className='w-full border border-gray-400 rounded-md py-0.5'>
                                                <option className='poppins-font' selected value="">Default</option>
                                                <option className='bangla-font' value="oPositive">O+</option>
                                                <option className='bangla-font' value="oNegative">O-</option>
                                                <option className='bangla-font' value="aPositive">A+</option>
                                                <option className='bangla-font' value="aNegative">A-</option>
                                                <option className='bangla-font' value="bPositive">B+</option>
                                                <option className='bangla-font' value="bNegative">B-</option>
                                                <option className='bangla-font' value="abPositive">AB+</option>
                                                <option className='bangla-font' value="abNegative">AB-</option>
                                            </select>
                                        </div>
                                    </section>

                                    <span className='poppins-font font-semibold ml-1 mb-1 inline-block mt-2'>Gender</span>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center'>
                                            <input type="checkbox" onClick={(e) => setGenderFilterData({ ...genderFilterData, man: e.target.checked })} name="পুরুষ" id="পুরুষ" value={"পুরুষ"} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300" />
                                            <label htmlFor="পুরুষ" className='bangla-font ml-2'>পুরুষ</label>
                                        </div>

                                        <div className='flex items-center'>
                                            <input type="checkbox" name="মহিলা" id="মহিলা" value={"মহিলা"} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300" />
                                            <label htmlFor="মহিলা" className='bangla-font ml-2'>মহিলা</label>
                                        </div>

                                        <div className='flex items-center'>
                                            <input type="checkbox" name="তৃতীয়" id="তৃতীয়" value={"তৃতীয়"} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300" />
                                            <label htmlFor="তৃতীয়" className='bangla-font ml-2'>তৃতীয়</label>
                                        </div>

                                        <div className='flex items-center'>
                                            <input type="checkbox" name="অজানা" id="অজানা" value={"অজানা"} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300" />
                                            <label htmlFor="অজানা" className='bangla-font ml-2'>অজানা</label>
                                        </div>
                                    </div>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
                <div>
                    <div className='lg:block hidden text-right w-full'>
                        <p className='inline'>
                            <span className='poppins-font'>Show : </span>
                            <select onChange={(e) => setLimit(e.target.value)} defaultValue={limit} className="py-1 px-1 bg-slate-200 font-semibold outline-none rounded-sm poppins-font">
                                <option selected className='font-semibold' value="10">10</option>
                                <option className='font-semibold' value="15">15</option>
                                <option className='font-semibold' value="25">25</option>
                                <option className='font-semibold' value="50">50</option>
                                <option className='font-semibold' value="100">100</option>
                            </select>
                        </p>
                        <p className='inline ml-5'>
                            <span className='poppins-font'>Sort By : </span>
                            <select onChange={(e) => setSortByDonateCount(e.target.value)} defaultValue={sortByDonateCount} className="py-1 px-1 bg-slate-200 outline-none rounded-sm poppins-font font-semibold w-32 text-[15px]">
                                <option selected className='font-semibold text-sm' value="acceptedTime">Default</option>
                                <option className='font-semibold text-sm' value="donationCount">Donation (High → Low)</option>
                            </select>
                        </p>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='bangla-font text-[15px] '>সিরিয়াল</th>
                            <th className='bangla-font text-[15px] pl-2'>প্রোফাইল</th>
                            <th className='bangla-font text-[15px] pl-2'>নাম</th>
                            <th className='bangla-font text-[15px] pl-2'>গ্রুপ</th>
                            <th className='bangla-font text-[15px] pl-2'>বয়স</th>
                            <th className='bangla-font text-[15px] pl-2'>লিঙ্গ</th>
                            <th className='bangla-font text-[15px] pl-2'>নাম্বার</th>
                            <th className='bangla-font text-[15px] pl-2'>থানা</th>
                            <th className='bangla-font text-[15px] pl-2'>ইউনিয়ন</th>
                            <th className='bangla-font text-[15px] pl-2'>গ্রাম</th>
                            <th className='bangla-font text-[15px] pl-2'>মোট রক্তদান</th>
                            <th className='bangla-font text-[15px] pl-2'>উপস্থিতি</th>
                            <th className='bangla-font text-[15px] pl-2'>অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.availableDonorList?.map((donorSingleData, index) => <AvailableListRow
                                key={donorSingleData._id}
                                donorSingleData={donorSingleData}
                                refetch={refetch}
                                index={index + 1}
                                setAvailableDonorData={setAvailableDonorData}
                                setAvailableDonorProfileData={setAvailableDonorProfileData}
                            ></AvailableListRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                availableDonorData && <AvailableDeleteModal
                    availableDonorData={availableDonorData}
                    setAvailableDonorData={setAvailableDonorData}
                    refetch={refetch}
                ></AvailableDeleteModal>
            }

            {
                availableDonorProfileData && <AvailableProfileModal
                    key={availableDonorProfileData._id}
                    availableDonorProfileData={availableDonorProfileData}
                    setAvailableDonorProfileData={setAvailableDonorProfileData}
                    refetch={refetch}
                ></AvailableProfileModal>
            }

            <div className="flex items-center justify-between border-t px-4 py-3 sm:px-6 bg-[#F5F7FF]">
                <div className="flex flex-1 justify-between sm:hidden">
                    <span
                        onClick={handlePreviousButton}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </span>
                    <span
                        onClick={handleNextButton}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </span>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{(limit * pageNumber) + 1} </span> to
                            {(pageNumber + 1) * limit >= data?.totalCount ?
                                <span className="font-medium"> {data?.totalCount} </span>
                                :
                                <span className="font-medium"> {(pageNumber + 1) * limit} </span>
                            }
                            of{' '}
                            <span className="font-medium">{data.totalCount}</span> results
                        </p>
                    </div>

                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md bg-[#F5F7FF]" aria-label="Pagination">
                            <span
                                onClick={handlePreviousButton}
                                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </span>

                            {
                                [...Array(data?.pageCount).keys()].map(number => <span onClick={() => setPageNumber(number)}
                                    className={`relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm  text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer poppins-font font-semibold ${pageNumber === number ? "z-10 bg-indigo-100 border-indigo-500 text-indigo-600" : ""}`}
                                >
                                    {number + 1}
                                </span>)
                            }

                            <span
                                onClick={handleNextButton}
                                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailableDonor;