import React from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import Loading from '../../../Shared/Loading/Loading';
import { signOut } from 'firebase/auth';
import auth from '../../../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = () => {

    const navigate = useNavigate()
    const { data: completeDonationData, isLoading, refetch } = useQuery('completeDonationData', () => fetch('http://localhost:5000/complete-blood-request', {
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

    let oPositiveData = completeDonationData.filter(
        (person) => person.requested_bloodGroup === "o+"
    );
    const oPositiveLength = oPositiveData.length;

    let oNegativeData = completeDonationData.filter(
        (person) => person.requested_bloodGroup === "o-"
    );
    const oNegativeLength = oNegativeData.length;

    let aPositiveData = completeDonationData.filter(
        (person) => person.requested_bloodGroup === "a+"
    );
    const aPositiveLength = aPositiveData.length;

    let aNegativeData = completeDonationData.filter(
        (person) => person.requested_bloodGroup === "a-"
    );
    const aNegativeLength = aNegativeData.length;

    let bPositiveData = completeDonationData.filter(
        (person) => person.requested_bloodGroup === "b+"
    );
    const bPositiveLength = bPositiveData.length;

    let bNegativeData = completeDonationData.filter(
        (person) => person.requested_bloodGroup === "b-"
    );
    const bNegativeLength = bNegativeData.length;

    let abPositiveData = completeDonationData.filter(
        (person) => person.requested_bloodGroup === "ab+"
    );
    const abPositiveLength = abPositiveData.length;

    let abNegativeData = completeDonationData.filter(
        (person) => person.requested_bloodGroup === "ab-"
    );
    const abNegativeLength = abNegativeData.length;

    const completeDonation = [oPositiveLength, oNegativeLength, aPositiveLength, aNegativeLength, bPositiveLength, bNegativeLength, abPositiveLength, abNegativeLength]
    const options = {
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }

    const data = {
        labels: [`O+ : ${oPositiveLength}`, `O- : ${oNegativeLength}`, `A+ : ${aPositiveLength}`, `A- : ${aNegativeLength}`, `B+ : ${bPositiveLength}`, `B- : ${bNegativeLength}`, `AB+ : ${abPositiveLength}`, `AB- : ${abNegativeLength}`],
        datasets: [
            {
                label: 'Complete Donation ',
                data: completeDonation,
                backgroundColor: 'rgba(255, 99, 132, 0.3)',
                borderColor: 'rgba(255, 99, 132, 2)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='border border-gray-300 rounded-xl p-4 mt-5 w-lg shadow-lg'>
            <p className='text-[#141C39] text-xl poppins-font font-semibold mb-4'>Donation Complete Analytics</p>
            <div className='max-w-[340px] mx-auto'>
                <Radar data={data} options={options} />
            </div>
        </div>
    );
};

export default RadarChart;