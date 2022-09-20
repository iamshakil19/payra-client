import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';


const Settings = () => {

    const [picnicTime, setPicnicTime] = useState(false);

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const target = new Date("09/20/2022 15:36:00")
        const newTarget = new Date("2022/09/22")


        const interval = setInterval(() => {
            const now = new Date()
            const difference = newTarget.getTime() - now.getTime()

            const d = Math.floor(difference / (1000 * 60 * 60 * 24))
            setDays(d)

            const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            setHours(h)

            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
            setMinutes(m)

            const s = Math.floor((difference % (1000 * 60)) / 1000)
            setSeconds(s)

            if (d <= 0 && h <= 0 && m <= 0 && s <= m) {
                console.log("picnic time start");
                toast.success("Picnic time start")
                return clearInterval(interval)
            }

        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <h2 className='text-center text-3xl text-slate-400 font-bold poppins-font'>Coming Soon</h2>

            <p>Days : {days} - Hours : {hours} - Minutes : {minutes} - Second : {seconds}</p>
        </div>
    );
};

export default Settings;