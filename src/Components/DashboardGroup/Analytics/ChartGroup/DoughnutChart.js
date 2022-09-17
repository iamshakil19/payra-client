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
  const { data: bloodData, isLoading, refetch } = useQuery('bloodData', () => fetch('https://payra.onrender.com/verified-donor', {
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
    (person) => person.bloodGroup === "o+"
  );
  const oPositiveLength = oPositiveData.length;

  let oNegativeData = bloodData.filter(
    (person) => person.bloodGroup === "o-"
  );
  const oNegativeLength = oNegativeData.length;

  let aPositiveData = bloodData.filter(
    (person) => person.bloodGroup === "a+"
  );
  const aPositiveLength = aPositiveData.length;

  let aNegativeData = bloodData.filter(
    (person) => person.bloodGroup === "a-"
  );
  const aNegativeLength = aNegativeData.length;

  let bPositiveData = bloodData.filter(
    (person) => person.bloodGroup === "b+"
  );
  const bPositiveLength = bPositiveData.length;

  let bNegativeData = bloodData.filter(
    (person) => person.bloodGroup === "b-"
  );
  const bNegativeLength = bNegativeData.length;

  let abPositiveData = bloodData.filter(
    (person) => person.bloodGroup === "ab+"
  );
  const abPositiveLength = abPositiveData.length;

  let abNegativeData = bloodData.filter(
    (person) => person.bloodGroup === "ab-"
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
          '#ff6961',
          '#59adf6',
          '#f8f38d',
          '#42d6a4',
          '#9d94ff',
          '#ffb480',
          '#08cad1',
          '#c780e8',
        ],
        borderColor: [
          '#ff6961',
          '#59adf6',
          '#f8f38d',
          '#42d6a4',
          '#9d94ff',
          '#ffb480',
          '#08cad1',
          '#c780e8',
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