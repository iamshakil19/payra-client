import React, { useEffect, useRef, useState } from 'react';
import { MdDelete } from "react-icons/md";

const UnavailableListRow = ({ donorSingleData, index, setUnavailableDonorData, setUnavailableDonorProfileData }) => {

    const { donationCount, name, profileImg, age, gender, number1, bloodGroup, policeStation, union, village } = donorSingleData

        // var myDate = new Date(new Date().getTime()+(5*24*60*60*1000));

        const [timerDays, setTimerDays] = useState();
        const [timerHours, setTimerHours] = useState();
        const [timerMinutes, setTimerMinutes] = useState();
        const [timerSeconds, setTimerSeconds] = useState();
    
            // var date = new Date(new Date().getTime());
            var date = new Date(new Date('September 19 2022 07:51:48'));
            // console.log(date);

            let interval = useRef();

    const startTimer = () => {
        const countdownDate = new Date(date).getTime();
    
        interval = setInterval(() => {
          const now = new Date().getTime();
          const distance = countdownDate - now;
    
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
          if (distance < 0) {
            // Stop
            clearInterval(interval.current);
            console.log('Timer Sesh');
          } else {
            // Update
            setTimerDays(days);
            setTimerHours(hours);
            setTimerMinutes(minutes);
            setTimerSeconds(seconds);
          }
        }, 1000);
      };
    
      useEffect(() => {
        startTimer();
        return () => {
          clearInterval(interval.current);
        };
      });

    return (
        <tr className='hover'>
            <th className='p-2 pl-4 poppins-font w-7'>{index}</th>
            <td className='p-2 pt-3 pb-1.5'>
                <div class="avatar cursor-pointer">
                    <div class="w-9 rounded-full ring ring-orange-500 ring-offset-[#F5F7FF] ring-offset-2">
                        <label onClick={() => setUnavailableDonorProfileData(donorSingleData)} for="available-donor-profile-modal" className='cursor-pointer'>
                            <img src={profileImg} alt="" />
                        </label>
                    </div>
                </div>
            </td>
            <td className='poppins-font p-2'>{name}</td>
            <td className='poppins-font uppercase p-2'>{bloodGroup}</td>
            <td className='poppins-font p-2'>{age}</td>
            <td className='bangla-font p-2'>{gender}</td>
            <td className='poppins-font p-2'>{number1}</td>
            <td className='bangla-font p-2'>{policeStation}</td>
            <td className='bangla-font p-2'>{union}</td>
            <td className='bangla-font p-2'>{village}</td>
            <td className='bangla-font p-2'>{donationCount} বার</td>
            <td className='bangla-font p-2'>{timerDays} D : {timerHours} H : {timerMinutes} M : {timerSeconds} S</td>
            <td className='p-2'>
                <label onClick={() => setUnavailableDonorData(donorSingleData)} for="donor-delete-modal" className=' w-8 h-8 text-center bg-red-200 text-xl text-red-500 border border-red-300 rounded-md cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white hover:border-red-600 transition-all ease-in-out duration-200'><span className=''><MdDelete /></span></label>
            </td>
        </tr>
    );
};

export default UnavailableListRow;