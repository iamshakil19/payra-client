import React from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


const donorData = [
    {
      _id: "631ceb77cafbc9d3a5ea5dd9",
      name: " tumi",
      bloodGroup: "ab+",
      age: "2022-09-12",
      number1: "45545454545",
      number2: "",
      gender: "মহিলা",
      division: "বরিশাল",
      district: "বরিশাল",
      policeStation: "আগৈলঝাড়া",
      union: "বাগধা",
      village: "খাজুরিয়া",
      status: "verified",
      profileImg: "https://i.ibb.co/SJQGfx9/male.jpg"
    },
    {
      _id: "631ceb77cafbc9d3a5ea5dd9",
      name: "ami",
      bloodGroup: "a+",
      age: "2022-09-12",
      number1: "45545454545",
      number2: "",
      gender: "মহিলা",
      division: "বরিশাল",
      district: "বরিশাল",
      policeStation: "আগৈলঝাড়া",
      union: "বাগধা",
      village: "খাজুরিয়া",
      status: "verified",
      profileImg: "https://i.ibb.co/SJQGfx9/male.jpg"
    },
    {
      _id: "631ceb77cafbc9d3a5ea5dd9",
      name: " tumdfdfsi",
      bloodGroup: "ab-",
      age: "2022-09-12",
      number1: "45545454545",
      number2: "",
      gender: "মহিলা",
      division: "বরিশাল",
      district: "বরিশাল",
      policeStation: "আগৈলঝাড়া",
      union: "বাগধা",
      village: "খাজুরিয়া",
      status: "verified",
      profileImg: "https://i.ibb.co/SJQGfx9/male.jpg"
    },
    {
      _id: "631ceb77cafbc9d3a5ea5dd9",
      name: " tdumidsd",
      bloodGroup: "b+",
      age: "2022-09-12",
      number1: "45545454545",
      number2: "",
      gender: "মহিলা",
      division: "বরিশাল",
      district: "বরিশাল",
      policeStation: "আগৈলঝাড়া",
      union: "বাগধা",
      village: "খাজুরিয়া",
      status: "verified",
      profileImg: "https://i.ibb.co/SJQGfx9/male.jpg"
    },
    {
      _id: "631ceb77cafbc9d3a5ea5dd9",
      name: " tumidsss",
      bloodGroup: "ab+",
      age: "2022-09-12",
      number1: "45545454545",
      number2: "",
      gender: "মহিলা",
      division: "বরিশাল",
      district: "বরিশাল",
      policeStation: "আগৈলঝাড়া",
      union: "বাগধা",
      village: "খাজুরিয়া",
      status: "verified",
      profileImg: "https://i.ibb.co/SJQGfx9/male.jpg"
    },
    {
      _id: "631ceb77cafbc9d3a5ea5dd9",
      name: " tumidfdfdf",
      bloodGroup: "a-",
      age: "2022-09-12",
      number1: "45545454545",
      number2: "",
      gender: "মহিলা",
      division: "বরিশাল",
      district: "বরিশাল",
      policeStation: "আগৈলঝাড়া",
      union: "বাগধা",
      village: "খাজুরিয়া",
      status: "verified",
      profileImg: "https://i.ibb.co/SJQGfx9/male.jpg"
    },
    {
      _id: "631ceb77cafbc9d3a5ea5dd9",
      name: " dfddtumi",
      bloodGroup: "b+",
      age: "2022-09-12",
      number1: "45545454545",
      number2: "",
      gender: "মহিলা",
      division: "বরিশাল",
      district: "বরিশাল",
      policeStation: "আগৈলঝাড়া",
      union: "বাগধা",
      village: "খাজুরিয়া",
      status: "verified",
      profileImg: "https://i.ibb.co/SJQGfx9/male.jpg"
    },
    {
      _id: "631ceb77cafbc9d3a5ea5dd9",
      name: " dsfdf",
      bloodGroup: "a+",
      age: "2022-09-12",
      number1: "45545454545",
      number2: "",
      gender: "মহিলা",
      division: "বরিশাল",
      district: "বরিশাল",
      policeStation: "আগৈলঝাড়া",
      union: "বাগধা",
      village: "খাজুরিয়া",
      status: "verified",
      profileImg: "https://i.ibb.co/SJQGfx9/male.jpg"
    },
    {
      _id: "631ceb77cafbc9d3a5ea5dd9",
      name: " tumi++",
      bloodGroup: "b+",
      age: "2022-09-12",
      number1: "45545454545",
      number2: "",
      gender: "মহিলা",
      division: "বরিশাল",
      district: "বরিশাল",
      policeStation: "আগৈলঝাড়া",
      union: "বাগধা",
      village: "খাজুরিয়া",
      status: "verified",
      profileImg: "https://i.ibb.co/SJQGfx9/male.jpg"
    },
    {
      _id: "631ceb77cafbc9d3a5ea5dd9",
      name: " tumi--",
      bloodGroup: "ab-",
      age: "2022-09-12",
      number1: "45545454545",
      number2: "",
      gender: "মহিলা",
      division: "বরিশাল",
      district: "বরিশাল",
      policeStation: "আগৈলঝাড়া",
      union: "বাগধা",
      village: "খাজুরিয়া",
      status: "verified",
      profileImg: "https://i.ibb.co/SJQGfx9/male.jpg"
    },
  ]

  var obj = [
    {
      "id": "65:0",    
      "status": "ORANGE"
    },
    {
      "id": "65:0",
      "name": "BIU",
      "status": "GREEN"
    },
    {
      "id": "65:0",
      "name": "BIU",
      "status": "ORANGE"
    },
    {
      "id": "65:0",
      "status": "YELLOW"
    },
    {
      "id": "65:0",
      "status": "RED"
    },
    {
      "id": "65:0",
      "status": "GREEN"
    },
    {
      "id": "65:0",
      "status": "GREEN"
    },
     {
      "id": "65:0",
      "status": "ORANGE"
    },
    {
      "id": "65:0",
      "status": "YELLOW"
    },
    {
      "id": "65:0",
      "status": "GREEN"
    }
  ] ;
  
  var rez=[];
  donorData.forEach(function(item){
    rez[item.bloodGroup] ? rez[item.bloodGroup]++ :  rez[item.bloodGroup] = 1;
  });
  console.log(rez[1]);
  
const options = {
    plugins: {
        legend: {
            position: "bottom"
        }
    }
}

const oPositive = 100;



export const data = {
    
    labels: ['O +', 'O -', 'A +', 'A -', 'B+', 'b -', 'AB +', 'AB -'],
    datasets: [
        {
            label: 'Blood Group',
            data: [`${oPositive}`, 80, 95, 55, 112, 15, 39, 135],
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


const DoughnutChart = () => {

    return (
        <div className='border border-gray-300 rounded-xl p-4 mt-5 max-w-lg'>
            <p className='text-[#141C39] text-xl poppins-font font-semibold mb-5'>Blood Group Analytics</p>
            <div className='max-w-xs mx-auto'>
                <Doughnut data={data} options={options}
                />
            </div>

        </div>

    )

};

export default DoughnutChart;