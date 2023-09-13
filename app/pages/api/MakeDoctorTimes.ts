import type { NextApiRequest, NextApiResponse } from 'next'
import { doctorstimeModel} from '../../MongoConfig/Schema'
import {conectionStr} from '../../MongoConfig/connectionString'
import mongoose from 'mongoose';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const name_=req.headers.name;
    const startdate_=req.headers.startdate;
    const enddate_=req.headers.enddate;
    const sessionduration_=req.headers.sessionduration;

      mongoose.connect(conectionStr).
     then(()=>{
        doctorstimeModel.find({
            doctorname:name_
        }).then((checkdata)=>{
                if(checkdata.length > 0){
                     doctorstimeModel.findOneAndUpdate({
            doctorname:name_,
        },{
            doctorname: name_,
            startdate: startdate_,
            enddate: enddate_,
            sessionduration: sessionduration_,


        }).then(usersData =>{
            
                 res.status(200).json({res:'done'});
           
            })


        
                }else{
                    const newDoctorTime = new doctorstimeModel({
                            doctorname: name_,
                         startdate: startdate_,
                         enddate: enddate_,
                             sessionduration: sessionduration_,

                    })
                    newDoctorTime.save().then(() =>{
                           res.status(200).json({res:'yes'});
                    })

                }
        })
     




     })}

