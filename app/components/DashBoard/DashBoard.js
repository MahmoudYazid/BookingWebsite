import React, { useState,useEffect } from 'react'
import Options from '../options/options'
import Clients from '../Clients/Clients'
import Link from 'next/link'
import YourDates from '../YourDates/YourDates'
import Doctors from '../doctors/doctors'
import { deleteCookie,getCookie } from 'cookies-next'
import { useRouter } from 'next/router'

export default function DashBoard() {
    const [Routing ,SetRouting]= useState('')
    const [visibility , SetVisibility] = useState('visible') 
    const router = useRouter()
  const checkCOOKIE = () => {
    if (!getCookie('idcard')) {
      router.push('/')
    }else{
      if (String(JSON.parse(getCookie('idcard'))[0]['type'])=='patient'){
        SetVisibility('invisible')
      }
    }
  }
  useEffect(() => {
    checkCOOKIE()
  }, [])
  return (
      <div className='flex justify-center items-center h-screen bg-white  w-100'>
          <div className='w-[50rem] h-[30rem] bg-white m-3 grid grid-cols-[.2fr_1fr] '>
              <div className='bg-blue-400 h-100 w-100 flex flex-col justify-start items-center overflow-scroll		 '>
          <div onClick={() => SetRouting('Options')} className={` bg-white w-[5rem] h-50 mt-3 text-center rounded-lg hover:bg-green-300 hover:cusour-pointer cursor-pointer ${visibility}`}><p>Day Time control</p></div>
          <div onClick={() => SetRouting('Clients')} className={`bg-white w-[5rem] h-50 mt-3 text-center rounded-lg hover:bg-green-300 hover:cusour-pointer cursor-pointer	${visibility}`}><p>Clients</p></div>
          <div onClick={() => SetRouting('Dates')} className='bg-white w-[5rem] h-50 mt-3 text-center rounded-lg hover:bg-green-300 hover:cusour-pointer cursor-pointer'><p>Your Dates</p></div>
          
          <div  onClick={() => SetRouting('Doctors')} className='bg-white w-[5rem] h-50 mt-3 text-center rounded-lg hover:bg-green-300 hover:cusour-pointer cursor-pointer	'><p>Doctors</p></div>

          <Link href={"/"} onClick={()=>{
            deleteCookie('idcard')
          }} className='bg-white w-[5rem] h-50 mt-3 text-center rounded-lg hover:bg-red-300 hover:cusour-pointer cursor-pointer	'><p>Sign Out</p></Link>
             
              </div>
              
        {Routing == 'Options' ? <Options /> : Routing == 'Dates' ? <YourDates /> : Routing == 'Clients' ? <Clients /> : Routing == 'Doctors' ? <Doctors />:null }
              


      </div>
    </div>
  )
}
