// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {UsersModel,doctorstimeModel,appointmentModel} from '../../MongoConfig/Schema'
import {conectionStr} from '../../MongoConfig/connectionString'
import mongoose from 'mongoose';

const ConvertStringToDate=(string_:any):any=>{
    const [hours, minutes] = string_.split(':').map(Number);

    // Create a new Date object with some default date components (e.g., today's date)
    const newDate = new Date();

    // Set the time components from the input value
    newDate.setHours(hours, minutes);

    return newDate;

}

const AddMinToDate=(Date_:any,SessionTime:any)=>{
    const [hours, minutes] = Date_.split(':').map(Number);

    // Create a new Date object with some default date components (e.g., today's date)
    const newDate = new  Date(hours, minutes);

    // Set the time components from the input value
    newDate.setHours(hours, minutes+SessionTime);

   
    return newDate.getHours() + ':' +newDate.getMinutes()  ;

}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const _doctorName_ = req.headers.doctorname_ ;
     const _patientname_ = req.headers.patientname_;
     const _date_ = req.headers.date_;
    mongoose.connect(conectionStr).then(()=>{
        doctorstimeModel.find({doctorname: _doctorName_}).then(AvailableDateForDoctor => {
            appointmentModel.find({doctorname:_doctorName_}).then(AppointmentListInClinic=> {
                 if( AppointmentListInClinic.filter(item=> ConvertStringToDate(String(_date_)) >= ConvertStringToDate(String(item.startdate)) && ConvertStringToDate(String(_date_)) <= ConvertStringToDate(String(item.enddate)) ).length==0 && ConvertStringToDate(String(AvailableDateForDoctor[0]['enddate']))>ConvertStringToDate(String(_date_)) && ConvertStringToDate(String(_date_))  >ConvertStringToDate(String(AvailableDateForDoctor[0]['startdate']))){
                

                    const newItem = new appointmentModel({
                        patientname:_patientname_,
                        doctorname:_doctorName_,
                        startdate: String(_date_),
                        enddate:String(AddMinToDate(_date_,Number(AvailableDateForDoctor[0]['sessionduration'])))
                        
                    })
                    newItem.save().then(() =>{
                         res.status(200).json({res: 'done'})
                    })
              
             }else{
                 res.status(200).json({res: 'existed'})
             }
             
             
           
        })   
        })
    })
}