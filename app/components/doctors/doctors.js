import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
export default function doctors() {
    const [DoctorsState, SetDoctorsState]=useState([])
    const [DateState, SetDateState] = useState('')
    const [StateOfCooosenDateState, SetStateOfCooosenDateState] = useState('')
    const fetchDoctors=()=>{
        axios.get('https://booking-website-iota.vercel.app/api/GetAllTheDoctors').then((response)=>{
            
            SetDoctorsState(response.data.res)

        })
    }

    const MakeDate = async (DoctorName_)=>{
        console.log({
            "doctorname_": DoctorName_,
            "patientname_": String(JSON.parse(getCookie('idcard'))[0]['name']),
            "date_": String(DateState) 

        })
        if (DateState.length==0){
            SetStateOfCooosenDateState('choose date')
            return 0
        }
        await axios.get('https://booking-website-iota.vercel.app/api/MakeNextDate',{
            headers: {
                "Accept": "*/*",
                "doctorname_": DoctorName_,
                "patientname_": String(JSON.parse(getCookie('idcard'))[0]['name']),
                "date_": String(DateState) 
            }
          
        }).then((response) => {

            SetStateOfCooosenDateState(response.data.res)

        })
    }
    useEffect(()=>{
        fetchDoctors()
    })
  return (
      <div className='bg-yellow-400 h-100 w-100 flex flex-col justify-start items-center overflow-scroll'>
{
    DoctorsState.map(fetchedData=>(
        <a href="#" class=" mt-3 mb-3 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Doctor Name :{fetchedData.doctorname}</h5>
                <input onChange={(e) => SetDateState(e.currentTarget.value)} type='time' className='rounded-lg w-[10rem] m-2' placeholder='Work to'></input>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 ">start Date : {fetchedData.startdate} </p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 ">end Date : {fetchedData.enddate} </p>
                <p onClick={() => MakeDate(fetchedData.doctorname)} class="mb-3 font-normal text-gray-700 dark:text-gray-400 hover:text-blue-700">Make A Date</p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{StateOfCooosenDateState}</p>
            </div>
        </a>

    ))
}
         


      </div>
  )
}
