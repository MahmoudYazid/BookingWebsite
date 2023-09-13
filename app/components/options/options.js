import axios from 'axios'
import { getCookie } from 'cookies-next'
import React, { useRef, useState } from 'react'


export default function options() {
    const workfrom =  useRef()
    const workto =useRef()
    const sessionduration = useRef()
    const [StateOfCooosenDateState, SetStateOfCooosenDateState] = useState('')
    const ConvertStringToDate=(string_)=>{
        const [hours, minutes] = string_.split(':').map(Number);

        // Create a new Date object with some default date components (e.g., today's date)
        const newDate = new Date();

        // Set the time components from the input value
        newDate.setHours(hours, minutes);

        return newDate;

    }
    const SetNewDates=()=>{
        // console.log(JSON.parse(getCookie('idcard'))[0]['_id'])
        // console.log(ConvertStringToDate(workfrom.current.value) > ConvertStringToDate(workto.current.value)  )
        if (ConvertStringToDate(workfrom.current.value) < ConvertStringToDate(workto.current.value)){
            const response = axios.get('http://localhost:3000/api/MakeDoctorTimes', {
                headers: {
                    name: String(JSON.parse(getCookie('idcard'))[0]['name']),
                    startdate: workfrom.current.value,
                    enddate: workto.current.value,
                    sessionduration: sessionduration.current.value,
                }

            }).then((res) => {
                SetStateOfCooosenDateState('done')

            })
        }else{
            SetStateOfCooosenDateState('error in time')
       
        }
       

    }
    
  return (
      <div className='bg-yellow-400 h-100 w-100 flex flex-col justify-center items-center overflow-scroll'>
          <p>Work From</p>
          <input ref={workfrom} type='time' className='rounded-lg w-[10rem] m-2' placeholder='Work From'></input>
          <p>Work To</p>
          <input ref={workto} type='time' className='rounded-lg w-[10rem] m-2' placeholder='Work to'></input>
      <p>Session Time - per minute</p>
          <input ref={sessionduration} type='number' className='rounded-lg w-[10rem] m-2' placeholder='Session time'></input>

          <div onClick={()=>SetNewDates()} className='bg-white w-[5rem] h-50 mt-3 text-center rounded-lg hover:bg-green-300 hover:cusour-pointer cursor-pointer	'><p>Enter</p></div>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{StateOfCooosenDateState}</p>

      </div>
  )
}
