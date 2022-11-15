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
import ReactPaginate from 'react-paginate';


const AvailableDonor = () => {
    const navigate = useNavigate()
    let donorSearchData = useContext(DonorContext)

    if (!donorSearchData) {
        donorSearchData = ""
    }

    const [availableDonorData, setAvailableDonorData] = useState(null)
    const [availableDonorProfileData, setAvailableDonorProfileData] = useState(null)
    const [limit, setLimit] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)
    const [sortByDonateCount, setSortByDonateCount] = useState("acceptedTime")

    const [selectedDivision, setSelectedDivision] = useState("")
    let divisionFilterData = selectedDivision.split(",")[1]
    if (!divisionFilterData) {
        divisionFilterData = ""
    }
    const [selectedDistrict, setSelectedDistrict] = useState("")
    let districtFilterData = selectedDistrict.split(",")[1]
    if (!districtFilterData) {
        districtFilterData = ""
    }

    const [selectedUpazila, setSelectedUpazila] = useState("")
    let upazilaFilterData = selectedUpazila.split(",")[1]
    if (!upazilaFilterData) {
        upazilaFilterData = ""
    }

    const [selectedUnion, setSelectedUnion] = useState("")
    let unionFilterData = selectedUnion.split(",")[1]
    if (!unionFilterData) {
        unionFilterData = ""
    }


    const [villageFilterData, setVillageFilterData] = useState("")
    const [bloodGroupFilterData, setBloodGroupFilterData] = useState("")
    const [genderFilterData, setGenderFilterData] = useState({ man: false, women: false })

    const { data, isLoading, refetch } = useQuery(['availableDonorList', limit, pageNumber, sortByDonateCount, donorSearchData, selectedUnion, villageFilterData, bloodGroupFilterData, selectedUpazila, selectedDivision, selectedDistrict], () => fetch(`http://localhost:5000/available-donor?limit=${limit}&pageNumber=${pageNumber}&sortByDonateCount=${sortByDonateCount}&donorSearchData=${donorSearchData}&unionFilterData=${unionFilterData}&villageFilterData=${villageFilterData}&bloodGroupFilterData=${bloodGroupFilterData}&upazilaFilterData=${upazilaFilterData}&districtFilterData=${districtFilterData}&divisionFilterData=${divisionFilterData}`, {
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

    const { data: divisionData, divisionIsLoading } = useQuery(['allDivisions'], () => fetch('http://localhost:5000/divisions', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    const { data: districtData, districtIsLoading } = useQuery(['allDistricts'], () => fetch('http://localhost:5000/districts', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    const { data: upazilaData, upazilaIsLoading } = useQuery(['allUpazilas'], () => fetch('http://localhost:5000/upazilasForForm', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    const { data: unionData, unionIsLoading } = useQuery(['allunions'], () => fetch('http://localhost:5000/unionsForForm', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    const { data: villageData, villageIsLoading } = useQuery(['allvillage'], () => fetch('http://localhost:5000/villagesForForm', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    const districtFilter = districtData?.districts?.filter((singleDistrict) => Number(singleDistrict.division_id) === Number(selectedDivision.split(",")[0]))
    const upazilaFilter = upazilaData?.upazilas?.filter((singleUpazila) => Number(singleUpazila.district_id) === Number(selectedDistrict.split(",")[0]))
    const unionFilter = unionData?.unions?.filter((singleUnion) => Number(singleUnion.upazila_id) === Number(selectedUpazila.split(",")[0]))
    const villageFilter = villageData?.villages?.filter((singleVillage) => Number(singleVillage.union_id) === Number(selectedUnion.split(",")[0]))

    // if (isLoading || divisionIsLoading || districtIsLoading || upazilaIsLoading || unionIsLoading || villageIsLoading) {
    //     return <Loading />
    // }

    const handlePageClick = (event) => {
        setPageNumber(event.selected)
    };


    return (
        <div className='mb-5'>
            <div className='flex items-center justify-between mb-3'>
                <div className="z-50 w-56 lg:block hidden">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium bg-slate-100 border border-slate-500 shadow-md">
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
                            <Menu.Items className="absolute left-0 mt-2 w-96 origin-top-right divide-y divide-gray-100 rounded-md bg-[#F5F7FF] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-3 py-3 rounded-md shadow-md border border-gray-300">

                                    <section className='grid grid-cols-2 gap-3'>
                                        <div>
                                            <span className='poppins-font font-semibold ml-1 mb-1 inline-block'>Division</span>
                                            <select name="" id="union" onChange={(e) => setSelectedDivision(e.target.value)} defaultValue={selectedDivision} className='w-full border border-gray-400 rounded-md py-0.5'>
                                                <option className='poppins-font' selected value="">Default</option>
                                                {divisionData?.divisions.map((division, index) =>
                                                    <option className='bangla-font' key={index} value={[division.division_id, division.bn_name]}>{division.bn_name}</option>)
                                                }
                                            </select>
                                        </div>

                                        <div>
                                            <span className='poppins-font font-semibold ml-1 mb-1 inline-block'>District</span>
                                            <select name="" id="union" onChange={(e) => setSelectedDistrict(e.target.value)} defaultValue={selectedDistrict} className='w-full border border-gray-400 rounded-md py-0.5'>
                                                <option className='poppins-font' selected value="">Default</option>
                                                {districtFilter?.map((district, index) =>
                                                    <option className='bangla-font' key={index} value={[district.district_id, district.bn_name]}>{district.bn_name}</option>)
                                                }
                                            </select>
                                        </div>

                                        <div>
                                            <span className='poppins-font font-semibold ml-1 mb-1 inline-block'>Upazila</span>
                                            <select name="" id="union" onChange={(e) => setSelectedUpazila(e.target.value)} defaultValue={selectedUpazila} className='w-full border border-gray-400 rounded-md py-0.5'>
                                                <option className='poppins-font' selected value="">Default</option>
                                                {upazilaFilter?.map((upazila, index) =>
                                                    <option className='bangla-font' key={index} value={[upazila.upazila_id, upazila.bn_name]}>{upazila.bn_name}</option>)
                                                }
                                            </select>
                                        </div>

                                        <div>
                                            <span className='poppins-font font-semibold ml-1 mb-1 inline-block'>Union</span>
                                            <select name="" id="union" onChange={(e) => setSelectedUnion(e.target.value)} defaultValue={unionFilterData} className='w-full border border-gray-400 rounded-md py-0.5'>
                                                <option className='poppins-font' selected value="">Default</option>
                                                {unionFilter?.map((union, index) =>
                                                    <option className='bangla-font' key={index} value={[union.union_id, union.bn_name]}>{union.bn_name}</option>)
                                                }
                                            </select>
                                        </div>

                                        <div>
                                            <span className='poppins-font font-semibold ml-1 mb-1 inline-block'>Village</span>
                                            <select name="" id="union" onChange={(e) => setVillageFilterData(e.target.value)} defaultValue={villageFilterData} className='w-full border border-gray-400 rounded-md py-0.5'>
                                                <option className='poppins-font' selected value="">Default</option>
                                                {villageFilter?.map((village, index) =>
                                                    <option className='bangla-font' key={index} value={village.bn_name}>{village.bn_name}</option>)
                                                }
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
                        <div className='inline'>
                            <span className='poppins-font'>Show : </span>
                            <select onChange={(e) => setLimit(e.target.value)} defaultValue={limit} className="py-1 px-1 bg-slate-200 font-semibold outline-none rounded-sm poppins-font">
                                <option selected className='font-semibold' value="10">10</option>
                                <option className='font-semibold' value="15">15</option>
                                <option className='font-semibold' value="25">25</option>
                                <option className='font-semibold' value="50">50</option>
                                <option className='font-semibold' value="100">100</option>
                            </select>
                        </div>
                        <div className='inline ml-5'>
                            <span className='poppins-font'>Sort By : </span>
                            <select onChange={(e) => setSortByDonateCount(e.target.value)} defaultValue={sortByDonateCount} className="py-1 px-1 bg-slate-200 outline-none rounded-sm poppins-font font-semibold w-32 text-[15px]">
                                <option selected className='font-semibold text-sm' value="acceptedTime">Default</option>
                                <option className='font-semibold text-sm' value="donationCount">Donation (High → Low)</option>
                            </select>
                        </div>
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
                            <th className='bangla-font text-[15px] pl-2'>উপজেলা</th>
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

export default AvailableDonor;