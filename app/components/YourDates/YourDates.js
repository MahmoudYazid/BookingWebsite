import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'

export default function YourDates() {
    const [FetchedData_,SetFetchedData] = useState([])
    const fetchDate =()=>{
       const res =  axios.get('https://booking-website-iota.vercel.app/api/GetAllMyAppointment',{
        headers:{
               patientname_: String(JSON.parse(getCookie('idcard'))[0]['name'])
        }
          
        }).then(response=>{
          
            SetFetchedData(response.data.res)

        })
      

    }

  const DelAppoint = (AppId) => {
    console.log(AppId)
    const res = axios.get('https://booking-website-iota.vercel.app/api/DelContract', {
      headers: {
        contractid_:AppId
      }

    }).then(response => {

      fetchDate()
    })


  }
    useEffect(()=>{
        fetchDate();
    }, [])
  return (
      <div className='bg-yellow-400 h-100 w-100 flex flex-col justify-start items-center overflow-scroll'>
        {
              FetchedData_.map(FetchedData=>(
                <a href="#" class=" mt-3 mb-3 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div class="flex flex-col justify-between p-4 leading-normal">
                          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Doctor Name :{FetchedData.doctorname}</h5>
                          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">start Date is : {FetchedData.startdate} </p>
                          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">End-date Date is : {FetchedData.enddate} </p>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 hover:text-blue-400" onClick={() => DelAppoint(FetchedData._id)}>Delete Appointment </p>
                    </div>
                </a>
              ))
        }




      </div>
  )
}
