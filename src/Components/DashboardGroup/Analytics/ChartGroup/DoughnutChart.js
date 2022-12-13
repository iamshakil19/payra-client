import React from 'react';
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Loading from '../../../Shared/Loading/Loading';
import { useQuery } from 'react-query';
import { signOut } from 'firebase/auth';
import auth from '../../../../firebase.init';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const navigate = useNavigate()
  const { data: bloodData, isLoading, refetch } = useQuery('bloodData', () => fetch('http://localhost:5000/verified-donor', {
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

  let oPositiveData = bloodData.filter(
    (person) => person.bloodGroup === "oPositive"
  );
  const oPositiveLength = oPositiveData.length;

  let oNegativeData = bloodData.filter(
    (person) => person.bloodGroup === "oNegative"
  );
  const oNegativeLength = oNegativeData.length;

  let aPositiveData = bloodData.filter(
    (person) => person.bloodGroup === "aPositive"
  );
  const aPositiveLength = aPositiveData.length;

  let aNegativeData = bloodData.filter(
    (person) => person.bloodGroup === "aNegative"
  );
  const aNegativeLength = aNegativeData.length;

  let bPositiveData = bloodData.filter(
    (person) => person.bloodGroup === "bPositive"
  );
  const bPositiveLength = bPositiveData.length;

  let bNegativeData = bloodData.filter(
    (person) => person.bloodGroup === "bNegative"
  );
  const bNegativeLength = bNegativeData.length;

  let abPositiveData = bloodData.filter(
    (person) => person.bloodGroup === "abPositive"
  );
  const abPositiveLength = abPositiveData.length;

  let abNegativeData = bloodData.filter(
    (person) => person.bloodGroup === "abNegative"
  );
  const abNegativeLength = abNegativeData.length;

  const bloodGroupData = [oPositiveLength, oNegativeLength, aPositiveLength, aNegativeLength, bPositiveLength, bNegativeLength, abPositiveLength, abNegativeLength]

  const options = {
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }

  const data = {
    labels: ['O+ Donor ', 'O- Donor ', 'A+ Donor ', 'A- Donor ', 'B+ Donor ', 'b- Donor ', 'AB+ Donor ', 'AB- Donor '],
    datasets: [
      {
        label: 'Blood Group',
        data: bloodGroupData,
        backgroundColor: [
          '#F16963',
          '#F9B280',
          '#F7F08D',
          '#5DC09B',
          '#6075EA',
          '#00BDFF',
          '#B3DD57',
          '#CA69E2',
        ],
        borderColor: [
          '#F16963',
          '#F9B280',
          '#F7F08D',
          '#5DC09B',
          '#6075EA',
          '#00BDFF',
          '#B3DD57',
          '#CA69E2',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='border border-gray-300 rounded-xl p-4 mt-5 w-lg shadow-lg'>
      <p className='text-[#141C39] text-xl poppins-font font-semibold mb-4'>Blood Group Analytics</p>
      <div className='max-w-[340px] mx-auto relative'>
        <p className='poppins-font font-extrabold absolute left-[120px] top-[110px] hidden lg:block text-lg'>Donors : {bloodData.length}</p>
        <Doughnut data={data} options={options}
        />
      </div>
    </div>

  )

};

export default DoughnutChart;